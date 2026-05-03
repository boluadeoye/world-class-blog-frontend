import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage } from '@/lib/shannon';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, temperature = 0.7 } = await req.json();
    
    // 1. Get the rotated key from Neon
    const keyData = await getRotatedKey();
    if (!keyData) {
      return NextResponse.json({ error: "All keys exhausted or DB connection failed." }, { status: 429 });
    }

    // 2. Token Squeezer: Only send System Prompt + Last 2 messages to save tokens
    const context = [
      { role: "system", content: systemPrompt || "You are Shannon, a red-team AI expert." },
      ...messages.slice(-2)
    ];

    // 3. Execute Stealth Request to Shannon
    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        model: "shannon-pro-1.6",
        messages: context,
        temperature,
        stream: false
      })
    });

    const data = await response.json();

    // 4. Background Update Usage in Neon
    if (data.usage) {
      // We don't await this to keep the response fast for the user
      updateTokenUsage(keyData.id, data.usage.total_tokens);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Route Error:", error);
    return NextResponse.json({ error: "Internal Proxy Failure" }, { status: 500 });
  }
}
