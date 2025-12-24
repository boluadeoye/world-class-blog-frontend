import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Add Subscription & Security Columns
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
      ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS session_token TEXT;
    `);

    client.release();
    return new Response("Migration Successful: Premium & Security columns added.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Failed: ${error.message}`, { status: 500 });
  }
}
