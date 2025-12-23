import pool from '../../../../lib/db'; // Fixed: 4 levels up

// GET: Fetch single course + all its questions
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('id');
  
  if (!courseId) return new Response("Missing ID", { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. Get Course Details
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // 2. Get Questions
    const questionsRes = await client.query('SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY id ASC', [courseId]);
    
    client.release();
    
    return new Response(JSON.stringify({
      course: courseRes.rows[0],
      questions: questionsRes.rows
    }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

// PUT: Update Course OR Question
export async function PUT(req) {
  try {
    const body = await req.json();
    const client = await pool.connect();

    if (body.type === 'course') {
      // Update Course Title/Code
      await client.query(
        'UPDATE cbt_courses SET code = $1, title = $2, level = $3 WHERE id = $4',
        [body.code, body.title, body.level, body.id]
      );
    } else if (body.type === 'question') {
      // Update Question
      await client.query(
        `UPDATE cbt_questions SET 
         question_text = $1, option_a = $2, option_b = $3, option_c = $4, option_d = $5, 
         correct_option = $6, explanation = $7 
         WHERE id = $8`,
        [body.question_text, body.option_a, body.option_b, body.option_c, body.option_d, body.correct_option, body.explanation, body.id]
      );
    }

    client.release();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

// POST: Add New Question
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await pool.connect();

    await client.query(
      `INSERT INTO cbt_questions 
       (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [body.course_id, body.question_text, body.option_a, body.option_b, body.option_c, body.option_d, body.correct_option, body.explanation]
    );

    client.release();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

// DELETE: Remove Question
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const client = await pool.connect();
    await client.query('DELETE FROM cbt_questions WHERE id = $1', [id]);
    client.release();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
