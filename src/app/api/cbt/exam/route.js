import pool from '../../../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Missing Course ID" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const client = await pool.connect();
    
    try {
      // 1. Get Course Info
      const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
      
      if (courseRes.rowCount === 0) {
        return new Response(JSON.stringify({ error: "Course not found in database" }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // 2. Get Questions
      const questionsRes = await client.query('SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT 50', [courseId]);
      
      return new Response(JSON.stringify({
        course: courseRes.rows[0],
        questions: questionsRes.rows
      }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Exam API Error:", error);
    return new Response(JSON.stringify({ error: "Database Connection Failed: " + error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
