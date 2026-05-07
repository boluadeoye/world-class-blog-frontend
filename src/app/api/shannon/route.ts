import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

async function attemptFetch(context: any, keyData: any, temperature: number): Promise<Response> {
  return await fetch('https://api.shannon-ai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': keyData.key_val,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
  });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    let currentSummary = "";
    if (sessionId) {
      const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
      currentSummary = session[0]?.summary || "";
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (currentSummary) context.push({ role: "system", content: `[STRATEGIC CONTEXT]: ${currentSummary}` });
    context.push(...messages.slice(-4));

    // --- RECURSIVE FAILOVER LOOP (3 ATTEMPTS) ---
    let response;
    let currentKey;
    for (let i = 0; i < 3; i++) {
      currentKey = await getRotatedKey();
      if (!currentKey) break;

      response = await attemptFetch(context, currentKey, temperature);
      
      if (response.status === 429) {
        console.warn(`Key ${currentKey.id} burst limited. Retrying with next key...`);
        continue; 
      }
      if (response.status === 401) {
        await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${currentKey.id}`;
        continue;
      }
      break; // Success or non-retryable error
    }

    if (!response || !response.ok) {
      return new Response(JSON.stringify({ error: "Pool Exhausted or Provider Down" }), { status: response?.status || 500 });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const keyId = currentKey?.id;

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        let buffer = "";
        let fullText = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  const content = parsed.choices[0].delta.content;
                  fullText += content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                }
              } catch {}
            }
          }
        } finally {
          controller.close();
          reader.releaseLock();
          if (keyId) await updateTokenUsage(keyId, Math.floor(fullText.length / 4) + 3600);
        }
      }
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { sessionId, messages } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
