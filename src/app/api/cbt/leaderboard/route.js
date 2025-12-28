import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leaders = await sql`
      SELECT 
        s.name, 
        s.department, 
        r.score, 
        r.total,
        c.code as course_code
      FROM cbt_results r
      JOIN cbt_students s ON r.student_id = s.id::text
      JOIN cbt_courses c ON r.course_id = c.id::text
      ORDER BY r.score DESC
      LIMIT 10
    `;
    return NextResponse.json(leaders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // PURGE ONLY THE PUBLIC LEADERBOARD
    // This does NOT touch cbt_permanent_logs, so security remains intact.
    await sql`DELETE FROM cbt_results`;
    return NextResponse.json({ success: true, message: "Leaderboard purged successfully." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
