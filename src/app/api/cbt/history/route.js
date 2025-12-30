import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');

  if (!studentId) return NextResponse.json({ error: "Missing Student ID" }, { status: 400 });

  try {
    // FIX: Pointing to the correct 'cbt_exam_history' table
    const history = await sql`
      SELECT 
        h.id, 
        h.score, 
        h.total, 
        h.created_at, 
        c.code as course_code, 
        c.title as course_title 
      FROM cbt_exam_history h
      JOIN cbt_courses c ON h.course_id::text = c.id::text
      WHERE h.student_id = ${studentId}
      ORDER BY h.created_at DESC
    `;

    return NextResponse.json(history);
  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
