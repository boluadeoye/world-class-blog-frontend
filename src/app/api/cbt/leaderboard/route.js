import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch Best Scores from History (Bypassing potentially stale Leaderboard table)
    const rawData = await sql`
      SELECT DISTINCT ON (h.student_id)
        h.student_id,
        s.name,
        s.department,
        c.code as course_code,
        h.score,
        h.total
      FROM cbt_exam_history h
      JOIN cbt_students s ON h.student_id::text = s.id::text
      LEFT JOIN cbt_courses c ON h.course_id::text = c.id::text
      WHERE h.total > 0
      ORDER BY h.student_id, h.score DESC
    `;

    // 2. Calculate & ENFORCE 60% THRESHOLD
    const leaders = rawData
      .map(item => {
        const pct = Math.round((item.score / item.total) * 100);
        return {
          name: item.name,
          department: item.department || 'General Student',
          score: pct,
          course_code: item.course_code || 'MOCK'
        };
      })
      .filter(student => student.score >= 60) // <--- THE IRON RULE
      .sort((a, b) => b.score - a.score); // Highest first

    // 3. Return Top 20 Elite Students
    return NextResponse.json(leaders.slice(0, 20));

  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
