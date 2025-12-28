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
      return NextResponse.json({ error: "Security Violation: Missing Credentials" }, { status: 400 });
    }

    // 1. Fetch Student & Verify Session
    const students = await sql`SELECT * FROM cbt_students WHERE id = ${studentId}`;
    if (!students || students.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    const student = students[0];
    if (student.session_token !== token) {
      return NextResponse.json({ error: "Session Terminated. Logged in elsewhere." }, { status: 401 });
    }

    const isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();

    // 2. STRICT ATTEMPT ENFORCEMENT (The Fix)
    // We cast IDs to TEXT to ensure the match is perfect regardless of DB schema
    const history = await sql`
      SELECT COUNT(*) as count 
      FROM cbt_results 
      WHERE student_id::text = ${String(studentId)} 
      AND course_id::text = ${String(courseId)}
    `;
    const attempts = parseInt(history[0].count || 0);

    if (!isPremium && attempts >= 2) {
      return NextResponse.json({ 
        error: `Free Limit Reached. You have used ${attempts}/2 attempts. Upgrade to Premium for unlimited access.` 
      }, { status: 403 });
    }

    // 3. Fetch Content (30 for Free, 100 for Premium)
    const limit = isPremium ? 100 : 30;
    const courses = await sql`SELECT * FROM cbt_courses WHERE id = ${courseId}`;
    const questions = await sql`SELECT * FROM cbt_questions WHERE course_id = ${courseId} ORDER BY RANDOM() LIMIT ${limit}`;

    if (!courses || courses.length === 0) return NextResponse.json({ error: "Course not found" }, { status: 404 });

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
    console.error("CRITICAL EXAM API ERROR:", error);
    return NextResponse.json({ error: "System Security Error" }, { status: 500 });
  }
}
