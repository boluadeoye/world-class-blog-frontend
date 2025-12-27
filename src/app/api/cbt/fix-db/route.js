import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Ensure Students table has columns
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS department TEXT;`);
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS level TEXT;`);
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;`);

    // 2. FORCE CREATE RESULTS TABLE (Robust Version)
    // We use IF NOT EXISTS, but we also ensure columns are flexible
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_results (
        id SERIAL PRIMARY KEY,
        student_id INT, 
        course_id INT,
        score INT NOT NULL,
        total INT NOT NULL,
        answers JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 3. Create Index for Speed
    await client.query(`CREATE INDEX IF NOT EXISTS idx_results_check ON cbt_results(student_id, course_id);`);

    client.release();
    return NextResponse.json({ success: true, message: "Database Hardened. Results Table Ready." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
