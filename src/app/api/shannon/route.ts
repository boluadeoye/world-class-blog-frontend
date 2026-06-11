import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number }) {
  const { timeout = 8000, ...fetchOptions } = options;
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

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);
    const TAVILY_KEY = process.env.Shannon || process.env.SHANNON;
    const lastMsg = messages[messages.length - 1]?.content || "";

    const stream = new ReadableStream({
      async start(controller) {
        const emitThought = (text: string) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ thought: text })}\n\n`));
        };
        const emitError = (text: string) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: text })}\n\n`));
        };

        try {
          let webContext = "";
          
          // PASS 1: URL EXTRACTION (JINA READER) - FIXED REGEX
          const rawUrls = lastMsg.match(/https?:\/\/[^\s()'"\]]+/g) || [];
          const urls = rawUrls.map((u: string) => u.replace(/[.,;!?]+$/, '')); // Strip trailing punctuation
          
          if (urls.length > 0) {
            emitThought(`Detected ${urls.length} URL(s). Initiating deep extraction...`);
            for (const url of urls.slice(0, 2)) {
              emitThought(`Reading bytes from: ${url}`);
              try {
                const jinaRes = await fetchWithTimeout(`https://r.jina.ai/${url}`, { method: 'GET', timeout: 8000 });
                if (jinaRes.ok) {
                  const md = await jinaRes.text();
                  webContext += `\n\n[SOURCE: ${url}]\n${md.substring(0, 6000)}`;
                  emitThought(`Successfully extracted ${md.length} bytes from ${url}.`);
                } else {
                  emitThought(`Failed to read ${url} (Status: ${jinaRes.status}).`);
                }
              } catch (e) {
                emitThought(`Timeout or network error while reading ${url}.`);
              }
            }
          } 
          // PASS 2: AGENTIC SEARCH (TAVILY)
          else if (TAVILY_KEY && /search|tavily|latest|research|analyze|docs/i.test(lastMsg)) {
            emitThought("Intent requires real-time data. Querying Tavily Search Network...");
            try {
              const tRes = await fetchWithTimeout("https://api.tavily.com/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ api_key: TAVILY_KEY, query: lastMsg.substring(0, 200), max_results: 4 }),
                timeout: 5000
              });
              if (tRes.ok) {
                const tData = await tRes.json();
                webContext = (tData.results || []).map((r: any) => `[SOURCE: ${r.url}]\n${r.content}`).join("\n\n");
                emitThought(`Retrieved ${tData.results?.length || 0} verified sources.`);
              }
            } catch (e) {
              emitThought("Search network timed out. Proceeding with internal knowledge.");
            }
          }

          // PASS 3: CONTEXT ASSEMBLY
          emitThought("Synthesizing context and aligning strategic parameters...");
          const context = [{ role: "system", content: systemPrompt }];
          if (webContext) context.push({ role: "system", content: `[WEB_RESEARCH_GROUND_TRUTH]:\n${webContext}` });
          context.push(...messages.slice(-6));

          // PASS 4: AI EXECUTION WITH FAILOVER
          let response: Response | null = null;
          let activeKey: any = null;

          for (let attempt = 1; attempt <= 3; attempt++) {
            activeKey = await getRotatedKey();
            if (!activeKey) { emitError("Key Pool Exhausted"); return; }

            emitThought(`Routing inference through Node ${activeKey.id} (Attempt ${attempt}/3)...`);
            try {
              response = await fetchWithTimeout('https://api.shannon-ai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-api-key': activeKey.key_val },
                body: JSON.stringify({ model: "shannon-pro-1.6", messages: context, temperature, stream: true }),
                timeout: 8000
              });

              if (response.ok) {
                emitThought("Connection established. Streaming response...");
                break;
              }

              const errText = await response.text();
              if (response.status === 401 || errText.includes("Invalid")) {
                await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${activeKey.id}`;
              } else if (response.status === 429 || errText.includes("Quota")) {
                await jailKey(activeKey.id, 1440);
              }
              response = null;
            } catch (e) { response = null; }
          }

          if (!response || !response.body) {
            emitError("All inference nodes failed or timed out.");
            return;
          }

          // PASS 5: STREAM RE-PACKAGING
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

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
        } catch (e: any) {
          emitError(e.message || "Fatal Stream Error");
        } finally {
          controller.close();
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
    return NextResponse.json({ ok: true });
  } catch (e) { return NextResponse.json({ error: "Save Failed" }, { status: 500 }); }
}
