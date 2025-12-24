import pool from '../../../../../lib/db';

export async function POST(req) {
  try {
    const { mode, name, email, password } = await req.json();
    
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and Password are required" }), { status: 400 });
    }

    const client = await pool.connect();
    
    if (mode === 'login') {
      // === STRICT LOGIN ===
      // 1. Find user by Email ONLY
      const res = await client.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
      
      if (res.rows.length === 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Account not found. Please register." }), { status: 404 });
      }

      const student = res.rows[0];

      // 2. Verify Password (Strict Comparison)
      // Note: In a real production app, we would use bcrypt.compare() here.
      // For this MVP, we compare the raw strings.
      if (student.password !== password) {
        client.release();
        return new Response(JSON.stringify({ error: "Incorrect Password" }), { status: 401 });
      }

      client.release();
      return new Response(JSON.stringify({ 
        success: true, 
        student: { id: student.id, name: student.name, email: student.email } 
      }), { status: 200 });

    } else {
      // === REGISTRATION ===
      if (!name) {
        client.release();
        return new Response(JSON.stringify({ error: "Full Name is required for registration" }), { status: 400 });
      }

      // 1. Check if email already taken
      const check = await client.query('SELECT id FROM cbt_students WHERE email = $1', [email]);
      if (check.rows.length > 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Email already registered. Please login." }), { status: 409 });
      }

      // 2. Create Account
      const insert = await client.query(
        `INSERT INTO cbt_students (name, department, email, password) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [name, 'General Studies', email, password]
      );
      
      const student = insert.rows[0];
      client.release();
      
      return new Response(JSON.stringify({ 
        success: true, 
        student: { id: student.id, name: student.name, email: student.email } 
      }), { status: 200 });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
