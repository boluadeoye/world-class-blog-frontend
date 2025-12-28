import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { logEvent } from '@/lib/logger';

export async function POST(req) {
  try {
    const { name, email, password, department, level } = await req.json();

    if (!name || !email || !password || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const check = await sql`SELECT id FROM cbt_students WHERE email = ${email}`;
    if (check.length > 0) {
      await logEvent('REGISTER', email, { reason: 'Email exists' }, 'FAILURE');
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sessionToken = crypto.randomBytes(32).toString('hex');

    const res = await sql`
      INSERT INTO cbt_students 
      (name, email, password, department, level, session_token, subscription_status, created_at, last_login) 
      VALUES (${name}, ${email}, ${hashedPassword}, ${department}, ${level || '100'}, ${sessionToken}, 'free', NOW(), NOW()) 
      RETURNING id, name, email, subscription_status
    `;

    const student = res[0];
    student.session_token = sessionToken;

    // LOG SUCCESSFUL ONBOARDING
    await logEvent('REGISTER', email, { name, department, level }, 'SUCCESS');

    return NextResponse.json({ success: true, student }, { status: 201 });

  } catch (error) {
    await logEvent('ERROR', 'REGISTRATION_SYSTEM', { message: error.message }, 'CRITICAL');
    return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 });
  }
}
