import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON;
    const lastMessage = messages[messages.length - 1]?.content || "";
    
    console.log(`[SENSORY_CHECK]: Key Present: ${!!TAVILY_KEY}`);

    let searchContext = "";
    const needsSearch = /search|tavily|latest|documentation|research/i.test(lastMessage);

    if (needsSearch && TAVILY_KEY) {
      try {
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: TAVILY_KEY,
            query: lastMessage.substring(0, 200),
            search_depth: "basic",
            max_results: 3
          })
        });
        if (tavilyRes.ok) {
          const data = await tavilyRes.json();
          searchContext = data.results.map((r: any) => `[Source: ${r.title}]\n${r.content}`).join("\n\n");
          console.log("[SENSORY]: Search Successful");
        }
      } catch (e) { console.error("[SENSORY_ERR]:", e); }
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_CONTEXT]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    let response: Response | null = null;
    let activeKey: any = null;
    let lastProviderError = "No keys available in pool";

    for (let attempt = 1; attempt <= 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) break;

      console.log(`[AI_FETCH]: Attempt ${attempt} using Key ID ${activeKey.id}`);

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
      lastProviderError = errText;
      console.error(`[AI_FAIL_ID_${activeKey.id}]:`, errText);

      if (response.status === 429 || errText.includes("Quota")) {
        await jailKey(activeKey.id, 1440); // 24 hour jail for quota
      }
      response = null;
    }

    if (!response) {
      console.error("[FATAL_POOL_EXHAUSTION]:", lastProviderError);
      return new Response(JSON.stringify({ error: lastProviderError }), { status: 500 });
    }

    return new Response(response.body, { 
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } 
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
