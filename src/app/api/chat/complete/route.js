export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

function buildPersona(mode, site, email){
  const base = `You are Boluwatife’s personal assistant (PA). Speak as the assistant (“I”), on his behalf. Help across business, technology, AI, APIs, light troubleshooting, and writing — concise, warm, and practical.
- Canonical website: ${site} (never vercel.app).
- Contact: ${email}. If the user wants to proceed, suggest sending a short brief and offer to email a summary to ${email}.
- Never claim to be Boluwatife; you are his PA. Use “Boluwatife” or “my client” when needed.
- Use Markdown; short mobile‑friendly paragraphs.`;
  const modes = {
    inquiry: "Mode: Project inquiry. Ask 3–6 scoping questions, then propose next steps.",
    advice: "Mode: Advice. Give clear, structured guidance with bullets and brief examples.",
    troubleshoot: "Mode: Troubleshooting. Root‑cause candidates, step‑by‑step checks/commands, fallback plan.",
    writing: "Mode: Writing. Outline first, then a crisp draft, then a brief polish checklist."
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

export async function POST(req){
  try{
    if (!API_KEY) return new Response(JSON.stringify({ error:"Missing GEMINI_API_KEY" }), { status:500, headers:{ "Content-Type":"application/json" }});
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

    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) {
      const txt = await r.text();
      return new Response(JSON.stringify({ error:`Model error ${r.status}: ${txt.slice(0,400)}` }), { status:500, headers:{ "Content-Type":"application/json" }});
    }
    const data = await r.json();
    const reply = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("").trim() || "I couldn't generate a reply.";
    return new Response(JSON.stringify({ reply, model: MODEL }), { status:200, headers:{ "Content-Type":"application/json" }});
  }catch(e){
    return new Response(JSON.stringify({ error:String(e) }), { status:500, headers:{ "Content-Type":"application/json" }});
  }
}
