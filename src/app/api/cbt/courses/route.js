import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await sql`SELECT * FROM cbt_courses ORDER BY created_at DESC`;
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { code, title, level, duration } = await req.json();
    await sql`
      INSERT INTO cbt_courses (code, title, level, duration) 
      VALUES (${code.toUpperCase()}, ${title}, ${parseInt(level)}, ${parseInt(duration || 15)})
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

    if (!id) return NextResponse.json({ error: "Missing Course ID" }, { status: 400 });

    // NUCLEAR CASCADE: Delete everything linked to this course ID
    // 1. Delete Questions
    await sql`DELETE FROM cbt_questions WHERE course_id = ${id}`;
    // 2. Delete Results
    await sql`DELETE FROM cbt_results WHERE course_id = ${id}`;
    // 3. Delete the Course itself
    await sql`DELETE FROM cbt_courses WHERE id = ${id}`;

    return NextResponse.json({ success: true, message: "Course and all associated data wiped." });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
