import pool from '../../../../../lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  const client = await pool.connect(); // OPEN CONNECTION

  try {
    const { email, password } = await req.json();
    
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

    // 3. ATOMIC SECURITY
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    client.release(); // CRITICAL: ALWAYS RELEASE CONNECTION
  }
}
