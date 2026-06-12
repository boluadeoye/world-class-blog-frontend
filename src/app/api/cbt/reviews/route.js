import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { studentId, name, rating, comment } = await req.json();

    if (!studentId || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert the review into the database
    await sql`
      INSERT INTO cbt_reviews (student_id, student_name, rating, comment) 
      VALUES (${studentId}, ${name}, ${rating}, ${comment})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REVIEW_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
