import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    // 1. WIPE THE RANKINGS (Visuals)
    await sql`TRUNCATE TABLE cbt_leaderboard`;
    
    // 2. WIPE THE HISTORY (Personal Records)
    // We MUST do this, otherwise the "Self-Healing" API will just pull the 
    // high scores back onto the leaderboard immediately.
    await sql`TRUNCATE TABLE cbt_exam_history`;

    // 3. CRITICAL: DO NOT TOUCH 'cbt_permanent_logs'
    // This ensures that if a student has already used 2 attempts, 
    // they remain blocked/locked, even though their score is gone.

    return NextResponse.json({ 
      success: true, 
      message: "LEADERBOARD & HISTORY CLEARED. Security Limits (Attempts) remain ACTIVE." 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
