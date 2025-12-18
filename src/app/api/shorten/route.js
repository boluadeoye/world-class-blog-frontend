import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { url, alias } = await req.json();
    
    // 1. Generate Slug (Use alias or random 6-char string)
    const slug = alias || Math.random().toString(36).substring(2, 8);

    // 2. Insert into Neon
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO links (slug, destination) VALUES ($1, $2)',
        [slug, url]
      );
    } catch (err) {
      // Handle duplicate alias error
      if (err.code === '23505') {
        return new Response(JSON.stringify({ error: "Alias already taken" }), { status: 409 });
      }
      throw err;
    } finally {
      client.release();
    }

    return new Response(JSON.stringify({ shortUrl: `https://boluadeoye.com.ng/go/${slug}` }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Database Error" }), { status: 500 });
  }
}
