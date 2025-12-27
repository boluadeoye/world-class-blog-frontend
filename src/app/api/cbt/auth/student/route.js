import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  let client;
  try {
    const { email, password } = await req.json();
    
    // Set a strict timeout for this connection attempt
    client = await pool.connect();
    
    const res = await client.query('SELECT * FROM cbt_students WHERE email = $1', [email]);
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const student = res.rows[0];

    const valid = await bcrypt.compare(password, student.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

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
    console.error("Login Error:", error);
    // CRITICAL CHANGE: Return the ACTUAL error message so we can debug
    return NextResponse.json({ error: `DB Error: ${error.message}` }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
