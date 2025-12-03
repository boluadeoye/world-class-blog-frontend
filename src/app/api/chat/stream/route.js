export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const RAW_MODEL = (process.env.GEMINI_MODEL || "").trim();
// FIX: Use stable model name
const MODEL = /^gemini-/.test(RAW_MODEL) ? RAW_MODEL : "gemini-2.0-flash";

function buildPersona(mode, site, email){
  const base = `You are Boluwatife’s personal assistant (PA). Speak as the assistant (“I”), on his behalf.
- Canonical website: ${site}.
- Contact: ${email}.
- Never claim to be Boluwatife; you are his PA.
- Use Markdown; short mobile‑friendly paragraphs.`;
  
  const modes = {
    inquiry: "Mode: Project inquiry. Ask scoping questions.",
    advice: "Mode: Advice. Give clear, structured guidance.",
    troubleshoot: "Mode: Troubleshooting. Root‑cause candidates.",
    writing: "Mode: Writing. Outline first, then draft."
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

const enc = new TextEncoder();
const sse = (obj) => `data: ${JSON.stringify(obj)}\n\n`;

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
    const payload = { contents, generationConfig: { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 768 } };

    // FIX: Use v1beta for API version
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) {
      const txt = await r.text();
      return new Response(sse({ error:`Model error ${r.status}: ${txt.slice(0,400)}` }), {
        status: 500, headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" }
      });
    }
    const data = await r.json();
    const full = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("").trim() || "I couldn't generate a reply.";

    const readable = new ReadableStream({
      async start(controller){
        controller.enqueue(enc.encode(sse({ start:true })));
        const chunks = full.split(/(\s+)/).filter(Boolean);
        for (const c of chunks){
          controller.enqueue(enc.encode(sse({ delta:c })));
          await new Promise(res=>setTimeout(res, 12));
        }
        controller.enqueue(enc.encode(sse({ done:true })));
        controller.close();
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
      status: 500, headers: { "Content-Type":"text/event-stream", "Cache-Control":"no-cache", "Connection":"keep-alive" }
    });
  }
}
