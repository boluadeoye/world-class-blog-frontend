import pool from '../../../../lib/db';

// OPTIMIZATION: Cache results for 1 hour (3600 seconds)
// This prevents the DB from crashing under high load
export const revalidate = 3600; 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) return new Response("Missing Course ID", { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. Get Course Info
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // 2. Get Questions
    // Note: RANDOM() breaks caching efficiency, but for a mock exam it's okay.
    // For a strict exam, we would remove RANDOM() to ensure everyone gets the same cached set.
    const questionsRes = await client.query('SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT 50', [courseId]);
    
    client.release();
    
    return new Response(JSON.stringify({
      course: courseRes.rows[0],
      questions: questionsRes.rows
    }), { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      }
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
