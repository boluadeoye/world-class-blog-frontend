import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

// FORCE NEXT.JS TO NEVER CACHE THIS ROUTE
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`SELECT id, title, created_at FROM shannon_history ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, system_prompt, messages } = await req.json();
    const rows = await sql`
      INSERT INTO shannon_history (title, system_prompt, messages) 
      VALUES (${title}, ${system_prompt}, ${JSON.stringify(messages)}::jsonb) 
      RETURNING id, title, created_at
    `;
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
