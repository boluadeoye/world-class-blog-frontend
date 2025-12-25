import pool from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  // 1. STRICT INPUT VALIDATION
  if (!courseId || !studentId || !token) {
    return new Response(JSON.stringify({ error: "Security Violation: Missing Credentials" }), { status: 400 });
  }

  try {
    const client = await pool.connect();
    
    // 2. STRICT SESSION CHECK
    // Fetch the student's CURRENT token from the DB
    const studentRes = await client.query('SELECT session_token, subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', [studentId]);
    
    if (studentRes.rows.length === 0) {
      client.release();
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }

    const student = studentRes.rows[0];

    // COMPARE: Does the token from the phone match the token in the DB?
    if (student.session_token !== token) {
      client.release();
      // This is the "Kick Out" logic
      return new Response(JSON.stringify({ error: "Session Expired. You are logged in on another device." }), { status: 401 });
    }

    // 3. CHECK PREMIUM STATUS
    const isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();
    
    // 4. FREE USER LIMITS
    if (!isPremium) {
      const attemptsRes = await client.query('SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2', [studentId, courseId]);
      const attempts = parseInt(attemptsRes.rows[0].count);
      
      if (attempts >= 2) {
        client.release();
        return new Response(JSON.stringify({ error: "Free Limit Reached (2 Attempts). Upgrade to Premium." }), { status: 403 });
      }
    }

    // 5. FETCH CONTENT
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // Limit questions for free users
    const limit = isPremium ? 100 : 30;
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
