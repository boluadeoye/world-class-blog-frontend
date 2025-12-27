import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const client = await pool.connect();

  try {
    const body = await req.json();
    const { studentId, courseId, score, total, answers } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // FORCE STRING STORAGE for Universal Compatibility
    await client.query(
      'INSERT INTO cbt_results (student_id, course_id, score, total, answers) VALUES ($1, $2, $3, $4, $5)',
      [String(studentId), String(courseId), score, total, JSON.stringify(answers)]
    );

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Save Result Error:", error);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  } finally {
    client.release();
  }
}
