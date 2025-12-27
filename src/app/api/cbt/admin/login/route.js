import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // 1. Fetch Admin by Username using Stateless Driver
    const admins = await sql`SELECT * FROM cbt_admins WHERE username = ${username}`;

    if (admins.length === 0) {
      return NextResponse.json({ error: "Access Denied: User not found" }, { status: 401 });
    }

    const admin = admins[0];

    // 2. Secure Bcrypt Comparison
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Access Denied: Incorrect Password" }, { status: 401 });
    }

    // 3. Success
    return NextResponse.json({ 
      success: true, 
      message: "Welcome, Bolu. Access Granted." 
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json({ error: "Server Error: " + error.message }, { status: 500 });
  }
}
