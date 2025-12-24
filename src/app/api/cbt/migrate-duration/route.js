import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Add duration column (Default 15 mins)
    await client.query(`
      ALTER TABLE cbt_courses 
      ADD COLUMN IF NOT EXISTS duration INTEGER DEFAULT 15;
    `);

    client.release();
    return new Response("Migration Successful: Duration column added.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Failed: ${error.message}`, { status: 500 });
  }
}
