import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const keyData = await getRotatedKey();
    if (!keyData) return new Response(JSON.stringify({ error: "API Pool Exhausted" }), { status: 429 });

    const sql = neon(process.env.DATABASE_URL!);
    let currentSummary = "";
    if (sessionId) {
      const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
      currentSummary = session[0]?.summary || "";
    }

    const context =[{ role: "system", content: systemPrompt }];
    if (currentSummary) context.push({ role: "system", content: `[STRATEGIC CONTEXT]: ${currentSummary}` });
    context.push(...messages.slice(-4));

    const upstream = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyData.key_val}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
    });

    if (upstream.status === 401) {
      await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${keyData.id}`;
      return new Response(JSON.stringify({ error: `Key SHN-POOL-00${keyData.id} invalid. Disabled.` }), { status: 401 });
    }
    if (!upstream.ok) return new Response(JSON.stringify({ error: `API Error: ${upstream.status}` }), { status: upstream.status });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        let buffer = "";
        let fullText = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? ""; // STRICT BUFFER GUARD: Keep incomplete chunks in memory

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;
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
          await updateTokenUsage(keyData.id, Math.floor(fullText.length / 4) + 3600);
        }
      }
    });

    return new Response(readableStream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } });
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
