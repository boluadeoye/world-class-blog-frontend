import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Get Active Users (Seen in last 60 seconds)
    const activeUsers = await sql`
      SELECT * FROM cbt_live_traffic 
      WHERE last_seen > NOW() - INTERVAL '1 minute'
      ORDER BY last_seen DESC
    `;

    // 2. Get Recent Exam Submissions (Last 10)
    const recentSubmissions = await sql`
      SELECT s.name, h.score, h.total, h.course_id, h.created_at
      FROM cbt_exam_history h
      JOIN cbt_students s ON h.student_id = s.id
      ORDER BY h.created_at DESC
      LIMIT 5
    `;

    // 3. Get Revenue Pulse (Last 24h)
    const revenue = await sql`
      SELECT SUM(amount) as total 
      FROM cbt_transactions 
      WHERE status = 'success' AND created_at > NOW() - INTERVAL '24 hours'
    `;

    return NextResponse.json({
      online_count: activeUsers.length,
      users: activeUsers,
      feed: recentSubmissions,
      revenue: revenue[0].total || 0
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
