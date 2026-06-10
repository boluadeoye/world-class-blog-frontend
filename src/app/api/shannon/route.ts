import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

// Strict Timeout Fetch Utility to prevent Gateway timeouts
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number }) {
  const { timeout = 5000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function* readSSEStream(response: Response) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");
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
          if (data === "[DONE]") return;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) yield parsed.text;
          } catch (e) {}
        }
        boundary = buffer.indexOf("\n\n");
      }
    }
  } finally { reader.releaseLock(); }
}

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON;
    
    let searchContext = "";
    const lastMsg = messages[messages.length - 1]?.content || "";
    
    // 1. SENSORY ORGAN WITH STRICT 3s TIMEOUT
    if (TAVILY_KEY && /search|tavily|latest|research|analyze/i.test(lastMsg)) {
      try {
        const tRes = await fetchWithTimeout("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            api_key: TAVILY_KEY, 
            query: lastMsg.substring(0, 200), 
            max_results: 3 
          }),
          timeout: 3000 // 3.0 seconds hard ceiling
        });
        if (tRes.ok) {
          const tData = await tRes.json();
          searchContext = (tData.results || []).map((r: any) => `[Source: ${r.title}]\n${r.content}`).join("\n\n");
          console.log("[SENSORY]: SUCCESS");
        }
      } catch (e) {
        console.error("[SENSORY_TIMEOUT]: Aborted search to prevent gateway timeout.");
      }
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_RESEARCH]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    // 2. AI EXECUTION WITH 5s TIMEOUT PER KEY
    let response: Response | null = null;
    let activeKey: any = null;
    let lastError = "Initialization Failure";

    for (let attempt = 1; attempt <= 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) { lastError = "Key Pool Exhausted"; break; }

      try {
        response = await fetchWithTimeout('https://api.shannon-ai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'x-api-key': activeKey.key_val,
            'User-Agent': 'ShannonStudio/1.6'
          },
          body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true }),
          timeout: 5000 // 5.0 seconds hard ceiling per key
        });

        if (response.ok) break;

        const errText = await response.text();
        lastError = errText;
        if (response.status === 401 || errText.includes("Invalid")) {
          await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${activeKey.id}`;
        } else if (response.status === 429 || errText.includes("Quota")) {
          await jailKey(activeKey.id, 1440);
        }
        response = null;
      } catch (e: any) {
        lastError = e.message || "Request Timed Out";
        response = null;
      }
    }

    if (!response || !response.body) {
      return new Response(JSON.stringify({ error: lastError }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 3. THE RE-PACKAGER
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                }
              } catch (e) {}
            }
          }
        } catch (e) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream Interrupted" })}\n\n`));
        } finally {
          controller.close();
          reader.releaseLock();
        }
      }
    });

    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/event-stream', 
        'Cache-Control': 'no-cache' 
      } 
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { sessionId, messages } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Save Failed" }, { status: 500 });
  }
}
