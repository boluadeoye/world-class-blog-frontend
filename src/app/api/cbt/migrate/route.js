import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Add email column if it doesn't exist
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
    `);

    // Also ensure cbt_admins has email just in case
    await client.query(`
      ALTER TABLE cbt_admins 
      ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
    `);

    client.release();
    return new Response("Migration Successful: Email column added.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Failed: ${error.message}`, { status: 500 });
  }
}
