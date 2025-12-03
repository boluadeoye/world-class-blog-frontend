export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_KEY = process.env.GEMINI_API_KEY;
const RAW_MODEL = (process.env.GEMINI_MODEL || "").trim();
const MODEL = /^gemini-/.test(RAW_MODEL) ? RAW_MODEL : "gemini-1.5-flash-latest";

export async function GET() {
  try {
    if (!API_KEY) return new Response(JSON.stringify({ ok:false, error:"Missing GEMINI_API_KEY" }), { status:500, headers:{ "Content-Type":"application/json" }});

    const persona = "You are Boluwatife’s PA. Reply in one short sentence.";
    const contents = [
      { role:"user", parts:[{ text: persona }] },
      { role:"user", parts:[{ text: "Say hello." }] }
    ];
    const payload = { contents, generationConfig:{ temperature:0.2, maxOutputTokens:128 } };

    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    const text = await r.text();
    if (!r.ok) {
      return new Response(JSON.stringify({ ok:false, status:r.status, error:text.slice(0,400) }), { status:500, headers:{ "Content-Type":"application/json" }});
    }
    let data = {};
    try { data = JSON.parse(text); } catch { data = { raw:text }; }
    const reply = (data?.candidates?.[0]?.content?.parts || []).map(p=>p.text||"").join("").trim();
    return new Response(JSON.stringify({ ok:true, model:MODEL, reply }), { status:200, headers:{ "Content-Type":"application/json" }});
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:String(e) }), { status:500, headers:{ "Content-Type":"application/json" }});
  }
}
