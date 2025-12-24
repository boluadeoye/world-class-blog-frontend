import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    // 1. Check if student exists using EMAIL
    // We check both the 'email' column AND the 'password' column (legacy support)
    const check = await client.query(
      'SELECT * FROM cbt_students WHERE email = $1 OR password = $1', 
      [email]
    );
    
    let student;
    
    if (check.rows.length > 0) {
      // Login: Update name
      student = check.rows[0];
      await client.query('UPDATE cbt_students SET name = $1 WHERE id = $2', [name, student.id]);
    } else {
      // Register: Create new student
      // We explicitly insert into 'name', 'department', 'email', and 'password' (as backup)
      const insert = await client.query(
        `INSERT INTO cbt_students (name, department, email, password) 
         VALUES ($1, $2, $3, $3) 
         RETURNING *`,
        [name, 'General Studies', email]
      );
      student = insert.rows[0];
    }
    
    client.release();
    
    return new Response(JSON.stringify({ 
      success: true, 
      student: { id: student.id, name: student.name, email: student.email || student.password } 
    }), { status: 200 });

  } catch (error) {
    console.error("Auth Error:", error);
    return new Response(JSON.stringify({ error: `System Error: ${error.message}` }), { status: 500 });
  }
}
