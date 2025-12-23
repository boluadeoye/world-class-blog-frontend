import pool from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId');
  
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT r.*, c.code 
      FROM cbt_results r 
      JOIN cbt_courses c ON r.course_id = c.id 
      WHERE r.student_id = $1 
      ORDER BY r.taken_at DESC LIMIT 5
    `, [studentId]);
    
    client.release();
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
