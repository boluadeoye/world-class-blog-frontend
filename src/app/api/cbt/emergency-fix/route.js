import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const email = searchParams.get('email');
    
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    
    // SMART LOOKUP: Trim whitespace and use ILIKE for case-insensitivity
    const cleanEmail = email.trim();
    
    const users = await sql`
      SELECT * FROM cbt_students 
      WHERE email ILIKE ${cleanEmail}
    `;
    
    if (users.length === 0) {
      return NextResponse.json({ 
        error: "User not found", 
        suggestion: "Check the Export List. The student might have made a typo during registration." 
      }, { status: 404 });
    }
    
    const user = users[0];
    
    // Force Upgrade
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    await sql`
      UPDATE cbt_students 
      SET subscription_status = 'premium', 
          premium_expires_at = ${expiresAt.toISOString()}
      WHERE id = ${user.id}
    `;
    
    return NextResponse.json({ 
      success: true, 
      message: `UPGRADED ${user.name} (${user.email}) to PREMIUM`, 
      expires_at: expiresAt 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
