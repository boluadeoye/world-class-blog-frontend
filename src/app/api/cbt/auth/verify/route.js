import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { id, token } = await req.json();
    const client = await pool.connect();
    
    const res = await client.query('SELECT session_token FROM cbt_students WHERE id = $1', [id]);
    client.release();

    if (res.rows.length === 0) return new Response("User not found", { status: 404 });

    // THE CHECK: Does the DB token match the User's token?
    if (res.rows[0].session_token !== token) {
      return new Response("Session Invalid", { status: 401 });
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
