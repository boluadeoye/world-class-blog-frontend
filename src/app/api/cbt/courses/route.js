import pool from '../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cbt_courses ORDER BY created_at DESC');
    client.release();
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response("Error fetching courses", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { code, title, level, duration } = await req.json();
    const client = await pool.connect();
    
    await client.query(
      'INSERT INTO cbt_courses (code, title, level, duration) VALUES ($1, $2, $3, $4)',
      [code.toUpperCase(), title, parseInt(level), parseInt(duration || 15)]
    );
    
    client.release();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
