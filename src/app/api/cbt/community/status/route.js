import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept') || 'General';

    // THE UNIVERSAL COUNT:
    // Counts everything the student is allowed to see.
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM cbt_posts 
      WHERE (LOWER(TRIM(department)) = LOWER(TRIM(${dept})))
         OR (department IS NULL OR department = '' OR LOWER(department) = 'general')
         OR (is_admin = TRUE OR is_announcement = TRUE)
    `;

    const count = parseInt(result[0].count || 0);
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Status API Error:", error.message);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
