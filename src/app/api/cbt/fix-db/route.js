import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();

    // 1. NUCLEAR RESET: Drop the broken table
    await client.query(`DROP TABLE IF EXISTS cbt_results;`);

    // 2. RECREATE CLEANLY (Universal Text IDs)
    await client.query(`
      CREATE TABLE cbt_results (
        id SERIAL PRIMARY KEY,
        student_id TEXT NOT NULL,
        course_id TEXT NOT NULL,
        score INT DEFAULT 0,
        total INT DEFAULT 0,
        answers JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 3. INDEX FOR SPEED
    await client.query(`CREATE INDEX idx_results_lookup ON cbt_results(student_id, course_id);`);

    client.release();
    return NextResponse.json({ success: true, message: "Database Reset: Results Table Rebuilt." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
