import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { name, email, password, department, level } = await req.json();

    if (!name || !email || !password || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1. Check Email (Using HTTP Driver Syntax)
    const check = await sql`SELECT id FROM cbt_students WHERE email = ${email}`;
    if (check.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 2. Hash & Token
    const hashedPassword = await bcrypt.hash(password, 10);
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // 3. Insert (Using HTTP Driver Syntax)
    const res = await sql`
      INSERT INTO cbt_students 
      (name, email, password, department, level, session_token, subscription_status, created_at, last_login) 
      VALUES (${name}, ${email}, ${hashedPassword}, ${department}, ${level || '100'}, ${sessionToken}, 'free', NOW(), NOW()) 
      RETURNING id, name, email, subscription_status
    `;

    const student = res[0];
    student.session_token = sessionToken;

    return NextResponse.json({ success: true, student }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    // Return the actual error so we can see it in our beautiful modal
    return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 });
  }
}
