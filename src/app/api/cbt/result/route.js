import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentId, courseId, score, total, answers } = await req.json();

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // Stateless Insert
    await sql`
      INSERT INTO cbt_results (student_id, course_id, score, total, answers) 
      VALUES (${String(studentId)}, ${String(courseId)}, ${score}, ${total}, ${JSON.stringify(answers)})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
