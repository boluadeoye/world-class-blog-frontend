import sql from '@/lib/db';
import { NextResponse } from 'next/server';
import { logEvent } from '@/lib/logger';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    const { reference, studentId } = body;

    if (!reference || !studentId) {
      return NextResponse.json({ error: "Missing reference or student ID" }, { status: 400 });
    }

    // 1. CALL PAYSTACK VERIFICATION
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const paystackData = await paystackRes.json();

    // LOG FOR GOD MODE / VERCEL LOGS
    console.log("PAYSTACK_RESPONSE:", JSON.stringify(paystackData));

    // 2. VALIDATE STATUS
    if (!paystackData.status || paystackData.data.status !== "success") {
      await logEvent('PAYMENT_FAIL', studentId, { reference, msg: "Paystack rejected verification" }, 'FAILURE');
      return NextResponse.json({ error: "Paystack could not verify transaction." }, { status: 400 });
    }

    // 3. VALIDATE AMOUNT (Allowing for minor rounding, checking >= 490 Naira to be safe)
    const paidAmount = paystackData.data.amount; // in kobo
    if (paidAmount < 49000) {
      await logEvent('PAYMENT_FRAUD', studentId, { reference, amount: paidAmount }, 'CRITICAL');
      return NextResponse.json({ error: "Invalid payment amount detected." }, { status: 400 });
    }

    // 4. CALCULATE EXPIRY
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 5. ATOMIC DATABASE UPDATE
    // We use explicit casting to ensure the ID matches regardless of type
    try {
      await sql`
        UPDATE cbt_students 
        SET subscription_status = 'premium', 
            premium_expires_at = ${expiresAt} 
        WHERE id::text = ${String(studentId)}
      `;
      
      await logEvent('PAYMENT_SUCCESS', studentId, { reference, amount: 500 }, 'SUCCESS');
      
      return NextResponse.json({ success: true });
    } catch (dbErr) {
      console.error("DATABASE_UPDATE_ERROR:", dbErr);
      await logEvent('ERROR', studentId, { msg: "DB Update Failed after successful payment", error: dbErr.message }, 'CRITICAL');
      return NextResponse.json({ error: "Payment received but account update failed. Contact support." }, { status: 500 });
    }

  } catch (error) {
    console.error("GLOBAL_VERIFY_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error during verification." }, { status: 500 });
  }
}
