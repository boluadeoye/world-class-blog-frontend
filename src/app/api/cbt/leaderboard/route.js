import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // STRATEGY: Fetch from History but FILTER for Premium Status
    // We bypass the 'cbt_leaderboard' table to ensure we get the absolute latest data
    // and we JOIN with 'cbt_students' to check the subscription.

    const rawData = await sql`
      SELECT DISTINCT ON (h.student_id)
        h.student_id,
        s.name,
        s.department,
        s.subscription_status,
        c.code as course_code,
        h.score,
        h.total
      FROM cbt_exam_history h
      JOIN cbt_students s ON h.student_id::text = s.id::text
      LEFT JOIN cbt_courses c ON h.course_id::text = c.id::text
      WHERE h.total > 0 
      AND s.subscription_status = 'premium'  -- <--- THE VIP FILTER
      ORDER BY h.student_id, h.score DESC
    `;

    // Calculate Percentage & Sort
    const leaders = rawData
      .map(item => {
        const pct = Math.round((item.score / item.total) * 100);
        return {
          name: item.name,
          department: item.department || 'Elite Squad',
          score: pct,
          course_code: item.course_code || 'MOCK'
        };
      })
      .filter(student => student.score >= 60) // Keep the 60% Standard
      .sort((a, b) => b.score - a.score); // Highest Score First

    // Return Top 20 VIPs
    return NextResponse.json(leaders.slice(0, 20));

  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
