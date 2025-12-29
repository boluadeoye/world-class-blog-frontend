import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Create the missing table
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_exam_history (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL,
        course_id INT NOT NULL,
        score INT NOT NULL,
        total INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 2. Create Leaderboard table if missing
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_leaderboard (
        student_id INT NOT NULL,
        course_id INT NOT NULL,
        score INT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (student_id, course_id)
      );
    `;

    // 3. Attempt to migrate old data from 'cbt_results' if it exists
    // We wrap this in a try/catch because 'cbt_results' might not exist either
    let migrated = 0;
    try {
      const oldData = await sql`SELECT * FROM cbt_results`;
      if (oldData.length > 0) {
        for (const row of oldData) {
          await sql`
            INSERT INTO cbt_exam_history (student_id, course_id, score, total, created_at)
            VALUES (${row.student_id}, ${row.course_id}, ${row.score}, ${row.total}, ${row.created_at || new Date()})
          `;
        }
        migrated = oldData.length;
      }
    } catch (e) {
      console.log("No old data to migrate or cbt_results missing.");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database Repaired Successfully", 
      migrated_records: migrated 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
