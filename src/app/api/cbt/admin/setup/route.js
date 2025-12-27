import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const targetUser = "bolu_admin";
    const targetPass = "admin123";
    const hashedPassword = await bcrypt.hash(targetPass, 10);

    // 1. Ensure table has the correct schema (username instead of email)
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // 2. Insert or Update your specific credentials
    await sql`
      INSERT INTO cbt_admins (username, password)
      VALUES (${targetUser}, ${hashedPassword})
      ON CONFLICT (username) DO UPDATE SET password = ${hashedPassword}
    `;

    return NextResponse.json({ 
      success: true, 
      message: `Admin account '${targetUser}' has been synchronized with the new security protocol.` 
    });
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
