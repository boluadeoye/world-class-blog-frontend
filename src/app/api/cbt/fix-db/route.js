import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();

    // 1. THE CRITICAL FIX: Add 'total' column
    await client.query(`ALTER TABLE cbt_results ADD COLUMN IF NOT EXISTS total INT;`);
    
    // 2. Safety Checks (Ensure other columns exist too)
    await client.query(`ALTER TABLE cbt_results ADD COLUMN IF NOT EXISTS answers JSONB;`);
    await client.query(`ALTER TABLE cbt_results ADD COLUMN IF NOT EXISTS score INT;`);
    
    // 3. Ensure IDs are TEXT (Universal Compatibility)
    // We use a try-catch block here in case they are already converted
    try {
        await client.query(`ALTER TABLE cbt_results ALTER COLUMN student_id TYPE TEXT;`);
        await client.query(`ALTER TABLE cbt_results ALTER COLUMN course_id TYPE TEXT;`);
    } catch (e) {
        console.log("ID conversion skipped or failed (non-critical if table exists)");
    }

    client.release();
    return NextResponse.json({ success: true, message: "Database Repaired: 'total' column added successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
