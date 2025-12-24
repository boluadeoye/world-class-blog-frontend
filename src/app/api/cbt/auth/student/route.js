import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    
    // 1. Email is always required
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    // 2. Check if student exists
    const check = await client.query('SELECT * FROM cbt_students WHERE password = $1 OR email = $1', [email]);
    
    let student;
    
    if (check.rows.length > 0) {
      // === LOGIN SCENARIO ===
      student = check.rows[0];
      
      // If name is provided during login, update it. Otherwise, keep existing name.
      if (name) {
        await client.query('UPDATE cbt_students SET name = $1 WHERE id = $2', [name, student.id]);
        student.name = name;
      }
    } else {
      // === REGISTER SCENARIO ===
      // If user doesn't exist, Name is REQUIRED to create account
      if (!name) {
        client.release();
        return new Response(JSON.stringify({ error: "Account not found. Please Register first." }), { status: 404 });
      }

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
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
