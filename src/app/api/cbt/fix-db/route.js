import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Create the Permanent Security Ledger (This is NEVER wiped by Admin)
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_permanent_logs (
        id SERIAL PRIMARY KEY,
        student_id TEXT NOT NULL,
        course_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 2. Ensure Index for high-speed security checks
    await sql`CREATE INDEX IF NOT EXISTS idx_perm_logs_lookup ON cbt_permanent_logs(student_id, course_id);`;

    return NextResponse.json({ success: true, message: "Sovereign Security Ledger Initialized." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
