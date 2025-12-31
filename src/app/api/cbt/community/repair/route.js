import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // Add reaction column to likes table
    await sql`ALTER TABLE cbt_likes ADD COLUMN IF NOT EXISTS reaction TEXT DEFAULT '❤️'`;
    return NextResponse.json({ success: true, message: "Reaction Engine Installed." });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
