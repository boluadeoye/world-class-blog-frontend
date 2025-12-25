import pool from '../../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Add Security & Monetization Columns
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS session_token TEXT,
      ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'free',
      ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMP;
    `);

    // 2. Ensure Results table exists for attempt tracking
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_results (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES cbt_students(id),
        course_id INTEGER REFERENCES cbt_courses(id),
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        time_spent_seconds INTEGER,
        taken_at TIMESTAMP DEFAULT NOW()
      );
    `);

    client.release();
    return new Response("Migration Successful: Fortress Architecture Applied.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Failed: ${error.message}`, { status: 500 });
  }
}
