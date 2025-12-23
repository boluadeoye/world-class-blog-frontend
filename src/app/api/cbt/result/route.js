import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function POST(req) {
  try {
    const { student_id, course_id, score, total } = await req.json();
    const client = await pool.connect();
    
    await client.query(
      'INSERT INTO cbt_results (student_id, course_id, score, total_questions) VALUES ($1, $2, $3, $4)',
      [student_id, course_id, score, total]
    );
    
    client.release();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
