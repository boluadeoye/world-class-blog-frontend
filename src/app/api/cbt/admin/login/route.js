import pool from '../../../../lib/db';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const client = await pool.connect();
    
    const result = await client.query(
      'SELECT * FROM cbt_admins WHERE username = $1 AND password = $2',
      [username, password]
    );
    
    client.release();

    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid" }), { status: 401 });
    }
  } catch (error) {
    return new Response("Server Error", { status: 500 });
  }
}
