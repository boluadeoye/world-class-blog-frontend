import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Create Results Table (The Memory)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_results (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES cbt_students(id),
        course_id INT REFERENCES cbt_courses(id),
        score INT NOT NULL,
        total INT NOT NULL,
        answers JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Add Index for Speed (Critical for high traffic)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_results_student_course ON cbt_results(student_id, course_id);`);

    client.release();
    return NextResponse.json({ success: true, message: "Security Infrastructure Deployed: Results Table Ready." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
