import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // REMOVED phone_number to match your actual schema
    const students = await sql`
      SELECT 
        id, 
        name, 
        email, 
        department, 
        subscription_status, 
        to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as joined_at
      FROM cbt_students 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ 
      total_count: students.length,
      premium_count: students.filter(s => s.subscription_status === 'premium').length,
      data: students 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
