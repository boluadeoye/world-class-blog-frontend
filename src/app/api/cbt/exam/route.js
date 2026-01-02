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

    // 1. Validate Student
    const students = await sql`SELECT * FROM cbt_students WHERE id::text = ${String(studentId)}`;
    if (students.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
    
    const student = students[0];
    if (student.session_token !== token) {
      return NextResponse.json({ error: "Session Terminated." }, { status: 401 });
    }

    // 2. Fetch Course Details (Needed for Iron Gate Logic)
    const courses = await sql`SELECT * FROM cbt_courses WHERE id::text = ${String(courseId)}`;
    if (courses.length === 0) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    const course = courses[0];

    const isPremium = student.subscription_status === 'premium';

    // 3. THE IRON GATE: Enforce Limits based on Course Type
    if (!isPremium) {
      // LOGIC: GSTs get 2 attempts. Others get 1.
      const isGst = course.code.toUpperCase().startsWith('GST');
      const allowedAttempts = isGst ? 2 : 1;

      const history = await sql`
        SELECT COUNT(*) as count
        FROM cbt_permanent_logs
        WHERE (student_id::text = ${String(studentId)} OR device_id = ${deviceId})
        AND course_id::text = ${String(courseId)}
      `;

      const attempts = parseInt(history[0].count || 0);

      if (attempts >= allowedAttempts) {
        const msg = isGst 
          ? "Free Limit Reached (2/2). Upgrade to Premium." 
          : "Free Limit Reached (1/1). Departmental courses allow only 1 free attempt.";
        return NextResponse.json({ error: msg }, { status: 403 });
      }
    }

    // 4. PREMIUM LOGIC: Respect requested limit (max 100). Free is locked to 30.
    const limit = isPremium ? Math.min(requestedLimit, 100) : 30;

    // 5. Fetch Questions
    const questions = await sql`SELECT * FROM cbt_questions WHERE course_id::text = ${String(courseId)} ORDER BY RANDOM() LIMIT ${limit}`;

    return NextResponse.json({
      course: course,
      questions,
      isPremium,
      attempts: 0 
    }, { status: 200 });

  } catch (error) {
    console.error("EXAM_API_ERROR:", error.message);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
