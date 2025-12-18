import pool from '../../../../lib/db';
import { redirect } from 'next/navigation';

export async function GET(request, { params }) {
  const slug = params.slug;
  
  const client = await pool.connect();
  try {
    // 1. Get the URL
    const result = await client.query('SELECT destination FROM links WHERE slug = $1', [slug]);
    
    // 2. Increment Click Count (Async - don't wait for it)
    client.query('UPDATE links SET clicks = clicks + 1 WHERE slug = $1', [slug]);

    if (result.rows.length > 0) {
      // 3. Redirect
      return redirect(result.rows[0].destination);
    } else {
      return new Response("Link not found", { status: 404 });
    }
  } finally {
    client.release();
  }
}
