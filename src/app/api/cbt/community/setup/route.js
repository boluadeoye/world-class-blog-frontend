import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_posts (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        department TEXT,
        content TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        is_announcement BOOLEAN DEFAULT FALSE,
        likes_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    return NextResponse.json({ success: true, message: "Town Hall Constructed." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
