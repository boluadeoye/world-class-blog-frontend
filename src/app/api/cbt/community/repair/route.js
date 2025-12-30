import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Add author_email (Critical for Admin Check)
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS author_email TEXT`;
    
    // 2. Add is_admin (Critical for Red Badge)
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE`;
    
    // 3. Add is_announcement (Critical for Broadcasting)
    await sql`ALTER TABLE cbt_posts ADD COLUMN IF NOT EXISTS is_announcement BOOLEAN DEFAULT FALSE`;

    return NextResponse.json({ 
      success: true, 
      message: "Community Database Patched. Admin Channels Open." 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
