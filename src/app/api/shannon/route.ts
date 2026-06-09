import { NextRequest, NextResponse } from 'next/server';
import { getRotatedKey, updateTokenUsage, jailKey } from '@/lib/shannon';
import { neon } from "@neondatabase/serverless";

export const runtime = 'edge';

// Memory Consolidation Helper: Compacts oldest messages to save token limits
async function generateSummary(oldMessages: any[]): Promise<string> {
  const activeKey = await getRotatedKey();
  if (!activeKey) return "";
  
  try {
    const response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': activeKey.key_val
      },
      body: JSON.stringify({
        model: "shannon-pro-1.6",
        messages: [
          { 
            role: "system", 
            content: "You are a data compaction engine. Summarize the following technical conversation history in exactly one concise paragraph. Retain all critical architectural decisions, variable names, files, schemas, and technologies mentioned. Do not write any conversational intro or outro." 
          },
          { 
            role: "user", 
            content: JSON.stringify(oldMessages) 
          }
        ],
        temperature: 0.1
      })
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    }
  } catch (e) {
    console.error("Background context compaction failed:", e);
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, systemPrompt, temperature = 0 } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);

    const session = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
    const currentSummary = session[0]?.summary || "";

    const lastMessageContent = messages[messages.length - 1]?.content || "";
    let searchContext = "";

    // HEURISTIC AGENTIC SEARCH: Intercept complex questions and fetch ground truth
    const needsSearch = /search|tavily|latest|documentation|api|versus|vs|how to|implement|code for|explain/i.test(lastMessageContent);
    if (needsSearch && process.env.Shannon) {
      try {
        const query = lastMessageContent.split('\n')[0].substring(0, 80);
        const tavilyRes = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: process.env.Shannon,
            query: query,
            search_depth: "basic",
            max_results: 3
          })
        });

        if (tavilyRes.ok) {
          const searchData = await tavilyRes.json();
          const results = searchData.results || [];
          searchContext = results.map((r: any) => `[Source: ${r.title} (${r.url})]\n${r.content}`).join("\n\n");
        }
      } catch (searchErr) {
        console.error("Tavily sensory organ failed:", searchErr);
      }
    }

    const context = [{ role: "system", content: systemPrompt }];
    
    if (currentSummary) {
      context.push({ role: "system", content: `[HISTORICAL STRATEGIC CONTEXT]: ${currentSummary}` });
    }
    
    if (searchContext) {
      context.push({ 
        role: "system", 
        content: `[WEB_RESEARCH_GROUND_TRUTH]: Use the following real-time web results to ensure absolute technical accuracy:\n${searchContext}` 
      });
    }

    // Only send the last 6 messages of active memory to respect rate limits
    context.push(...messages.slice(-6));

    let response: Response | null = null;
    let activeKey: any = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      activeKey = await getRotatedKey();
      if (!activeKey) break;

      if (attempt === 0) {
        await new Promise(r => setTimeout(r, Math.random() * 150 + 50));
      }

      response = await fetch('https://api.shannon-ai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': activeKey.key_val,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: JSON.stringify({ 
          model: "shannon-pro-1.6", 
          messages: context, 
          temperature, 
          stream: true 
        })
      });

      if (response.status === 429) {
        await jailKey(activeKey.id, 5);
        response = null;
        continue;
      }
      if (response.status === 401) {
        await sql`UPDATE shannon_api_pool SET is_active = FALSE WHERE id = ${activeKey.id}`;
        response = null;
        continue;
      }
      break;
    }

    if (!response || !response.ok) {
      return new Response(
        JSON.stringify({ error: "All keys in keypool are currently exhausted or jailed. Try again in a few minutes." }), 
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const keyId = activeKey?.id;

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

                if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
                  try {
                    const parsed = JSON.parse(trimmed);
                    if (parsed.error) {
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: parsed.error.message || "Upstream rate limit/error." })}\n\n`));
                      return;
                    }
                  } catch {}
                }

                if (!trimmed.startsWith("data:")) continue;
                const data = trimmed.slice(5).trim();

                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.error) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: parsed.error.message || "Provider runtime error." })}\n\n`));
                    return;
                  }
                  if (parsed.choices?.[0]?.delta?.content) {
                    const content = parsed.choices[0].delta.content;
                    fullText += content;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
                  }
                } catch (e) {
                  console.warn("JSON chunk recovery trigger:", e);
                }
              }
              boundary = buffer.indexOf("\n\n");
            }
          }
        } catch (streamError: any) {
          console.error("Network disconnect or stream breakdown:", streamError);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Active network connection dropped." })}\n\n`));
        } finally {
          controller.close();
          reader.releaseLock();
          
          if (keyId && fullText.length > 0) {
            try {
              await updateTokenUsage(keyId, Math.floor(fullText.length / 4) + 3600);
            } catch (dbErr) {
              console.error("Failed to log key token usage:", dbErr);
            }
          }
        }
      }
    });

    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/event-stream', 
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive'
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
    
    // ACTIVE CONTEXT COMPACTION (Memory consolidation triggers when array > 12)
    if (messages.length > 12) {
      const oldMessages = messages.slice(0, 6);
      const remainingMessages = messages.slice(6);
      
      const newSummarySegment = await generateSummary(oldMessages);
      if (newSummarySegment) {
        const currentData = await sql`SELECT summary FROM shannon_history WHERE id = ${sessionId}`;
        const prevSummary = currentData[0]?.summary || "";
        const consolidatedSummary = prevSummary 
          ? `${prevSummary}\n[CONSOLIDATED CONTEXT]: ${newSummarySegment}`
          : newSummarySegment;
          
        await sql`UPDATE shannon_history 
                  SET messages = ${JSON.stringify(remainingMessages)}::jsonb, 
                      summary = ${consolidatedSummary} 
                  WHERE id = ${sessionId}`;
        
        return new Response(JSON.stringify({ ok: true, compacted: true }), { status: 200 });
      }
    }

    // Standard fast update path
    await sql`UPDATE shannon_history SET messages = ${JSON.stringify(messages)}::jsonb WHERE id = ${sessionId}`;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
