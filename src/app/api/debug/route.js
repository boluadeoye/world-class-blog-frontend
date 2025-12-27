import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const client = await pool.connect();
  const report = {
    connection: "Unknown",
    tables: [],
    results_table_exists: false,
    results_count: 0,
    test_insert: "Not Attempted"
  };

  try {
    // 1. Test Connection
    await client.query('SELECT NOW()');
    report.connection = "SUCCESS: Connected to Neon DB";

    // 2. List All Tables
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    report.tables = tablesRes.rows.map(r => r.table_name);

    // 3. Check Results Table
    if (report.tables.includes('cbt_results')) {
      report.results_table_exists = true;
      
      // Count Rows
      const countRes = await client.query('SELECT COUNT(*) FROM cbt_results');
      report.results_count = countRes.rows[0].count;

      // 4. Try Dummy Insert (The Acid Test)
      try {
        await client.query(`
          INSERT INTO cbt_results (student_id, course_id, score, total, answers)
          VALUES ('99999', '99999', 0, 0, '{}')
        `);
        report.test_insert = "SUCCESS: Database accepts data.";
        // Cleanup
        await client.query("DELETE FROM cbt_results WHERE student_id = '99999'");
      } catch (insertErr) {
        report.test_insert = `FAILED: ${insertErr.message}`;
      }
    } else {
      report.results_table_exists = false;
      report.test_insert = "SKIPPED: Table does not exist.";
    }

  } catch (error) {
    report.connection = `FAILED: ${error.message}`;
  } finally {
    client.release();
  }

  return NextResponse.json(report, { status: 200 });
}
