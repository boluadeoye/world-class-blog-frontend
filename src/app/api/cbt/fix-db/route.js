import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Create System Logs Table
    await sql`
      CREATE TABLE IF NOT EXISTS system_logs (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL, -- 'LOGIN', 'REGISTER', 'PAYMENT', 'ERROR', 'EXAM_START'
        user_identifier TEXT,     -- Email or Student ID
        details JSONB,            -- Metadata (Browser, Error Message, Amount)
        status TEXT,              -- 'SUCCESS', 'FAILURE', 'CRITICAL'
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 2. Index for high-speed monitoring
    await sql`CREATE INDEX IF NOT EXISTS idx_logs_event ON system_logs(event_type);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_logs_time ON system_logs(created_at DESC);`;

    return NextResponse.json({ success: true, message: "Omniscience Ledger Initialized." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
