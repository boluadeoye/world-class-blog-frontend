import { NextRequest, NextResponse } from 'next/server';
import { neon } from "@neondatabase/serverless";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const session = await sql`SELECT * FROM shannon_history WHERE id = ${id}`;
    if (session.length === 0) return NextResponse.json({ error: "Session not found" }, { status: 404 });
    return NextResponse.json(session[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM shannon_history WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
