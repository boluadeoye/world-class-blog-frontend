import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Ensure Table Exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_results (
        id SERIAL PRIMARY KEY,
        student_id TEXT, 
        course_id TEXT,
        score INT NOT NULL,
        total INT NOT NULL,
        answers JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. NUCLEAR OPTION: Convert existing columns to TEXT to prevent Type Mismatch errors
    // This ensures that whether the ID is 1 or "1", it saves.
    await client.query(`ALTER TABLE cbt_results ALTER COLUMN student_id TYPE TEXT;`);
    await client.query(`ALTER TABLE cbt_results ALTER COLUMN course_id TYPE TEXT;`);

    // 3. Ensure Index Exists
    await client.query(`CREATE INDEX IF NOT EXISTS idx_results_check ON cbt_results(student_id, course_id);`);

    client.release();
    return NextResponse.json({ success: true, message: "Database Hardened: IDs converted to TEXT." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
