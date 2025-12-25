import pool from '../../../../lib/db'; // Fixed: 5 levels up

export async function POST(req) {
  try {
    const { reference, studentId } = await req.json();
    
    if (!reference || !studentId) {
      return new Response(JSON.stringify({ error: "Missing payment details" }), { status: 400 });
    }

    // 1. VERIFY WITH PAYSTACK (Server-to-Server)
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 
      },
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status || paystackData.data.status !== "success") {
      return new Response(JSON.stringify({ error: "Payment verification failed." }), { status: 400 });
    }

    // 2. CALCULATE EXPIRY (7 Days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 3. UPGRADE USER IN DATABASE
    const client = await pool.connect();
    await client.query(
      `UPDATE cbt_students 
       SET subscription_status = 'premium', premium_expires_at = $1 
       WHERE id = $2`,
      [expiresAt, studentId]
    );
    
    client.release();

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Payment Error:", error);
    return new Response(JSON.stringify({ error: "System Error during verification." }), { status: 500 });
  }
}
