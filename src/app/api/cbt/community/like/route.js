import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { postId, studentId } = await req.json();

    // Check if already liked
    const existing = await sql`SELECT * FROM cbt_likes WHERE post_id = ${postId} AND student_id = ${studentId}`;

    if (existing.length > 0) {
      // UNLIKE
      await sql`DELETE FROM cbt_likes WHERE post_id = ${postId} AND student_id = ${studentId}`;
      await sql`UPDATE cbt_posts SET likes_count = likes_count - 1 WHERE id = ${postId}`;
      return NextResponse.json({ liked: false });
    } else {
      // LIKE
      await sql`INSERT INTO cbt_likes (post_id, student_id) VALUES (${postId}, ${studentId})`;
      await sql`UPDATE cbt_posts SET likes_count = likes_count + 1 WHERE id = ${postId}`;
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
