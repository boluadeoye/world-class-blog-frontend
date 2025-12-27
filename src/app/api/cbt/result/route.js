import pool from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentId, courseId, score, total, answers } = await req.json();
    const client = await pool.connect();

    await client.query(
      'INSERT INTO cbt_results (student_id, course_id, score, total, answers) VALUES ($1, $2, $3, $4, $5)',
      [studentId, courseId, score, total, JSON.stringify(answers)]
    );

    client.release();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  }
}
