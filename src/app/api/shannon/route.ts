import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

async function generateSummary(oldMessages: any[]): Promise<string> {
  const activeKey = await getRotatedKey();
  if (!activeKey) return "";
  try {
    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': activeKey.key_val },
      body: JSON.stringify({
        model: "shannon-pro-1.6",
        messages: [
          { role: "system", content: "Summarize this technical conversation concisely. Retain all critical architectural decisions and variable names." },
          { role: "user", content: JSON.stringify(oldMessages) }
        ],
        temperature: 0.1
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    }
  } catch (e) { console.error("Compaction failed:", e); }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    
    // ENV RESOLUTION: Check all possible naming variants
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON || process.env.TAVILY_API_KEY;

    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";
    const lastMessageContent = messages[messages.length - 1]?.content || "";
    
    let searchContext = "";
    const needsSearch = /search|tavily|latest|documentation|api|versus|vs|how to|implement|code for|explain|research|analyze/i.test(lastMessageContent);

    if (needsSearch && TAVILY_KEY) {
      console.log(`[SENSORY_TRIGGER]: ACTIVE for session ${sessionId}`);
      try {
        // Extract the core query by removing the [STRATEGIC_MANDATE] headers
        const cleanQuery = lastMessageContent.replace(/\[.*?\]/g, '').split('\n').find(l => l.trim().length > 5) || lastMessageContent;
        
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: TAVILY_KEY,
            query: cleanQuery.substring(0, 200),
            search_depth: "advanced",
            max_results: 5
          })
        });

        if (tavilyRes.ok) {
          const searchData = await tavilyRes.json();
          console.log(`[SENSORY_DATA]: Received ${searchData.results?.length || 0} results`);
          searchContext = (searchData.results || []).map((r: any) => `[Source: ${r.title}]\n${r.content}`).join("\n\n");
        } else {
          console.error(`[SENSORY_ERROR]: Tavily API returned ${tavilyRes.status}`);
        }
      } catch (searchErr) {
        console.error("[SENSORY_CRITICAL_FAILURE]:", searchErr);
      }
    } else {
      console.log(`[SENSORY_TRIGGER]: SKIPPED (NeedsSearch: ${needsSearch}, KeyPresent: ${!!TAVILY_KEY})`);
    }

    const context = [{ role: "system", content: systemPrompt }];
    if (currentSummary) context.push({ role: "system", content: `[HISTORICAL STRATEGIC CONTEXT]: ${currentSummary}` });
    if (searchContext) context.push({ role: "system", content: `[WEB_RESEARCH_GROUND_TRUTH]:\n${searchContext}` });
    context.push(...messages.slice(-6));

    let response: Response | null = null;
    let activeKey: any = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) break;
      response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': activeKey.key_val,
          'User-Agent': 'Mozilla/5.0'
        },
        body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true })
      });
      if (response.status === 429) { await jailKey(activeKey.id, 5); response = null; continue; }
      break;
    }

    if (!response || !response.ok) return new Response(JSON.stringify({ error: "Pool Congested" }), { status: 429 });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response!.body!.getReader();
        let buffer = "";
        let fullText = "";
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
                    const content = parsed.choices[0].delta.content;
                    fullText += content;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                  }
                } catch (e) {}
              }
              boundary = buffer.indexOf("\n\n");
            }
          }
        } finally {
          controller.close();
          reader.releaseLock();
          if (activeKey?.id) await updateTokenUsage(activeKey.id, Math.floor(fullText.length / 4) + 1000);
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
    if (messages.length > 12) {
      const oldMessages = messages.slice(0, 6);
      const remainingMessages = messages.slice(6);
      const newSummarySegment = await generateSummary(oldMessages);
      if (newSummarySegment) {
        const currentData = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
        const consolidatedSummary = `${currentData[0]?.summary || ""}\n[CONSOLIDATED]: ${newSummarySegment}`;
        await sql`UPDATE shannon_history SET messages = ${JSON.stringify(remainingMessages)}::jsonb, summary = ${consolidatedSummary} WHERE id = ${sessionId}`;
        return new Response(JSON.stringify({ ok: true, compacted: true }), { status: 200 });
      }
    }
    await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
    return NextResponse.json({ ok: true });
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}
