import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  // 1. INPUT VALIDATION
  if (!courseId || !studentId || !token) {
    return NextResponse.json({ error: "Security Violation: Missing Credentials" }, { status: 400 });
  }

  const client = await pool.connect();

  try {
    // 2. FETCH STUDENT & SECURITY DATA
    const studentRes = await client.query(
      'SELECT session_token, subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', 
      [studentId]
    );

    if (studentRes.rows.length === 0) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const student = studentRes.rows[0];

    // 3. ATOMIC SESSION LOCK (The Kill Switch)
    if (student.session_token !== token) {
      return NextResponse.json({ error: "Session Terminated. Logged in on another device." }, { status: 401 });
    }

    // 4. CHECK PREMIUM STATUS
    const now = new Date();
    const expiresAt = new Date(student.premium_expires_at);
    const isPremium = student.subscription_status === 'premium' && expiresAt > now;

    // 5. CHECK ATTEMPT HISTORY (Fail-Secure)
    let attempts = 999; // Default to "Blocked" if query fails
    try {
      const historyRes = await client.query(
        'SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2',
        [String(studentId), String(courseId)]
      );
      attempts = parseInt(historyRes.rows[0].count);
    } catch (err) {
      console.error("History Check Failed:", err);
      return NextResponse.json({ error: "Security Check Failed. Contact Support." }, { status: 500 });
    }

    // 6. FREEMIUM ENFORCEMENT
    if (!isPremium && attempts >= 2) {
      return NextResponse.json({ 
        error: `Free Limit Reached (${attempts}/2 Attempts Used). Upgrade to Premium to continue.` 
      }, { status: 403 });
    }

    // 7. FETCH CONTENT
    const limit = isPremium ? 100 : 30;
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    const questionsRes = await client.query(
      'SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT $2', 
      [courseId, limit]
    );

    // 8. DATA SANITIZATION
    const sanitizedQuestions = questionsRes.rows.map(q => {
      if (!isPremium) {
        const { explanation, ...safeQuestion } = q;
        return safeQuestion;
      }
      return q;
    });

    return NextResponse.json({
      course: courseRes.rows[0],
      questions: sanitizedQuestions,
      isPremium,
      attempts // Send this back so UI can show "Attempt 1 of 2"
    }, { status: 200 });

  } catch (error) {
    console.error("Exam API Critical Error:", error);
    return NextResponse.json({ error: "System Critical Error" }, { status: 500 });
  } finally {
    client.release();
  }
}
