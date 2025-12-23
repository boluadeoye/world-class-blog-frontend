import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { name, email, department } = await req.json();
    
    if (!name || !email || !department) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    // Check if student exists (using Email as unique ID)
    // We store Email in the 'password' column to avoid altering the table schema right now
    const check = await client.query('SELECT * FROM cbt_students WHERE password = $1', [email]);
    
    let student;
    
    if (check.rows.length > 0) {
      // Login: Update name/dept in case they changed
      student = check.rows[0];
      await client.query('UPDATE cbt_students SET name = $1, department = $2 WHERE id = $3', [name, department, student.id]);
    } else {
      // Register: Create new student
      const insert = await client.query(
        'INSERT INTO cbt_students (name, department, password) VALUES ($1, $2, $3) RETURNING *',
        [name, department, email]
      );
      student = insert.rows[0];
    }
    
    client.release();
    
    return new Response(JSON.stringify({ 
      success: true, 
      student: { id: student.id, name: student.name, department: student.department } 
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
