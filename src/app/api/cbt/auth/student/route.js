import pool from '../../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { action, name, email, username, password, department } = await req.json();
    const client = await pool.connect();

    // === REGISTER LOGIC ===
    if (action === 'register') {
      // 1. Check if Email or Username exists
      const check = await client.query(
        'SELECT * FROM cbt_students WHERE email = $1 OR username = $2', 
        [email, username]
      );
      
      if (check.rows.length > 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Identity Conflict: Email or Username already in system." }), { status: 409 });
      }

      // 2. Hash Password (Security)
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // 3. Create Student
      const insert = await client.query(
        `INSERT INTO cbt_students (name, email, username, password_hash, department, avatar_url) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, username, department, avatar_url`,
        [name, email, username, hash, department, `https://api.dicebear.com/7.x/initials/svg?seed=${username}`]
      );
      
      client.release();
      return new Response(JSON.stringify({ success: true, student: insert.rows[0] }), { status: 201 });
    }

    // === LOGIN LOGIC ===
    if (action === 'login') {
      // 1. Find User (Allow login by Email OR Username)
      const res = await client.query(
        'SELECT * FROM cbt_students WHERE email = $1 OR username = $1', 
        [email] // We use 'email' variable to hold username/email input
      );

      if (res.rows.length === 0) {
        client.release();
        return new Response(JSON.stringify({ error: "Security Alert: Identity not found." }), { status: 404 });
      }

      const student = res.rows[0];

      // 2. Verify Password
      // Fallback: If no hash exists (old users), check plain text (Legacy support)
      let isValid = false;
      if (student.password_hash) {
        isValid = await bcrypt.compare(password, student.password_hash);
      } else {
        isValid = student.password === password; // Legacy check
      }

      if (!isValid) {
        client.release();
        return new Response(JSON.stringify({ error: "Security Alert: Invalid Credentials." }), { status: 401 });
      }

      client.release();
      return new Response(JSON.stringify({ 
        success: true, 
        student: { 
          id: student.id, 
          name: student.name, 
          username: student.username, 
          department: student.department,
          avatar_url: student.avatar_url 
        } 
      }), { status: 200 });
    }

    return new Response("Invalid Action", { status: 400 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "System Error: " + error.message }), { status: 500 });
  }
}
