import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // HTTP Query - Stateless
    const users = await sql`SELECT * FROM cbt_students WHERE email = ${email}`;
    
    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const student = users[0];

    // Verify Password
    const valid = await bcrypt.compare(password, student.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Update Token & Last Login
    await sql`
      UPDATE cbt_students 
      SET session_token = ${sessionToken}, last_login = NOW() 
      WHERE id = ${student.id}
    `;
    
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
    return NextResponse.json({ error: `Login failed: ${error.message}` }, { status: 500 });
  }
}
