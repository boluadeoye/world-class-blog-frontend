import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    let courses;

    if (studentId) {
      // FIX: Cast columns to ::text to prevent "integer = text" mismatch
      // FIX: Keep COUNT(*)::int to prevent BigInt serialization crash
      courses = await sql`
        SELECT
          c.*,
          (
            SELECT COUNT(*)::int 
            FROM cbt_exam_history r 
            WHERE r.course_id::text = c.id::text 
            AND r.student_id::text = ${String(studentId)}
          ) as user_attempts
        FROM cbt_courses c
        ORDER BY c.code ASC
      `;
    } else {
      courses = await sql`SELECT * FROM cbt_courses ORDER BY code ASC`;
    }

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("Courses API Error:", error);
    return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { code, title, level, duration } = await req.json();
    await sql`
      INSERT INTO cbt_courses (code, title, level, duration)
      VALUES (${code.toUpperCase()}, ${title}, ${String(level)}, ${parseInt(duration || 15)})
    `;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    await sql`DELETE FROM cbt_questions WHERE course_id = ${id}`;
    await sql`DELETE FROM cbt_exam_history WHERE course_id = ${id}`;
    await sql`DELETE FROM cbt_courses WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
