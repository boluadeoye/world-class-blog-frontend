import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { studentId, name, email, department, content, isAdmin } = await req.json();

    if (!content || !studentId) return NextResponse.json({ error: "Empty payload" }, { status: 400 });

    // If Admin, department is NULL (Global) and is_announcement is TRUE
    const targetDept = isAdmin ? null : department;
    const isAnnouncement = isAdmin; 

    await sql`
      INSERT INTO cbt_posts (student_id, author_name, author_email, department, content, is_admin, is_announcement)
      VALUES (${studentId}, ${name}, ${email}, ${targetDept}, ${content}, ${isAdmin}, ${isAnnouncement})
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
