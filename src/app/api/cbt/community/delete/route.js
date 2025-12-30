import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { id, type, adminEmail } = await req.json();

    // 1. SECURITY CHECK
    if (adminEmail.toLowerCase().trim() !== 'verygreenwealth@gmail.com') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. EXECUTE DELETION BASED ON TYPE
    if (type === 'comment') {
      // Delete specific reply
      await sql`DELETE FROM cbt_comments WHERE id = ${id}`;
      // Optional: Decrement comment count on parent post (complex, skipping for speed/stability)
    } else {
      // Delete entire post and its comments
      await sql`DELETE FROM cbt_posts WHERE id = ${id}`;
      await sql`DELETE FROM cbt_comments WHERE post_id = ${id}`;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
