import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch last 50 events using Stateless Syntax
    const logs = await sql`
      SELECT * FROM system_logs 
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    // 2. Aggregate 24H Stats
    const statsRes = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE event_type = 'REGISTER') as total_reg,
        COUNT(*) FILTER (WHERE event_type = 'PAYMENT' AND status = 'SUCCESS') as total_pay,
        COUNT(*) FILTER (WHERE status = 'CRITICAL' OR status = 'FAILURE') as total_errors
      FROM system_logs 
      WHERE created_at > NOW() - INTERVAL '24 hours'
    `;

    const stats = statsRes[0] || { total_reg: 0, total_pay: 0, total_errors: 0 };

    return NextResponse.json({ 
      logs: Array.isArray(logs) ? logs : [], 
      stats: {
        total_reg: parseInt(stats.total_reg || 0),
        total_pay: parseInt(stats.total_pay || 0),
        total_errors: parseInt(stats.total_errors || 0)
      }
    });
  } catch (error) {
    console.error("MONITOR_API_CRASH:", error);
    return NextResponse.json({ error: error.message, logs: [], stats: {} }, { status: 500 });
  }
}
