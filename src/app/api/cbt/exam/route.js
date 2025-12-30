import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');
    const token = searchParams.get('token');
    const deviceId = searchParams.get('deviceId'); // <--- NEW HARDWARE ID

    if (!courseId || !studentId || !token) return NextResponse.json({ error: "Violation" }, { status: 400 });

    const students = await sql`SELECT * FROM cbt_students WHERE id = ${studentId}`;
    if (students.length === 0) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    const student = students[0];
    if (student.session_token !== token) return NextResponse.json({ error: "Session Expired" }, { status: 401 });

    const isPremium = student.subscription_status === 'premium';

    // THE IRON GATE: Check attempts by Student ID OR Device ID
    const history = await sql`
      SELECT COUNT(*) as count FROM cbt_permanent_logs 
      WHERE student_id = ${String(studentId)} 
         OR device_id = ${deviceId}
    `;
    
    const attempts = parseInt(history[0].count || 0);

    if (!isPremium && attempts >= 2) {
      return NextResponse.json({ error: "Hardware Limit Reached. Upgrade to Premium." }, { status: 403 });
    }

    const limit = isPremium ? 100 : 30;
    const courses = await sql`SELECT * FROM cbt_courses WHERE id = ${courseId}`;
    const questions = await sql`SELECT * FROM cbt_questions WHERE course_id = ${courseId} ORDER BY RANDOM() LIMIT ${limit}`;

    return NextResponse.json({ course: courses[0], questions, isPremium, attempts }, { status: 200 });
  } catch (error) { return NextResponse.json({ error: "System Error" }, { status: 500 }); }
}
