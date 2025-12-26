import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

// Force dynamic to prevent caching of random questions
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId) return NextResponse.json({ error: "Missing Course ID" }, { status: 400 });

  try {
    const client = await pool.connect();

    // 1. SECURITY & AUTHENTICATION
    let isPremium = false;

    if (studentId && token) {
      const studentRes = await client.query(
        'SELECT session_token, subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', 
        [studentId]
      );

      if (studentRes.rows.length > 0) {
        const student = studentRes.rows[0];
        
        // THE KILL SWITCH: Atomic Session Locking
        if (student.session_token !== token) {
          client.release();
          return NextResponse.json({ error: "Session Terminated. Logged in on another device." }, { status: 401 });
        }

        // Check Premium Status
        const now = new Date();
        const expiresAt = new Date(student.premium_expires_at);
        isPremium = student.subscription_status === 'premium' && expiresAt > now;
      }
    }

    // 2. FREEMIUM LOGIC GATES
    // Free: 30 Questions (Taste) | Premium: 100 Questions (Feast)
    const limit = isPremium ? 100 : 30;

    // 3. FETCH CONTENT
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    const questionsRes = await client.query(
      'SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT $2', 
      [courseId, limit]
    );

    client.release();

    // 4. DATA SANITIZATION (The Fortress Wall)
    // Remove sensitive "explanation" data for free users so they can't inspect element to cheat.
    const sanitizedQuestions = questionsRes.rows.map(q => {
      if (!isPremium) {
        // Destructure to separate explanation from the rest
        const { explanation, ...safeQuestion } = q;
        return safeQuestion;
      }
      return q; // Premium gets everything
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
