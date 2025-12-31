import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, name, email, department, content, isAdmin } = body;

    if (!content || !studentId) {
      return NextResponse.json({ error: "Content and Student ID required" }, { status: 400 });
    }

    // 1. Fetch current premium status directly from DB to be 100% sure
    const studentQuery = await sql`SELECT subscription_status FROM cbt_students WHERE id::text = ${String(studentId)}`;
    const isPremium = studentQuery[0]?.subscription_status === 'premium';

    // 2. Insert with explicit casting to prevent type errors
    await sql`
      INSERT INTO cbt_posts (
        student_id, 
        author_name, 
        author_email, 
        department, 
        content, 
        is_admin, 
        is_premium, 
        is_announcement
      )
      VALUES (
        ${parseInt(studentId)}, 
        ${name}, 
        ${email}, 
        ${isAdmin ? null : department}, 
        ${content}, 
        ${isAdmin || false}, 
        ${isPremium || false}, 
        ${isAdmin || false}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
