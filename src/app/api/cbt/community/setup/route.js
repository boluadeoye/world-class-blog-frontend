import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Create Posts Table
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_posts (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL,
        author_name TEXT NOT NULL,
        department TEXT,
        content TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        is_announcement BOOLEAN DEFAULT FALSE,
        likes_count INT DEFAULT 0,
        comments_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 2. Create Comments Table
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_comments (
        id SERIAL PRIMARY KEY,
        post_id INT NOT NULL,
        student_id INT NOT NULL,
        author_name TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // 3. Create Likes Table (Prevent double liking)
    await sql`
      CREATE TABLE IF NOT EXISTS cbt_likes (
        post_id INT NOT NULL,
        student_id INT NOT NULL,
        PRIMARY KEY (post_id, student_id)
      );
    `;

    return NextResponse.json({ success: true, message: "Community Infrastructure Built." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
