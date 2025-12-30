import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';

    // Search Logic: Find by Name, Email, or Department
    // We limit to 100 to keep the phone fast.
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
      LIMIT 100
    `;

    const total = await sql`SELECT COUNT(*) FROM cbt_students`;
    const premium = await sql`SELECT COUNT(*) FROM cbt_students WHERE subscription_status = 'premium'`;

    return NextResponse.json({ 
      users, 
      stats: {
        total: total[0].count,
        premium: premium[0].count
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
