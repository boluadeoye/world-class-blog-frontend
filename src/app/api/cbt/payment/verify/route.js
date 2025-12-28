import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import { logEvent } from '@/lib/logger';

export async function POST(req) {
  let payload = {};
  try {
    payload = await req.json();
    const { reference, studentId } = payload;

    if (!reference || !studentId) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    
    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      await logEvent('PAYMENT', studentId, { reference, reason: 'Paystack rejected' }, 'FAILURE');
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    if (paystackData.data.amount < 50000) {
      await logEvent('PAYMENT', studentId, { reference, amount: paystackData.data.amount, reason: 'Insufficient amount' }, 'FAILURE');
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await sql`
      UPDATE cbt_students 
      SET subscription_status = 'premium', premium_expires_at = ${expiresAt} 
      WHERE id = ${studentId}
    `;

    // LOG SUCCESSFUL REVENUE
    await logEvent('PAYMENT', studentId, { reference, amount: 500, plan: '7_DAYS' }, 'SUCCESS');

    return NextResponse.json({ success: true });

  } catch (error) {
    await logEvent('ERROR', payload.studentId || 'UNKNOWN_PAYER', { message: error.message }, 'CRITICAL');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
