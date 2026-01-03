import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { studentId, name, page, action } = await req.json();

    // OPTIMIZED: Only do the Upsert. 
    // Table creation and cleanup are moved out of the high-frequency path.
    await sql`
      INSERT INTO cbt_live_traffic (student_id, name, page, action, last_seen)
      VALUES (${studentId}, ${name}, ${page}, ${action}, NOW())
      ON CONFLICT (student_id)
      DO UPDATE SET
        page = EXCLUDED.page,
        action = EXCLUDED.action,
        last_seen = NOW();
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
