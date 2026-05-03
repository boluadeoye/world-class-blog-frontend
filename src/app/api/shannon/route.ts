import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, generateStrategicSummary } from '@/lib/shannon';
import sql from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, sessionId, temperature = 0 } = await req.json();
    
    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";

    const keyData = await getRotatedKey();
    if (!keyData) return NextResponse.json({ error: "All keys in pool are exhausted or invalid." }, { status: 429 });

    const context = [
      { role: "system", content: systemPrompt },
      { role: "system", content: `[STRATEGIC CONTEXT]: ${currentSummary}` },
      ...messages.slice(-4)
    ];

    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature })
    });

    // --- SELF-HEALING LOGIC ---
    if (response.status === 401) {
      await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${keyData.id}`;
      return NextResponse.json({ error: `Key SHN-POOL-00${keyData.id} was invalid and has been removed from the pool. Please try again.` }, { status: 401 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: `Shannon API Error: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();

    if (data.usage) {
      await updateTokenUsage(keyData.id, data.usage.total_tokens);
      if (messages.length > 0 && messages.length % 5 === 0) {
        const newSummary = await generateStrategicSummary(messages, currentSummary);
        await sql`UPDATE shannon_history SET summary = ${newSummary} WHERE id = ${sessionId}`;
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
