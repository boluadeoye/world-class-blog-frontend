import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get('postId');
  const userEmail = searchParams.get('email')?.toLowerCase().trim();
  const isAdmin = userEmail === 'verygreenwealth@gmail.com';

  const comments = await sql`
    SELECT c.*, s.email as author_email 
    FROM cbt_comments c
    JOIN cbt_students s ON c.student_id = s.id
    WHERE c.post_id = ${postId} 
    AND (c.is_hidden = FALSE OR s.email = ${userEmail} OR ${isAdmin} = TRUE)
    ORDER BY c.created_at ASC`;
  return NextResponse.json({ comments });
}
export async function POST(req) {
  const { postId, studentId, name, content } = await req.json();
  await sql`INSERT INTO cbt_comments (post_id, student_id, author_name, content) VALUES (${postId}, ${studentId}, ${name}, ${content})`;
  await sql`UPDATE cbt_posts SET comments_count = comments_count + 1 WHERE id = ${postId}`;
  return NextResponse.json({ success: true });
}
