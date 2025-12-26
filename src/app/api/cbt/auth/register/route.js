import pool from '../../../../../lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { name, email, password, department, level } = await req.json();

    if (!name || !email || !password || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await pool.connect();

    // 1. Check Email
    const check = await client.query('SELECT id FROM cbt_students WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      client.release();
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // 2. Hash & Token
    const hashedPassword = await bcrypt.hash(password, 10);
    const sessionToken = crypto.randomBytes(32).toString('hex');

    // 3. Insert
    const res = await client.query(
      `INSERT INTO cbt_students 
       (name, email, password, department, level, session_token, subscription_status, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, 'free', NOW()) 
       RETURNING id, name, email, subscription_status`,
      [name, email, hashedPassword, department, level || '100', sessionToken]
    );

    client.release();

    const student = res.rows[0];
    student.session_token = sessionToken;

    return NextResponse.json({ success: true, student }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
