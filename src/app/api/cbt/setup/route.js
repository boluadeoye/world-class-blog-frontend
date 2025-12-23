import pool from '../../../../lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    // 1. Students Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        department TEXT NOT NULL,
        password TEXT NOT NULL, -- In a real app, hash this!
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Courses Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_courses (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE NOT NULL, -- e.g. GST101
        title TEXT NOT NULL,
        level INTEGER NOT NULL, -- 100 or 200
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 3. Questions Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_questions (
        id SERIAL PRIMARY KEY,
        course_id INTEGER REFERENCES cbt_courses(id),
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
        explanation TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 4. Results Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_results (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES cbt_students(id),
        course_id INTEGER REFERENCES cbt_courses(id),
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        time_spent_seconds INTEGER,
        taken_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 5. Admin Table (Hardcoded for you initially)
    await client.query(`
      CREATE TABLE IF NOT EXISTS cbt_admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // Seed Initial Admin (You)
    // CHANGE 'admin123' TO YOUR PREFERRED PASSWORD LATER
    await client.query(`
      INSERT INTO cbt_admins (username, password) 
      VALUES ('bolu_admin', 'admin123') 
      ON CONFLICT (username) DO NOTHING;
    `);

    client.release();
    return new Response("CBT Database Architecture Initialized Successfully", { status: 200 });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
