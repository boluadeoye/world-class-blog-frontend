import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { studentId, name, page, action } = await req.json();

    // 1. Auto-Create Table (Self-Healing)
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_live_traffic (
        student_id INT PRIMARY KEY,
        name TEXT,
        page TEXT,
        action TEXT,
        last_seen TIMESTAMP DEFAULT NOW()
      )
    `;

    // 2. Register the Pulse (Upsert)
    await sql`
      INSERT INTO cbt_live_traffic (student_id, name, page, action, last_seen)
      VALUES (${studentId}, ${name}, ${page}, ${action}, NOW())
      ON CONFLICT (student_id) 
      DO UPDATE SET 
        page = EXCLUDED.page, 
        action = EXCLUDED.action, 
        last_seen = NOW();
    `;

    // 3. Cleanup Dead Signals (Older than 2 minutes)
    // This keeps the table small and accurate.
    await sql`DELETE FROM cbt_live_traffic WHERE last_seen < NOW() - INTERVAL '2 minutes'`;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
