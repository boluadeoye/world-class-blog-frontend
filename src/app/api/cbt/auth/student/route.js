import pool from '@/lib/db'; // Using Absolute Import
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  let client;
  try {
    const { email, password } = await req.json();
    
    client = await pool.connect();
    
    // 1. Find Student
    const res = await client.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const student = res.rows[0];

    // 2. Verify Password
    const valid = await bcrypt.compare(password, student.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. ATOMIC SECURITY: Generate New Session Token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Update Last Login & Token
    await client.query(
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
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Database Connection Failed. Please try again." }, { status: 500 });
  } finally {
    if (client) client.release(); // CRITICAL: RELEASE THE CONNECTION
  }
}
