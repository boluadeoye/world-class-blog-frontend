import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // Fetch last 100 events
    const logs = await sql`
      SELECT * FROM system_logs 
      ORDER BY created_at DESC 
      LIMIT 100
    `;

    // Aggregate Stats
    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE event_type = 'REGISTER') as total_reg,
        COUNT(*) FILTER (WHERE event_type = 'PAYMENT' AND status = 'SUCCESS') as total_pay,
        COUNT(*) FILTER (WHERE status = 'CRITICAL') as total_crashes
      FROM system_logs 
      WHERE created_at > NOW() - INTERVAL '24 hours'
    `;

    return NextResponse.json({ logs, stats: stats[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
