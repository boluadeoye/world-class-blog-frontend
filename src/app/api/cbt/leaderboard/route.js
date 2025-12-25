import pool from '../../../../lib/db'; // Fixed: 4 levels up

export async function GET() {
  try {
    const client = await pool.connect();
    
    // Get Top 10 Scores across all courses
    const res = await client.query(`
      SELECT s.name, s.department, r.score, r.total_questions, c.code 
      FROM cbt_results r
      JOIN cbt_students s ON r.student_id = s.id
      JOIN cbt_courses c ON r.course_id = c.id
      ORDER BY r.score DESC
      LIMIT 10
    `);
    
    client.release();
    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
