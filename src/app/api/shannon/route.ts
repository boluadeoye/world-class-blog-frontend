import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON || process.env.TAVILY_API_KEY;
    const lastMessageContent = messages[messages.length - 1]?.content || "";
    
    let searchContext = "";
    let sensoryStatus = "SKIPPED";

    // 1. SENSORY ORGAN (TAVILY)
    if (lastMessageContent.length > 10 && TAVILY_KEY) {
      sensoryStatus = "TRIGGERED";
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
          sensoryStatus = `SUCCESS (${searchData.results?.length || 0} results)`;
        } else {
          sensoryStatus = `FAILED (Status ${tavilyRes.status})`;
        }
      } catch (e: any) {
        sensoryStatus = `ERROR (${e.message})`;
      }
    }
    console.log(`[SENSORY]: ${sensoryStatus}`);

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_RESEARCH_GROUND_TRUTH]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    // 2. AI EXECUTION WITH 3-KEY FAILOVER
    let response: Response | null = null;
    let activeKey: any = null;
    let lastError = "Unknown Error";

    for (let attempt = 1; attempt <= 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) {
        lastError = "Key Pool Exhausted (No active keys available)";
        break;
      }

      console.log(`[AI_FETCH]: Attempt ${attempt} using Key ID ${activeKey.id}`);
      
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

        if (response.ok) break; // Success!

        const errorData = await response.json().catch(() => ({}));
        lastError = errorData.error?.message || `Status ${response.status}`;
        
        if (response.status === 429) {
          await jailKey(activeKey.id, 5);
        } else if (response.status === 401) {
          await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${activeKey.id}`;
        }
        response = null;
      } catch (e: any) {
        lastError = e.message;
        response = null;
      }
    }

    // 3. FINAL RESPONSE GATING
    if (!response || !response.ok) {
      console.error(`[FATAL]: All attempts failed. Last error: ${lastError}`);
      return new Response(JSON.stringify({ error: lastError }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 4. STREAMING OUTPUT
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response!.body!.getReader();
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
        'X-Shannon-Sensory': sensoryStatus.includes("SUCCESS") ? 'true' : 'false'
      } 
    });

  } catch (error: any) {
    console.error("[TOP_LEVEL_ERROR]:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { sessionId, messages } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
