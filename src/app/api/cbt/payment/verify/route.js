import pool from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { reference, studentId } = await req.json();

    if (!reference || !studentId) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    // 1. VERIFY WITH PAYSTACK
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    
    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    // 2. VERIFY AMOUNT (500 Naira)
    if (paystackData.data.amount < 50000) {
      return NextResponse.json({ error: "Invalid amount paid." }, { status: 400 });
    }

    // 3. UPGRADE USER
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const client = await pool.connect();
    await client.query(
      `UPDATE cbt_students
       SET subscription_status = 'premium', premium_expires_at = $1
       WHERE id = $2`,
      [expiresAt, studentId]
    );
    client.release();

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
