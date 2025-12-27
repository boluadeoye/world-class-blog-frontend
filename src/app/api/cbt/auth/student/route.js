import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // The first query will wake up the DB if it's sleeping
    const res = await pool.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
    
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const student = res.rows[0];

    const valid = await bcrypt.compare(password, student.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    await pool.query(
      'UPDATE cbt_students SET session_token = $1, last_login = NOW() WHERE id = $2',
      [sessionToken, student.id]
    );
    
    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        subscription_status: student.subscription_status,
        session_token: sessionToken
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login API Error:", error.message);
    
    // If it's a timeout, it means the DB is still waking up
    const isTimeout = error.message.includes('timeout') || error.message.includes('Connection terminated');
    const friendlyError = isTimeout 
      ? "Database is waking up. Please click 'Try Again' in 5 seconds." 
      : `System Error: ${error.message}`;

    return NextResponse.json({ error: friendlyError }, { status: 500 });
  }
}
