import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId) return NextResponse.json({ error: "Missing Course ID" }, { status: 400 });

  const client = await pool.connect(); // OPEN CONNECTION

  try {
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
          return NextResponse.json({ error: "Session Terminated." }, { status: 401 });
        }

        // CHECK PREMIUM
        const now = new Date();
        const expiresAt = new Date(student.premium_expires_at);
        isPremium = student.subscription_status === 'premium' && expiresAt > now;

        // COUNT ATTEMPTS
        try {
            const historyRes = await client.query(
                'SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2',
                [String(studentId), String(courseId)]
            );
            attempts = parseInt(historyRes.rows[0].count);
        } catch (err) {
            console.warn("History check failed:", err);
        }
      }
    }

    // FREEMIUM BLOCKADE
    if (!isPremium && attempts >= 2) {
      return NextResponse.json({ 
        error: "Free Limit Reached. Upgrade to Premium." 
      }, { status: 403 });
    }

    // FETCH CONTENT
    const limit = isPremium ? 100 : 30;
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    const questionsRes = await client.query(
      'SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT $2', 
      [courseId, limit]
    );

    // DATA SANITIZATION
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
      isPremium
    }, { status: 200 });

  } catch (error) {
    console.error("Exam API Error:", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  } finally {
    client.release(); // CRITICAL: ALWAYS RELEASE CONNECTION
  }
}
