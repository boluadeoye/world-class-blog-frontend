import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const dept = searchParams.get('dept');

    // Count posts relevant to this student
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM cbt_posts 
      WHERE department = ${dept} 
         OR department IS NULL 
         OR is_admin = TRUE
    `;

    const count = parseInt(result[0].count);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
