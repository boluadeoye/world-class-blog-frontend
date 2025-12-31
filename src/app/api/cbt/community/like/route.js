import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  try {
    const { postId, studentId, reaction } = await req.json(); // reaction = '😂', '❤️', etc.
    
    // Check if exists
    const existing = await sql`SELECT * FROM cbt_likes WHERE post_id = ${postId} AND student_id = ${studentId}`;

    if (existing.length > 0) {
      // If clicking same reaction, remove it (Toggle off)
      if (existing[0].reaction === reaction) {
        await sql`DELETE FROM cbt_likes WHERE post_id = ${postId} AND student_id = ${studentId}`;
        await sql`UPDATE cbt_posts SET likes_count = likes_count - 1 WHERE id = ${postId}`;
        return NextResponse.json({ status: 'removed' });
      } else {
        // If changing reaction, update it
        await sql`UPDATE cbt_likes SET reaction = ${reaction} WHERE post_id = ${postId} AND student_id = ${studentId}`;
        return NextResponse.json({ status: 'updated', reaction });
      }
    } else {
      // New Reaction
      await sql`INSERT INTO cbt_likes (post_id, student_id, reaction) VALUES (${postId}, ${studentId}, ${reaction})`;
      await sql`UPDATE cbt_posts SET likes_count = likes_count + 1 WHERE id = ${postId}`;
      return NextResponse.json({ status: 'added', reaction });
    }
  } catch (error) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
