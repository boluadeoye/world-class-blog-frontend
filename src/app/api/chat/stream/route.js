export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

function buildPersona(mode, site, email){
  const base = `You are Boluwatife’s personal assistant (PA). Speak as the assistant (“I”), on his behalf. Help across business, technology, AI, APIs, light troubleshooting, and writing. Be concise, warm, and practical.
- Canonical website: ${site} (never vercel.app).
- Contact: ${email}. If user wants to proceed, suggest a short brief and offer to email a summary to ${email}.
- Never claim to be Boluwatife; you are his PA. Use “Boluwatife” or “my client” when needed.
- Use Markdown for structure and mobile‑friendly paragraphs.`;

  const modes = {
    inquiry: "Mode: Project inquiry. Ask 3–6 scoping questions (goals, timeline, budget range, constraints). Propose next steps.",
    advice: "Mode: Advice. Give clear, structured guidance with short bullets and brief examples.",
    troubleshoot: "Mode: Troubleshooting. Identify likely root causes, provide step-by-step checks/commands, and a fallback plan.",
    writing: "Mode: Writing. Outline first, then a crisp draft, then a short polish checklist."
  };
  const tag = modes[String(mode||"").toLowerCase()] || "";
  return tag ? `${base}\n\n${tag}` : base;
}

function messagesToContents(messages){
  const out = [];
  for (const m of (messages || [])) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "");
    if (text) out.push({ role, parts: [{ text }] });
  }
  return out.length ? out : [{ role:"user", parts:[{ text:"Hello!" }] }];
}

function sse(obj){ return `data: ${JSON.stringify(obj)}\n\n`; }
const enc = new TextEncoder();

export async function POST(req) {
  try{
    if (!API_KEY) {
      return new Response(sse({ error: "Missing GEMINI_API_KEY" }), {
        status: 500, headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" }
      });
    }

    const { messages = [], mode = "inquiry" } = await req.json();
    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng";
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";
    const persona = buildPersona(mode, site, email);

    const personaTurn = { role: "user", parts: [{ text: persona }] };
    const contents = [personaTurn, ...messagesToContents(messages)];

    const payload = {
      contents,
      generationConfig: { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 768 }
    };

    // Call non-stream endpoint (reliable), then stream to client ourselves.
    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;
    const r = await fetch(url, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const text = await r.text();
      return new Response(sse({ error:`Model error ${r.status}: ${text.slice(0,400)}` }), {
        status: 500, headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" }
      });
    }
    const data = await r.json();
    const full = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("").trim();

    const readable = new ReadableStream({
      async start(controller){
        try{
          controller.enqueue(enc.encode(sse({ start:true })));
          // Tokenize into small chunks for perceived streaming
          const chunks = full ? full.split(/(\s+)/).filter(Boolean) : ["Sorry, I couldn't generate a reply."];
          for (const c of chunks){
            controller.enqueue(enc.encode(sse({ delta:c })));
            // keep it snappy but readable
            await new Promise(res=>setTimeout(res, 15));
          }
          controller.enqueue(enc.encode(sse({ done:true })));
          controller.close();
        }catch(e){
          controller.enqueue(enc.encode(sse({ error:String(e) })));
          controller.close();
        }
      }
    });

    return new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no"
      }
    });
  }catch(e){
    return new Response(sse({ error:String(e) }), {
      status: 500,
      headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" }
    });
  }
}
