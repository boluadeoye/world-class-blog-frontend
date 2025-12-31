import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');
    const token = searchParams.get('token');
    const deviceId = searchParams.get('deviceId');
    const requestedLimit = parseInt(searchParams.get('limit') || '30');

    if (!courseId || !studentId || !token) {
      return NextResponse.json({ error: "Security Violation" }, { status: 400 });
    }

    const students = await sql`SELECT * FROM cbt_students WHERE id::text = ${String(studentId)}`;
    if (students.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    const student = students[0];
    if (student.session_token !== token) {
      return NextResponse.json({ error: "Session Terminated." }, { status: 401 });
    }

    const isPremium = student.subscription_status === 'premium';

    // IRON GATE: Check attempts for Free Users
    if (!isPremium) {
      // FIX: Filter by COURSE ID so they get 2 attempts PER COURSE
      const history = await sql`
        SELECT COUNT(*) as count
        FROM cbt_permanent_logs
        WHERE (student_id::text = ${String(studentId)} OR device_id = ${deviceId})
        AND course_id::text = ${String(courseId)}
      `;
      
      const attempts = parseInt(history[0].count || 0);
      
      if (attempts >= 2) {
        return NextResponse.json({ error: "Free Limit Reached for this Course. Upgrade to Premium." }, { status: 403 });
      }
    }

    // PREMIUM LOGIC: Respect requested limit (max 100). Free is locked to 30.
    const limit = isPremium ? Math.min(requestedLimit, 100) : 30;

    const courses = await sql`SELECT * FROM cbt_courses WHERE id::text = ${String(courseId)}`;
    const questions = await sql`SELECT * FROM cbt_questions WHERE course_id::text = ${String(courseId)} ORDER BY RANDOM() LIMIT ${limit}`;

    return NextResponse.json({
      course: courses[0],
      questions,
      isPremium,
      attempts: 0 // We don't need to send the count to the frontend, just the data
    }, { status: 200 });

  } catch (error) {
    console.error("EXAM_API_ERROR:", error.message);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
