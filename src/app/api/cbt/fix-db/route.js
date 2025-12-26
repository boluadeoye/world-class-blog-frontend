import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Add 'department' column if missing
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS department TEXT;
    `);

    // 2. Add 'level' column if missing
    await client.query(`
      ALTER TABLE cbt_students 
      ADD COLUMN IF NOT EXISTS level TEXT;
    `);

    client.release();
    return NextResponse.json({ success: true, message: "Database Schema Updated Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
