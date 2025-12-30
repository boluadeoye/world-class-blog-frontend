import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req) {
  try {
    const { id, type, adminEmail } = await req.json();
    if (adminEmail.toLowerCase().trim() !== 'verygreenwealth@gmail.com') return NextResponse.json({ error: "Denied" }, { status: 403 });
    if (type === 'comment') { await sql`DELETE FROM cbt_comments WHERE id = ${id}`; }
    else { await sql`DELETE FROM cbt_posts WHERE id = ${id}`; await sql`DELETE FROM cbt_comments WHERE post_id = ${id}`; }
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
