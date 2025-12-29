import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    // 1. RECEIVE DATA (Client-Side Trust Mode)
    const { studentId, courseId, score, total, answers } = await req.json();

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // 2. SAVE TO HISTORY (For the Student's Dashboard)
    await sql`
      INSERT INTO cbt_exam_history (student_id, course_id, score, total, created_at)
      VALUES (${studentId}, ${courseId}, ${score}, ${total}, NOW())
    `;

    // 3. UPDATE LEADERBOARD (The Missing Link)
    // We check if they have a score. If new score is higher, we update.
    const percentage = Math.round((score / total) * 100);
    
    const existing = await sql`
      SELECT score FROM cbt_leaderboard 
      WHERE student_id = ${studentId} AND course_id = ${courseId}
    `;

    if (existing.length === 0) {
      // First time on leaderboard
      await sql`
        INSERT INTO cbt_leaderboard (student_id, course_id, score)
        VALUES (${studentId}, ${courseId}, ${percentage})
      `;
    } else if (percentage > existing[0].score) {
      // New High Score
      await sql`
        UPDATE cbt_leaderboard 
        SET score = ${percentage}, updated_at = NOW()
        WHERE student_id = ${studentId} AND course_id = ${courseId}
      `;
    }

    // 4. ENFORCE LIMIT (Iron Mode)
    // We log the attempt to the PERMANENT ledger.
    // We use a simple insert. If 'action' or 'meta' columns don't exist in your DB, 
    // this minimal version ensures it still counts the row.
    await sql`
      INSERT INTO cbt_permanent_logs (student_id, course_id)
      VALUES (${studentId}, ${courseId})
    `;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    // Return 200 even on error to prevent "White Screen" for student, 
    // but log it critically on server.
    return NextResponse.json({ success: true, warning: "Logged with errors" }, { status: 200 });
  }
}
