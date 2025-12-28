import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leaders = await sql`
      SELECT 
        s.name, 
        s.department, 
        r.score, 
        r.total,
        c.code as course_code
      FROM cbt_results r
      JOIN cbt_students s ON r.student_id = s.id::text
      JOIN cbt_courses c ON r.course_id = c.id::text
      ORDER BY r.score DESC
      LIMIT 10
    `;
    return NextResponse.json(leaders);
  } catch (error) {
    console.error("Leaderboard GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    // NUCLEAR COMMAND: Wipe all results
    await sql`DELETE FROM cbt_results`;
    
    return NextResponse.json({ 
      success: true, 
      message: "Leaderboard has been purged. All student scores reset to zero." 
    });
  } catch (error) {
    console.error("Leaderboard RESET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
