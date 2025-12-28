import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // THE ELITE FILTER: Only fetch scores where percentage >= 60%
    // We use a float cast to ensure precision during division
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
      WHERE r.total > 0 AND ((r.score::float / r.total::float) * 100) >= 60
      ORDER BY r.score DESC
      LIMIT 10
    `;

    return NextResponse.json(leaders);
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await sql`DELETE FROM cbt_results`;
    return NextResponse.json({ success: true, message: "Leaderboard purged." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
