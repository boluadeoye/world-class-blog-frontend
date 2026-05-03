import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, generateStrategicSummary } from '@/lib/shannon';
import sql from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, sessionId, temperature = 0 } = await req.json();
    
    // 1. Fetch existing summary from Neon
    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";

    // 2. Get rotated key
    const keyData = await getRotatedKey();
    if (!keyData) return NextResponse.json({ error: "Pool Exhausted" }, { status: 429 });

    // 3. Construct Three-Layer Context Stack
    const context = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `[LONG-TERM STRATEGIC CONTEXT]: ${currentSummary}` },
      ...messages.slice(-4) // Last 4 messages for immediate working memory
    ];

    // 4. Execute Request
    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`,
        'User-Agent': 'Mozilla/5.0 (SiliconValleyStudio/1.0)'
      },
      body: JSON.stringify({
        model: "shannon-pro-1.6",
        messages: context,
        temperature
      })
    });

    const data = await response.json();

    // 5. Background Tasks: Update Tokens & Trigger Summarization
    if (data.usage) {
      updateTokenUsage(keyData.id, data.usage.total_tokens);
      
      // Trigger summarization every 5 messages to keep context fresh
      if (messages.length > 0 && messages.length % 5 === 0) {
        const newSummary = await generateStrategicSummary(messages, currentSummary);
        await sql`UPDATE shannon_history SET summary = ${newSummary} WHERE id = ${sessionId}`;
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Proxy Failure" }, { status: 500 });
  }
}
