import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) return NextResponse.json({ error: "Missing Student ID" }, { status: 400 });

  try {
    // Fetch results joined with course details
    const history = await sql`
      SELECT 
        r.id,
        r.score,
        r.total,
        r.created_at,
        c.code as course_code,
        c.title as course_title
      FROM cbt_results r
      JOIN cbt_courses c ON r.course_id = c.id::text
      WHERE r.student_id = ${studentId}
      ORDER BY r.created_at DESC
    `;

    return NextResponse.json(history);
  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
