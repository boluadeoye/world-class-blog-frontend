import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Force add email column if missing
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
    `);

    // Ensure department has a default
    await client.query(`
      ALTER TABLE cbt_students 
      ALTER COLUMN department SET DEFAULT 'General Studies';
    `);

    client.release();
    return new Response("Database Schema Fixed: Email column ensured.", { status: 200 });
  } catch (error) {
    return new Response(`Fix Failed: ${error.message}`, { status: 500 });
  }
}
