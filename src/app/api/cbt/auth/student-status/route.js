import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getStatus(id) {
  const res = await sql`SELECT subscription_status, premium_expires_at FROM cbt_students WHERE id = ${id}`;
  if (res.length === 0) return null;

  const student = res[0];
  
  // If status is not premium, they are definitely free
  if (student.subscription_status !== 'premium') return 'free';

  // If status is premium, check the date. 
  // If no date is set, we assume it's a manual lifetime upgrade.
  if (!student.premium_expires_at) return 'premium';

  const now = new Date();
  const expiresAt = new Date(student.premium_expires_at);
  
  return expiresAt > now ? 'premium' : 'free';
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const status = await getStatus(id);
    if (!status) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const status = await getStatus(id);
    if (!status) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ status });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
