import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await pool.connect();
    
    // 1. Find Student
    const res = await client.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
    if (res.rows.length === 0) {
      client.release();
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const student = res.rows[0];

    // 2. Verify Password
    const valid = await bcrypt.compare(password, student.password);
    if (!valid) {
      client.release();
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. ATOMIC SECURITY: Generate New Session Token
    // This invalidates ANY previous session on any other device.
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    await client.query(
      'UPDATE cbt_students SET session_token = $1, last_login = NOW() WHERE id = $2',
      [sessionToken, student.id]
    );
    
    client.release();

    // 4. Return Student Data + Token
    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        subscription_status: student.subscription_status,
        session_token: sessionToken // Frontend must save this
      }
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
