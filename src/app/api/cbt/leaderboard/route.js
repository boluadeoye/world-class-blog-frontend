import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // We fetch the top 10 scores. 
    // We join cbt_results with cbt_students to get the Department and Name.
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
    console.error("Leaderboard API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
