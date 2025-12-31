import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';

    // Fetch students with search logic (Name, Email, or Dept)
    const users = await sql`
      SELECT 
        id, 
        name, 
        email, 
        department, 
        subscription_status, 
        to_char(created_at, 'DD Mon YYYY, HH24:MI') as joined_at
      FROM cbt_students 
      WHERE name ILIKE ${'%' + search + '%'} 
         OR email ILIKE ${'%' + search + '%'}
         OR department ILIKE ${'%' + search + '%'}
      ORDER BY created_at DESC
      LIMIT 200
    `;

    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM cbt_students) as total,
        (SELECT COUNT(*) FROM cbt_students WHERE subscription_status = 'premium') as premium
    `;

    return NextResponse.json({ 
      users, 
      stats: {
        total: stats[0].total,
        premium: stats[0].premium
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
