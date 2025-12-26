import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const client = await pool.connect();
    const res = await client.query(
      'SELECT subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', 
      [id]
    );
    client.release();

    if (res.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const student = res.rows[0];
    const now = new Date();
    const expiresAt = new Date(student.premium_expires_at);
    
    // Check if premium is still valid
    const isPremium = student.subscription_status === 'premium' && expiresAt > now;

    return NextResponse.json({ 
      status: isPremium ? 'premium' : 'free' 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
