import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept');
    const userEmail = searchParams.get('email')?.toLowerCase().trim();
    const isAdmin = userEmail === 'verygreenwealth@gmail.com';

    // Logic: Show if NOT hidden OR if I am the Author OR if I am the Admin
    const posts = await sql`
      SELECT * FROM cbt_posts 
      WHERE (department = ${dept} OR department IS NULL OR is_admin = TRUE)
      AND (is_hidden = FALSE OR author_email = ${userEmail} OR ${isAdmin} = TRUE)
      ORDER BY is_announcement DESC, created_at DESC LIMIT 50`;
    return NextResponse.json({ posts });
  } catch (error) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
