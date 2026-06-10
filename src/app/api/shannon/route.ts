import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON;
    
    let searchContext = "";
    const lastMsg = messages[messages.length - 1]?.content || "";
    
    // 1. SENSORY ORGAN (TAVILY)
    if (TAVILY_KEY && /search|tavily|latest|research|analyze/i.test(lastMsg)) {
      try {
        const tRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            api_key: TAVILY_KEY, 
            query: lastMsg.substring(0, 200), 
            max_results: 5 
          })
        });
        if (tRes.ok) {
          const tData = await tRes.json();
          searchContext = (tData.results || []).map((r: any) => `[Source: ${r.title}]\n${r.content}`).join("\n\n");
          console.log("[SENSORY]: SUCCESS");
        }
      } catch (e) {
        console.error("[SENSORY_ERR]");
      }
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_RESEARCH]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    // 2. AI EXECUTION WITH FAILOVER
    let response: Response | null = null;
    let activeKey: any = null;
    let lastError = "Initialization Failure";

    for (let attempt = 1; attempt <= 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) { lastError = "Key Pool Exhausted"; break; }

      try {
        response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'x-api-key': activeKey.key_val,
            'User-Agent': 'ShannonStudio/1.6'
          },
          body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
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
        lastError = e.message;
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
