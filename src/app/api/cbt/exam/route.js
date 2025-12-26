import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId) return NextResponse.json({ error: "Missing Course ID" }, { status: 400 });

  try {
    const client = await pool.connect();

    // 1. AUTHENTICATION & SECURITY
    let isPremium = false;
    let attempts = 0;

    if (studentId && token) {
      const studentRes = await client.query(
        'SELECT session_token, subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', 
        [studentId]
      );

      if (studentRes.rows.length > 0) {
        const student = studentRes.rows[0];
        
        // KILL SWITCH
        if (student.session_token !== token) {
          client.release();
          return NextResponse.json({ error: "Session Terminated. Logged in on another device." }, { status: 401 });
        }

        // CHECK PREMIUM
        const now = new Date();
        const expiresAt = new Date(student.premium_expires_at);
        isPremium = student.subscription_status === 'premium' && expiresAt > now;

        // COUNT PAST ATTEMPTS (Strict Enforcement)
        // We assume you have a 'cbt_results' table. If not, this check returns 0 and allows access (safe fail).
        try {
            const historyRes = await client.query(
                'SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2',
                [studentId, courseId]
            );
            attempts = parseInt(historyRes.rows[0].count);
        } catch (err) {
            // Table might not exist yet, allow pass for now
            console.warn("Could not check attempts history:", err.message);
        }
      }
    }

    // 2. THE FREEMIUM BLOCKADE
    if (!isPremium && attempts >= 2) {
      client.release();
      return NextResponse.json({ 
        error: "Free Limit Reached. You have used your 2 free attempts for this course. Upgrade to Premium for unlimited access." 
      }, { status: 403 });
    }

    // 3. FETCH CONTENT
    const limit = isPremium ? 100 : 30; // Taste vs Feast

    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    const questionsRes = await client.query(
      'SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT $2', 
      [courseId, limit]
    );

    client.release();

    // 4. DATA SANITIZATION
    const sanitizedQuestions = questionsRes.rows.map(q => {
      if (!isPremium) {
        const { explanation, ...safeQuestion } = q; // Strip intel
        return safeQuestion;
      }
      return q;
    });

    return NextResponse.json({
      course: courseRes.rows[0],
      questions: sanitizedQuestions,
      isPremium
    }, { status: 200 });

  } catch (error) {
    console.error("Exam API Error:", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
