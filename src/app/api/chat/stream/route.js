export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";
// CRITICAL FIX: Hardcode the correct domain
const SITE_URL = "https://boluadeoye.com.ng";

function buildPersona(mode, email){
  const base = `You are Boluwatife’s exclusive Personal Assistant (PA).
- **Identity**: You are NOT a Google AI. You are a custom assistant built by Boluwatife Adeoye.
- **Website**: Refer ONLY to ${SITE_URL}. Never mention vercel.app or other domains.
- **Tone**: Professional, concise, loyal to your client (Boluwatife).
- **Role**: Handle inquiries, tech advice, and debugging on his behalf.
- **Contact**: If a user wants to hire him, suggest emailing ${email}.`;
  
  const modes = {
    inquiry: "Mode: Project Inquiry. Ask 3 brief scoping questions to understand the lead.",
    advice: "Mode: Tech Advice. Provide high-level, architectural advice.",
    troubleshoot: "Mode: Debugging. Offer specific, code-level solutions.",
    writing: "Mode: Writing. Assist with drafting content."
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
    if (!API_KEY) return new Response(sse({ error: "Server Config Error" }), { status: 500 });
    
    const { messages = [], mode = "inquiry" } = await req.json();
    const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";
    const persona = buildPersona(mode, email);

    const contents = [{ role: "user", parts: [{ text: persona }] }, ...messagesToContents(messages)];
    const payload = { contents, generationConfig: { temperature: 0.6, maxOutputTokens: 800 } };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    
    if (!r.ok) return new Response(sse({ error:"I am currently offline. Please email Boluwatife directly." }), { status: 500 });

    const data = await r.json();
    const full = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("").trim() || "I have no response.";

    const readable = new ReadableStream({
      async start(controller){
        controller.enqueue(enc.encode(sse({ start:true })));
        const chunks = full.split(/(\s+)/).filter(Boolean);
        for (const c of chunks){
          controller.enqueue(enc.encode(sse({ delta:c })));
          await new Promise(res=>setTimeout(res, 10));
        }
        controller.enqueue(enc.encode(sse({ done:true })));
        controller.close();
      }
    });

    return new Response(readable, { status: 200, headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" } });
  }catch(e){
    return new Response(sse({ error:"Connection error." }), { status: 500 });
  }
}
