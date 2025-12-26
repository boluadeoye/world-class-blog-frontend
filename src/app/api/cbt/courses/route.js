import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

// Force dynamic to ensure we always get the latest courses from DB
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await pool.connect();
    // Fetch courses
    const result = await client.query('SELECT * FROM cbt_courses ORDER BY created_at DESC');
    client.release();
    
    // CRITICAL FIX: Return object with 'courses' key to match Dashboard expectation
    return NextResponse.json({ courses: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { code, title, level, duration } = await req.json();
    const client = await pool.connect();

    await client.query(
      'INSERT INTO cbt_courses (code, title, level, duration) VALUES ($1, $2, $3, $4)',
      [code.toUpperCase(), title, parseInt(level), parseInt(duration || 15)]
    );                                                                                                                                                  
    client.release();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
