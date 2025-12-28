import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentId, courseId, score, total, answers } = await req.json();

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // DUAL-WRITE PROTOCOL
    // 1. Write to Public Leaderboard (Wipeable)
    await sql`
      INSERT INTO cbt_results (student_id, course_id, score, total, answers) 
      VALUES (${String(studentId)}, ${String(courseId)}, ${score}, ${total}, ${JSON.stringify(answers)})
    `;

    // 2. Write to Permanent Security Ledger (Non-Wipeable)
    await sql`
      INSERT INTO cbt_permanent_logs (student_id, course_id) 
      VALUES (${String(studentId)}, ${String(courseId)})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
