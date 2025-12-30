import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  try {
    const { studentId, name, email, department, content, isAdmin } = await req.json();
    const student = await sql`SELECT subscription_status FROM cbt_students WHERE id = ${studentId}`;
    const isPremium = student[0]?.subscription_status === 'premium';
    await sql`INSERT INTO cbt_posts (student_id, author_name, author_email, department, content, is_admin, is_premium, is_announcement)
      VALUES (${studentId}, ${name}, ${email}, ${isAdmin ? null : department}, ${content}, ${isAdmin}, ${isPremium}, ${isAdmin})`;
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
