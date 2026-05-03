import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage } from '@/lib/shannon';
import sql from '@/lib/db';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, sessionId, temperature = 0 } = await req.json();
    
    if (!sessionId) return NextResponse.json({ error: "Session ID missing" }, { status: 400 });

    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";

    const keyData = await getRotatedKey();
    if (!keyData) return NextResponse.json({ error: "API Pool Exhausted" }, { status: 429 });

    const context = [{ role: "system", content: systemPrompt }];
    if (currentSummary) context.push({ role: "system", content: `[STRATEGIC CONTEXT]: ${currentSummary}` });
    context.push(...messages.slice(-4));

    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
    });

    if (response.status === 401) {
      await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${keyData.id}`;
      return NextResponse.json({ error: `Key SHN-POOL-00${keyData.id} invalid. Disabled.` }, { status: 401 });
    }

    if (!response.ok) return NextResponse.json({ error: `API Error: ${response.status}` }, { status: response.status });

    // --- SSE STREAMING INTERCEPTOR ---
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) { controller.close(); return; }
        
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          controller.enqueue(value); // Forward to client instantly
          
          // Parse for background token calculation
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data:[DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.choices[0].delta.content) fullText += data.choices[0].delta.content;
              } catch (e) {}
            }
          }
        }
        controller.close();

        // Background Token Deduction (1 token ~= 4 chars approximation for streaming)
        const estimatedTokens = Math.floor(fullText.length / 4) + 3600; // 3600 is Shannon's base preamble
        await updateTokenUsage(keyData.id, estimatedTokens);
      }
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
