import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get('postId');
  const comments = await sql`SELECT * FROM cbt_comments WHERE post_id = ${postId} ORDER BY created_at ASC`;
  return NextResponse.json({ comments }, { status: 200 });
}
export async function POST(req) {
  const { postId, studentId, name, content } = await req.json();
  await sql`INSERT INTO cbt_comments (post_id, student_id, author_name, content) VALUES (${postId}, ${studentId}, ${name}, ${content})`;
  await sql`UPDATE cbt_posts SET comments_count = comments_count + 1 WHERE id = ${postId}`;
  return NextResponse.json({ success: true }, { status: 200 });
}
