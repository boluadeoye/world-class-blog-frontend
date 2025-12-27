import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    // Fetch Course and Questions in parallel for speed
    const [courseRes, questionsRes] = await Promise.all([
      sql`SELECT * FROM cbt_courses WHERE id = ${id}`,
      sql`SELECT * FROM cbt_questions WHERE course_id = ${id} ORDER BY id ASC`
    ]);

    if (courseRes.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      course: courseRes[0],
      questions: questionsRes
    }, { status: 200 });

  } catch (error) {
    console.error("Manage GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Handle Bulk Upload (Array) or Single Question (Object)
    if (Array.isArray(data)) {
      for (const q of data) {
        await sql`
          INSERT INTO cbt_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
          VALUES (${q.course_id}, ${q.question_text}, ${q.option_a}, ${q.option_b}, ${q.option_c}, ${q.option_d}, ${q.correct_option}, ${q.explanation})
        `;
      }
    } else {
      await sql`
        INSERT INTO cbt_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
        VALUES (${data.course_id}, ${data.question_text}, ${data.option_a}, ${data.option_b}, ${data.option_c}, ${data.option_d}, ${data.correct_option}, ${data.explanation})
      `;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    
    if (data.type === 'course') {
      await sql`
        UPDATE cbt_courses 
        SET code = ${data.code.toUpperCase()}, title = ${data.title}, level = ${data.level}, duration = ${data.duration}
        WHERE id = ${data.id}
      `;
    } else {
      await sql`
        UPDATE cbt_questions 
        SET question_text = ${data.question_text}, option_a = ${data.option_a}, option_b = ${data.option_b}, 
            option_c = ${data.option_c}, option_d = ${data.option_d}, correct_option = ${data.correct_option}, 
            explanation = ${data.explanation}
        WHERE id = ${data.id}
      `;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await sql`DELETE FROM cbt_questions WHERE id = ${id}`;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
