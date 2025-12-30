import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept');

    // Logic: Show posts from My Dept OR General OR Admin Announcements
    const posts = await sql`
      SELECT * FROM cbt_posts 
      WHERE department = ${dept} 
         OR department IS NULL 
         OR is_admin = TRUE
      ORDER BY created_at DESC
      LIMIT 50
    `;

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
