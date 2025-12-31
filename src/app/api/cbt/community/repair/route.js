import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // Ensure all columns exist for the Social Engine
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS author_email TEXT`;
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_announcement BOOLEAN DEFAULT FALSE`;
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS likes_count INT DEFAULT 0`;
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS comments_count INT DEFAULT 0`;
    
    return NextResponse.json({ success: true, message: "Database Nuclear Repair Complete. All systems green." });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
