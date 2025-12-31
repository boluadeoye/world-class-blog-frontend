import sql from '@/lib/db';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { id, type, adminEmail } = await req.json();
    
    // SECURITY: Only the Commander can hide/unhide
    if (adminEmail.toLowerCase().trim() !== 'verygreenwealth@gmail.com') {
      return NextResponse.json({ error: "Denied" }, { status: 403 });
    }
    
    if (type === 'comment') {
      await sql`UPDATE cbt_comments SET is_hidden = NOT is_hidden WHERE id = ${id}`;
    } else {
      await sql`UPDATE cbt_posts SET is_hidden = NOT is_hidden WHERE id = ${id}`;
    }
    return NextResponse.json({ success: true });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
