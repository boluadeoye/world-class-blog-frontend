import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { reference, studentId } = await req.json();

    if (!reference || !studentId) {
      return NextResponse.json({ error: "Missing payment credentials." }, { status: 400 });
    }

    // 1. VERIFY WITH PAYSTACK
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    
    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ error: "Paystack could not verify this transaction." }, { status: 400 });
    }

    // 2. VERIFY AMOUNT (500 Naira = 50000 kobo)
    if (paystackData.data.amount < 50000) {
      return NextResponse.json({ error: "Invalid amount detected. Transaction void." }, { status: 400 });
    }

    // 3. CALCULATE EXPIRY (7 Days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 4. UPGRADE USER (Stateless Syntax)
    await sql`
      UPDATE cbt_students 
      SET subscription_status = 'premium', premium_expires_at = ${expiresAt} 
      WHERE id = ${studentId}
    `;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: `Verification Failed: ${error.message}` }, { status: 500 });
  }
}
