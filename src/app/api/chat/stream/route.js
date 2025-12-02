export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

function buildPersona(mode, site, email){
  const base = `You are Boluwatife’s personal assistant (PA). Speak in first-person as the assistant (“I”). Your job is to help on his behalf across business, technology, AI, APIs, light troubleshooting/debugging, and writing — always helpful, concise, warm, and practical.
- Canonical website: ${site}. Use only this domain for internal links (never vercel.app).
- Contact: ${email}. If the user wants to proceed, suggest sending a short brief and offer to email a summary to ${email}.
- Never claim to be Boluwatife; you are his PA. Refer to him as “Boluwatife” or “my client” when needed.
- Use Markdown for structure (bold, lists, links) and mobile-friendly paragraphs.`;

  const modes = {
    inquiry: "Mode: Project inquiry. Ask 3–6 focused scoping questions (goals, timeline, budget range, constraints), then propose next steps.",
    advice: "Mode: Advice. Give clear, structured guidance. Prefer bullets and brief examples.",
    troubleshoot: "Mode: Troubleshooting. Identify the likely root cause, provide step-by-step checks and commands, then a fallback plan.",
    writing: "Mode: Writing assistant. Outline first, then a clean draft, then an optional polish checklist."
  };

  const tag = (modes[mode] || "").trim();
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

function encoder(){ return new TextEncoder(); }
function sse(data){ return `data: ${JSON.stringify(data)}\n\n`; }

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
    const persona = buildPersona(String(mode).toLowerCase(), site, email);

    const personaTurn = { role: "user", parts: [{ text: persona }] };
    const contents = [personaTurn, ...messagesToContents(messages)];

    const payload = {
      contents,
      generationConfig: {
        temperature: 0.6,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 768
      }
      // Omit safetySettings for compatibility
    };

    const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?key=${API_KEY}`;
    const genUrl = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;

    const readable = new ReadableStream({
      async start(controller){
        const enc = encoder();

        async function tryStream(){
          try{
            const r = await fetch(streamUrl, {
              method:"POST",
              headers:{ "Content-Type":"application/json" },
              body: JSON.stringify(payload)
            });
            if (!r.ok || !r.body) throw new Error(`stream ${r.status}`);
            const reader = r.body.getReader();
            let buffer = "";
            controller.enqueue(enc.encode(sse({ start:true })));

            while (true){
              const { done, value } = await reader.read();
              if (done) break;
              buffer += new TextDecoder().decode(value, { stream:true });
              const lines = buffer.split(/\r?\n/);
              buffer = lines.pop() || "";
              for (const line of lines){
                if (!line.startsWith("data:")) continue;
                const json = line.slice(5).trim();
                if (!json || json === "[DONE]") continue;
                try{
                  const evt = JSON.parse(json);
                  const parts = evt?.candidates?.[0]?.content?.parts || [];
                  const text = parts.map(p => p.text || "").join("");
                  if (text) controller.enqueue(enc.encode(sse({ delta:text })));
                }catch{}
              }
            }
            controller.enqueue(enc.encode(sse({ done:true })));
            controller.close();
          }catch(e){
            return false;
          }
          return true;
        }

        async function fallback(){
          try{
            const r = await fetch(genUrl, {
              method:"POST",
              headers:{ "Content-Type":"application/json" },
              body: JSON.stringify(payload)
            });
            if (!r.ok) throw new Error(`gen ${r.status}`);
            const data = await r.json();
            const text = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("");
            controller.enqueue(enc.encode(sse({ start:true })));
            // naive chunk split for perceived streaming
            const chunks = text.split(/(\s+)/).filter(Boolean);
            for (const c of chunks){
              controller.enqueue(enc.encode(sse({ delta:c })));
              await new Promise(res=>setTimeout(res, 15));
            }
            controller.enqueue(enc.encode(sse({ done:true })));
            controller.close();
          }catch(e){
            controller.enqueue(enc.encode(sse({ error: String(e) })));
            controller.close();
          }
        }

        const ok = await tryStream();
        if (!ok) await fallback();
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
    return new Response(`data: ${JSON.stringify({ error:String(e) })}\n\n`, {
      status: 500,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
  }
}
