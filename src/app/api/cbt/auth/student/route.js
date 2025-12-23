import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    // Check if student exists (using Email as unique ID)
    const check = await client.query('SELECT * FROM cbt_students WHERE password = $1', [email]);
    
    let student;
    
    if (check.rows.length > 0) {
      // Login: Update name just in case
      student = check.rows[0];
      await client.query('UPDATE cbt_students SET name = $1 WHERE id = $2', [name, student.id]);
    } else {
      // Register: Create new student
      // We hardcode 'General Studies' since the DB requires a department
      const insert = await client.query(
        'INSERT INTO cbt_students (name, department, password) VALUES ($1, $2, $3) RETURNING *',
        [name, 'General Studies', email]
      );
      student = insert.rows[0];
    }
    
    client.release();
    
    return new Response(JSON.stringify({ 
      success: true, 
      student: { id: student.id, name: student.name, email: student.password } 
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
