import pool from '../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Create the 'links' table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        destination TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        clicks INTEGER DEFAULT 0
      );
    `);
    
    client.release();
    return new Response("Database Table 'links' Created Successfully", { status: 200 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
