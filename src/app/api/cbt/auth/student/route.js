import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { name, matric, department } = await req.json();
    
    if (!name || !matric || !department) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    // Check if student exists (using Matric No as unique ID)
    const check = await client.query('SELECT * FROM cbt_students WHERE password = $1', [matric]);
    
    let student;
    
    if (check.rows.length > 0) {
      // Login
      student = check.rows[0];
    } else {
      // Register (Auto-create)
      // Note: We are using Matric No as the "password" for simplicity in this MVP
      const insert = await client.query(
        'INSERT INTO cbt_students (name, department, password) VALUES ($1, $2, $3) RETURNING *',
        [name, department, matric]
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
