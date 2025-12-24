import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { mode, name, email, password } = await req.json();
    const client = await pool.connect();
    
    // Generate a random session token
    const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    if (mode === 'login') {
      const res = await client.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
      if (res.rows.length === 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Account not found." }), { status: 404 });
      }
      const student = res.rows[0];
      if (student.password !== password) {
        client.release();
        return new Response(JSON.stringify({ error: "Incorrect Password" }), { status: 401 });
      }

      // UPDATE SESSION TOKEN (Kicks out other devices)
      await client.query('UPDATE cbt_students SET session_token = $1 WHERE id = $2', [sessionToken, student.id]);
      
      client.release();
      return new Response(JSON.stringify({ 
        success: true, 
        student: { ...student, session_token: sessionToken } // Send token to frontend
      }), { status: 200 });

    } else {
      // Register
      const check = await client.query('SELECT id FROM cbt_students WHERE email = $1', [email]);
      if (check.rows.length > 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Email already registered." }), { status: 409 });
      }

      const insert = await client.query(
        `INSERT INTO cbt_students (name, department, email, password, session_token) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, 'General Studies', email, password, sessionToken]
      );
      
      client.release();
      return new Response(JSON.stringify({ 
        success: true, 
        student: insert.rows[0] 
      }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
