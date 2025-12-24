import pool from '../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Upgrade Students Table (Add Username, Password Hash, Avatar)
    // We use ALTER to add columns if they don't exist
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS password_hash TEXT,
      ADD COLUMN IF NOT EXISTS avatar_url TEXT,
      ADD COLUMN IF NOT EXISTS wallet_balance INTEGER DEFAULT 0;
    `);

    // 2. Create Course Registration Table (Who is writing what?)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_registrations (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES cbt_students(id),
        course_id INTEGER REFERENCES cbt_courses(id),
        registered_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(student_id, course_id) -- Prevent double registration
      );
    `);

    // 3. Create Transaction/Payment Table (For the 200 naira fee)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_payments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES cbt_students(id),
        amount INTEGER NOT NULL,
        reference TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'success',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    client.release();
    return new Response("Database Security & Monetization Layer Upgraded.", { status: 200 });
  } catch (error) {
    return new Response(`Migration Error: ${error.message}`, { status: 500 });
  }
}
