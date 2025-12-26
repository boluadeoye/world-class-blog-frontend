import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Add 'department' & 'level' (Maintenance)
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS department TEXT;`);
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS level TEXT;`);

    // 2. THE CRITICAL FIX: Add 'last_login'
    await client.query(`ALTER TABLE cbt_students ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;`);

    client.release();
    return NextResponse.json({ success: true, message: "Database Schema Patched: last_login added." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
