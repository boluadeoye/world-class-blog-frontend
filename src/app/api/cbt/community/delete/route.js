import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  const { postId, adminEmail } = await req.json();
  if (adminEmail.toLowerCase().trim() !== 'verygreenwealth@gmail.com') return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  await sql`DELETE FROM cbt_posts WHERE id = ${postId}`;
  await sql`DELETE FROM cbt_comments WHERE post_id = ${postId}`;
  return NextResponse.json({ success: true });
}
