import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { studentId, courseId, score, total, answers, deviceId } = await req.json();

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // 1. Save to History
    await sql`
      INSERT INTO cbt_exam_history (student_id, course_id, score, total, created_at)
      VALUES (${String(studentId)}, ${String(courseId)}, ${score}, ${total}, NOW())
    `;

    // 2. Update Leaderboard (Premium Only Logic is handled in the Leaderboard GET API)
    const percentage = Math.round((score / total) * 100);
    const existing = await sql`
      SELECT score FROM cbt_leaderboard 
      WHERE student_id::text = ${String(studentId)} AND course_id::text = ${String(courseId)}
    `;

    if (existing.length === 0) {
      await sql`
        INSERT INTO cbt_leaderboard (student_id, course_id, score)
        VALUES (${String(studentId)}, ${String(courseId)}, ${percentage})
      `;
    } else if (percentage > existing[0].score) {
      await sql`
        UPDATE cbt_leaderboard 
        SET score = ${percentage}, updated_at = NOW()
        WHERE student_id::text = ${String(studentId)} AND course_id::text = ${String(courseId)}
      `;
    }

    // 3. THE IRON CLAMP: Record the Hardware ID in the Permanent Ledger
    // This is what stops the "Account Hoppers"
    await sql`
      INSERT INTO cbt_permanent_logs (student_id, course_id, device_id)
      VALUES (${String(studentId)}, ${String(courseId)}, ${deviceId || 'unknown'})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
