import pool from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');
  const studentId = searchParams.get('studentId');
  const token = searchParams.get('token');

  if (!courseId || !studentId || !token) return new Response("Missing Credentials", { status: 400 });

  try {
    const client = await pool.connect();
    
    // 1. Verify Student & Session
    const studentRes = await client.query('SELECT * FROM cbt_students WHERE id = $1', [studentId]);
    const student = studentRes.rows[0];

    if (!student || student.session_token !== token) {
      client.release();
      return new Response(JSON.stringify({ error: "Session Expired. Log in again." }), { status: 401 });
    }

    // 2. Check Subscription Status
    const isPremium = student.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();
    
    // 3. Check Attempts (If Free)
    if (!isPremium) {
      const attemptsRes = await client.query('SELECT COUNT(*) FROM cbt_results WHERE student_id = $1 AND course_id = $2', [studentId, courseId]);
      const attempts = parseInt(attemptsRes.rows[0].count);
      
      if (attempts >= 2) {
        client.release();
        return new Response(JSON.stringify({ error: "Free Limit Reached. Upgrade to Premium for unlimited access." }), { status: 403 });
      }
    }

    // 4. Fetch Content
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
