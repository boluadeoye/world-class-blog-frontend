import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { postId, adminEmail } = await req.json();

    // SECURITY CHECK: Only the Commander can delete
    if (adminEmail.toLowerCase().trim() !== 'verygreenwealth@gmail.com') {
      return NextResponse.json({ error: "Unauthorized: You are not the Commander." }, { status: 403 });
    }

    await sql`DELETE FROM cbt_posts WHERE id = ${postId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
