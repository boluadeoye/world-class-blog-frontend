import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rows = await sql`SELECT id, title, created_at FROM shannon_history ORDER BY created_at DESC LIMIT 50`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, title, system_prompt, messages } = await req.json();
    // Use the client-provided UUID to ensure atomic sync
    const rows = await sql`
      INSERT INTO shannon_history (id, title, system_prompt, messages)
      VALUES (${id}::uuid, ${title}, ${system_prompt}, ${JSON.stringify(messages)}::jsonb)
      RETURNING id, title, created_at
    `;
    return NextResponse.json(rows[0]);
  } catch (error: any) {
    console.error("History POST Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
