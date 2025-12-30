import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await sql`ALTER TABLE cbt_permanent_logs ADD COLUMN IF NOT EXISTS device_id TEXT`;
    return NextResponse.json({ success: true, message: "Hardware Tracking Active." });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
