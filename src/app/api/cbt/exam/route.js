import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');
    const token = searchParams.get('token');

    if (!courseId || !studentId || !token) {
      return NextResponse.json({ error: "Security Violation" }, { status: 400 });
    }

    const students = await sql`SELECT * FROM cbt_students WHERE id = ${studentId}`;
    if (students.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    const student = students[0];
    if (student.session_token !== token) {
      return NextResponse.json({ error: "Session Terminated." }, { status: 401 });
    }

    const isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();

    // SECURITY CHECK: Look at the PERMANENT Ledger, not the Leaderboard
    const history = await sql`
      SELECT COUNT(*) as count 
      FROM cbt_permanent_logs 
      WHERE student_id = ${String(studentId)} 
      AND course_id = ${String(courseId)}
    `;
    const attempts = parseInt(history[0].count || 0);

    if (!isPremium && attempts >= 2) {
      return NextResponse.json({ error: "Free Limit Reached." }, { status: 403 });
    }

    const limit = isPremium ? 100 : 30;
    const courses = await sql`SELECT * FROM cbt_courses WHERE id = ${courseId}`;
    const questions = await sql`SELECT * FROM cbt_questions WHERE course_id = ${courseId} ORDER BY RANDOM() LIMIT ${limit}`;

    const sanitizedQuestions = questions.map(q => {
      if (!isPremium) {
        const { explanation, ...safe } = q;
        return safe;
      }
      return q;
    });

    return NextResponse.json({
      course: courses[0],
      questions: sanitizedQuestions,
      isPremium,
      attempts
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
