import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, courseId, score, total, answers } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const client = await pool.connect();

    // Force IDs to Integers to match standard DB schemas
    const sId = parseInt(studentId);
    const cId = parseInt(courseId);

    await client.query(
      'INSERT INTO cbt_results (student_id, course_id, score, total, answers) VALUES ($1, $2, $3, $4, $5)',
      [sId, cId, score, total, JSON.stringify(answers)]
    );

    client.release();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  }
}
