import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try to fetch from Leaderboard Table (Permissive: Score > 0)
    let leaders = await sql`
      SELECT 
        l.student_id, 
        l.score, 
        l.course_id,
        s.name, 
        s.department,
        c.code as course_code
      FROM cbt_leaderboard l
      JOIN cbt_students s ON l.student_id = s.id
      LEFT JOIN cbt_courses c ON l.course_id = c.id
      WHERE l.score > 0
      ORDER BY l.score DESC
      LIMIT 20
    `;

    // 2. SELF-HEALING: If Leaderboard is empty, fallback to History
    // This fixes the "Dead" state for users who took exams before the fix.
    if (leaders.length === 0) {
      leaders = await sql`
        SELECT DISTINCT ON (h.student_id)
          h.student_id,
          h.score,
          h.course_id,
          s.name,
          s.department,
          c.code as course_code
        FROM cbt_exam_history h
        JOIN cbt_students s ON h.student_id = s.id
        LEFT JOIN cbt_courses c ON h.course_id = c.id
        WHERE h.score > 0
        ORDER BY h.student_id, h.score DESC
        LIMIT 20
      `;
      
      // Sort the fallback results by score descending
      leaders.sort((a, b) => b.score - a.score);
    }
    
    return NextResponse.json(leaders);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
