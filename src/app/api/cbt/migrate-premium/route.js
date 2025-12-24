import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Add Subscription & Security Columns to Students
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free', -- 'free' or 'premium'
      ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS session_token TEXT; -- For Anti-Sharing Security
    `);

    // 2. Ensure Results table tracks timestamps properly for attempt counting
    // (Already done in initial setup, but good to verify)
    
    client.release();
    return new Response("Migration Successful: Premium & Security columns added.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Failed: ${error.message}`, { status: 500 });
  }
}
