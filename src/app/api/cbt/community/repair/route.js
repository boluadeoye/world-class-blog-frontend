import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE cbt_comments ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE`;
    return NextResponse.json({ success: true, message: "Shadow-Ban Infrastructure Active." });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
