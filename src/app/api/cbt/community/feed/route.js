import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept');
    // Show: My Dept + General + Admin Announcements
    const posts = await sql`
      SELECT * FROM cbt_posts 
      WHERE department = ${dept} OR department IS NULL OR is_admin = TRUE
      ORDER BY is_announcement DESC, created_at DESC LIMIT 50
    `;
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
