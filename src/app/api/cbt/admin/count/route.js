import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Total Registrations
    const total = await sql`SELECT COUNT(*) FROM cbt_students`;
    
    // 2. Premium Users
    const premium = await sql`SELECT COUNT(*) FROM cbt_students WHERE subscription_status = 'premium'`;

    return NextResponse.json({ 
      total_registrations: Number(total[0].count),
      total_paid: Number(premium[0].count),
      timestamp: new Date().toLocaleString()
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
