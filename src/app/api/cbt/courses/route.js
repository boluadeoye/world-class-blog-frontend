import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await sql`SELECT * FROM cbt_courses ORDER BY created_at DESC`;
    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { code, title, level, duration } = await req.json();
    await sql`
      INSERT INTO cbt_courses (code, title, level, duration) 
      VALUES (${code.toUpperCase()}, ${title}, ${parseInt(level)}, ${parseInt(duration || 15)})
    `;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
