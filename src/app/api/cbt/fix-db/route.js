import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();

    // 1. NUCLEAR OPTION: Drop the strict constraints causing the error
    // This frees the columns so we can change their type
    await client.query(`ALTER TABLE cbt_results DROP CONSTRAINT IF EXISTS cbt_results_student_id_fkey;`);
    await client.query(`ALTER TABLE cbt_results DROP CONSTRAINT IF EXISTS cbt_results_course_id_fkey;`);

    // 2. Now safely convert to TEXT (Universal Compatibility)
    await client.query(`ALTER TABLE cbt_results ALTER COLUMN student_id TYPE TEXT;`);
    await client.query(`ALTER TABLE cbt_results ALTER COLUMN course_id TYPE TEXT;`);

    // 3. Ensure other critical columns exist
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;`);
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS department TEXT;`);

    client.release();
    return NextResponse.json({ success: true, message: "Database Constraints Removed & Schema Fixed." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
