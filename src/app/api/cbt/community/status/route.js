import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept') || 'General';

    // THE UNIVERSAL COUNT:
    // 1. Posts matching student's dept (Case Insensitive)
    // 2. Posts with NULL or Empty department (Global)
    // 3. Posts marked as Admin/Announcement
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM cbt_posts 
      WHERE (TRIM(LOWER(department)) = TRIM(LOWER(${dept})))
         OR (department IS NULL OR department = '' OR department = 'General')
         OR (is_admin = TRUE OR is_announcement = TRUE)
    `;

    const count = parseInt(result[0].count || 0);
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
