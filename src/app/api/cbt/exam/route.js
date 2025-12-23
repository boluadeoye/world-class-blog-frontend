import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) return new Response("Missing Course ID", { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. Get Course Info
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // 2. Get Questions (Randomized order for "Mock" feel)
    const questionsRes = await client.query('SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT 50', [courseId]);
    
    client.release();
    
    return new Response(JSON.stringify({
      course: courseRes.rows[0],
      questions: questionsRes.rows
    }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
