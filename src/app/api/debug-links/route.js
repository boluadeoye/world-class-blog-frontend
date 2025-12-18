import pool from '../../../lib/db';

export const dynamic = 'force-dynamic'; // Ensure it doesn't cache

export async function GET() {
  try {
    const client = await pool.connect();
    // Fetch the last 20 links
    const result = await client.query('SELECT * FROM links ORDER BY created_at DESC LIMIT 20');
    client.release();
    
    return new Response(JSON.stringify({
      count: result.rowCount,
      links: result.rows
    }, null, 2), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
