import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  try {
    const { studentId, name, email, department, content, isAdmin } = await req.json();
    const targetDept = isAdmin ? null : department; // Admin = Global
    await sql`
      INSERT INTO cbt_posts (student_id, author_name, author_email, department, content, is_admin, is_announcement)
      VALUES (${studentId}, ${name}, ${email}, ${targetDept}, ${content}, ${isAdmin}, ${isAdmin})
    `;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
