import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, generateStrategicSummary } from '@/lib/shannon';
import sql from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, sessionId, temperature = 0 } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
    }

    // 1. Fetch existing summary from Neon
    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";

    // 2. Get rotated key
    const keyData = await getRotatedKey();
    if (!keyData) {
      return NextResponse.json({ error: "API Pool Exhausted or DB Error" }, { status: 429 });
    }

    // 3. Construct Three-Layer Context Stack
    const context =[
      { role: "system", content: systemPrompt || "You are a red-team AI." }
    ];
    
    if (currentSummary) {
      context.push({ role: "system", content: `[LONG-TERM STRATEGIC CONTEXT]: ${currentSummary}` });
    }
    
    context.push(...messages.slice(-4));

    // 4. Execute Request (Standard User-Agent to bypass Cloudflare WAF)
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
        temperature
      })
    });

    // 5. Catch Cloudflare/API Errors before parsing JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shannon API Error:", errorText);
      return NextResponse.json({ error: `Shannon API returned ${response.status}` }, { status: response.status });
    }

    const data = await response.json();

    // 6. Background Tasks (Awaited to prevent Edge runtime termination)
    if (data.usage) {
      await updateTokenUsage(keyData.id, data.usage.total_tokens);
      
      if (messages.length > 0 && messages.length % 5 === 0) {
        const newSummary = await generateStrategicSummary(messages, currentSummary);
        await sql`UPDATE shannon_history SET summary = ${newSummary} WHERE id = ${sessionId}`;
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Proxy Route Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
