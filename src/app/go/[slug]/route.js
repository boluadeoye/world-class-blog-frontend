import pool from '../../../../lib/db';
import { redirect } from 'next/navigation';

export async function GET(request, { params }) {
  const slug = params.slug;
  let destination = null;
  
  const client = await pool.connect();
  try {
    // 1. Get the URL
    const result = await client.query('SELECT destination FROM links WHERE slug = $1', [slug]);
    
    if (result.rows.length > 0) {
      destination = result.rows[0].destination;
      // 2. Increment Click Count (Fire and forget)
      client.query('UPDATE links SET clicks = clicks + 1 WHERE slug = $1', [slug]);
    }
  } catch (error) {
    console.error("DB Error:", error);
  } finally {
    client.release();
  }

  // 3. Perform Redirect (Must be outside try/catch)
  if (destination) {
    return redirect(destination);
  } else {
    return new Response("Link not found", { status: 404 });
  }
}
