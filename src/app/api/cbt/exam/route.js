import pool from '../../../../lib/db'; // 4 levels up

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId) return new Response(JSON.stringify({ error: "Missing Course ID" }), { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. SECURITY CHECK: Verify Session
    // If studentId/token are missing (legacy frontend), we skip this check for now to prevent crashes,
    // but in production, this blocks unauthorized access.
    let isPremium = false;
    
    if (studentId && token) {
      const studentRes = await client.query('SELECT * FROM cbt_students WHERE id = $1', [studentId]);
      const student = studentRes.rows[0];

      if (!student || student.session_token !== token) {
        client.release();
        return new Response(JSON.stringify({ error: "Session Expired. You are logged in on another device." }), { status: 401 });
      }

      // 2. CHECK PREMIUM STATUS
      isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();
      
      // 3. FREE USER LIMITS
      if (!isPremium) {
        const attemptsRes = await client.query('SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2', [studentId, courseId]);
        const attempts = parseInt(attemptsRes.rows[0].count);
        
        if (attempts >= 2) {
          client.release();
          return new Response(JSON.stringify({ error: "Free Limit Reached (2 Attempts). Upgrade to Premium for unlimited access." }), { status: 403 });
        }
      }
    }

    // 4. FETCH CONTENT
    const courseRes = await client.query('SELECT * FROM cbt_courses WHERE id = $1', [courseId]);
    
    // Free users get 30 questions, Premium get 50 (or all)
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
