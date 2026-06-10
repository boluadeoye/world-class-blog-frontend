import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON;
    
    let searchContext = "";
    if (TAVILY_KEY && /search|tavily|latest|research/i.test(messages[messages.length-1]?.content)) {
      try {
        const tRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_key: TAVILY_KEY, query: messages[messages.length-1].content.substring(0, 200), max_results: 3 })
        });
        if (tRes.ok) {
          const tData = await tRes.json();
          searchContext = tData.results.map((r: any) => r.content).join("\n\n");
        }
      } catch (e) {}
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (searchContext) context.push({ role: "system", content: `[WEB_CONTEXT]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    let response: Response | null = null;
    let lastError = "No keys available";

    for (let attempt = 1; attempt <= 3; attempt++) {
      const activeKey = await getRotatedKey();
      if (!activeKey) break;

      response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': activeKey.key_val },
        body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
      });

      if (response.ok) break;

      const errText = await response.text();
      lastError = errText;
      
      if (response.status === 401 || errText.includes("Invalid API key")) {
        // PERMANENT DISABLE: Key is garbage
        await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${activeKey.id}`;
      } else if (response.status === 429 || errText.includes("Quota")) {
        await jailKey(activeKey.id, 1440);
      }
      response = null;
    }

    if (!response) return new Response(JSON.stringify({ error: lastError }), { status: 500 });
    return new Response(response.body, { headers: { 'Content-Type': 'text/event-stream' } });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { sessionId, messages } = await req.json();
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
  return NextResponse.json({ ok: true });
}
