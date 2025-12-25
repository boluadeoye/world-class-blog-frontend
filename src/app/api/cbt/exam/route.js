import pool from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId) return new Response(JSON.stringify({ error: "Missing Course ID" }), { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. SECURITY CHECK
    let isPremium = false;
    
    if (studentId && token) {
      const studentRes = await client.query('SELECT session_token, subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', [studentId]);
      
      if (studentRes.rows.length > 0) {
        const student = studentRes.rows[0];
        if (student.session_token !== token) {
          client.release();
          return new Response(JSON.stringify({ error: "Session Expired. You are logged in on another device." }), { status: 401 });
        }
        // Check Premium
        isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();
      }
    }

    // 2. FETCH CONTENT
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // UPDATED: Set limit to 60 for everyone (Standard JAMB size)
    // Premium users can get 100 if available
    const limit = isPremium ? 100 : 60;
    
    const questionsRes = await client.query('SELECT * FROM cbt_questions WHERE course_id = $1 ORDER BY RANDOM() LIMIT $2', [courseId, limit]);
    
    client.release();
    
    return new Response(JSON.stringify({
      course: courseRes.rows[0],
      questions: questionsRes.rows,
      isPremium
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
