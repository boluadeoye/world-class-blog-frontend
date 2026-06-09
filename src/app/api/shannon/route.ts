import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    // DETERMINISTIC ENV CHECK
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON || process.env.TAVILY_API_KEY;
    const lastMessageContent = messages[messages.length - 1]?.content || "";
    
    let searchContext = "";
    let sensoryActive = false;

    // LOUD TRIGGER: If message is > 10 chars, we ATTEMPT search.
    if (lastMessageContent.length > 10) {
      if (!TAVILY_KEY) {
        // LOUD FAILURE: If we should search but can't, we kill the request so you see it in logs.
        throw new Error("[CRITICAL_CONFIG_ERROR]: TAVILY_KEY_NOT_FOUND_IN_ENVIRONMENT");
      }

      sensoryActive = true;
      try {
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: TAVILY_KEY,
            query: lastMessageContent.substring(0, 200),
            search_depth: "advanced",
            max_results: 5
          })
        });

        if (tavilyRes.ok) {
          const searchData = await tavilyRes.json();
          searchContext = (searchData.results || []).map((r: any) => `[Source: ${r.title}]\n${r.content}`).join("\n\n");
        } else {
          throw new Error(`[TAVILY_API_ERROR]: Status ${tavilyRes.status}`);
        }
      } catch (e: any) {
        console.error(e.message);
        // If Tavily itself fails, we proceed but log it.
      }
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_RESEARCH_GROUND_TRUTH]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    let activeKey = await getRotatedKey();
    if (!activeKey) return new Response(JSON.stringify({ error: "Pool Exhausted" }), { status: 429 });

    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': activeKey.key_val },
      body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let boundary = buffer.indexOf("\n\n");
            while (boundary !== -1) {
              const chunk = buffer.substring(0, boundary).trim();
              buffer = buffer.substring(boundary + 2);
              const lines = chunk.split("\n");
              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const data = trimmed.slice(5).trim();
                if (data === "[DONE]") { controller.enqueue(encoder.encode("data: [DONE]\n\n")); return; }
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.choices?.[0]?.delta?.content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: parsed.choices[0].delta.content })}\n\n`));
                  }
                } catch (e) {}
              }
              boundary = buffer.indexOf("\n\n");
            }
          }
        } finally {
          controller.close();
          reader.releaseLock();
        }
      }
    });

    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/event-stream',
        'X-Shannon-Sensory': sensoryActive ? 'true' : 'false' // VERIFIABLE VIA BROWSER NETWORK TAB
      } 
    });
  } catch (error: any) {
    // THIS WILL SHOW UP IN VERCEL LOGS AS A RED ERROR
    console.error("FATAL_API_ERROR:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { sessionId, messages } = await req.json();
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
  return NextResponse.json({ ok: true });
}
