import { NextResponse } from "next/server";

const RATE = globalThis.__chatRate || (globalThis.__chatRate = new Map());
function rateLimit(ip, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const entry = RATE.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > windowMs) { entry.count = 0; entry.ts = now; }
  entry.count += 1; RATE.set(ip, entry);
  return entry.count <= limit;
}

let MODEL_CACHE = globalThis.__geminiModelCache || null;
globalThis.__geminiModelCache = MODEL_CACHE;

async function detectModel(apiKey) {
  if (MODEL_CACHE?.id) return MODEL_CACHE.id;
  const prefers = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const r = await fetch(url, { next: { revalidate: 300 } });
    if (!r.ok) throw new Error(`ListModels ${r.status}`);
    const data = await r.json();
    const models = Array.isArray(data?.models) ? data.models : [];
    const gens = models.filter(m => (m.supportedGenerationMethods || []).includes("generateContent"));
    const pick = gens.sort((a,b) => {
      const aw = /flash/i.test(a.name) ? (/-latest/i.test(a.name)?0:1) : 9;
      const bw = /flash/i.test(b.name) ? (/-latest/i.test(b.name)?0:1) : 9;
      return aw - bw;
    })[0] || gens[0];
    const raw = (pick?.name || prefers);
    const id  = raw.replace(/^models\//, "");
    MODEL_CACHE = { id };
    globalThis.__geminiModelCache = MODEL_CACHE;
    return id;
  } catch {
    const id = prefers.replace(/^models\//, "");
    MODEL_CACHE = { id };
    globalThis.__geminiModelCache = MODEL_CACHE;
    return id;
  }
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited", reply: "Too many messages, please wait a few seconds." }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "missing_key", reply: "Server is missing GEMINI_API_KEY." }, { status: 500 });
  }

  let body = {};
  try { body = await req.json(); } catch {}
  const history = Array.isArray(body?.messages) ? body.messages : [];

  // First-person persona and canonical info
  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || process.env.NEXT_PUBLIC_OWNER_NAME || "Boluwatife";
  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer.";
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng").replace(/\/+$/,'');
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";

  // Inject first-person instructions as the first "user" message
  const preface =
`You are ${name}. Speak in first person ("I", "my") at all times. Do not say you're an AI or an assistant.
Tone: warm, concise, professional.
- Canonical website: ${site}. Use only this domain in links; never mention other domains. Rewrite any link to ${site}.
- Contact: ${email}. When the user is ready, propose a short bullet summary (goals, scope, timeline, budget) and suggest sending it via "Send to Email" to ${email}.
- Topics: services, stack, projects, articles, videos, availability, ways to start, pricing ranges (only if asked).
- Formatting: short paragraphs and 3–6 bullet points where helpful. Use Markdown (bold, lists, links) for mobile.
- If unsure, say so briefly and point to a relevant page on ${site}.`;

  const contents = [{ role: "user", parts: [{ text: preface }] }];
  for (const m of history) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }
  if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  const modelId = await detectModel(apiKey);
  const version = process.env.GEMINI_API_VERSION || "v1";

  async function call(ver) {
    const url = `https://generativelanguage.googleapis.com/${ver}/models/${modelId}:generateContent?key=${apiKey}`;
    const payload = {
      contents,
      generationConfig: { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 768 },
    };
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const text = await r.text();
    let data = {};
    try { data = JSON.parse(text); } catch {}
    return { ok: r.ok, status: r.status, data, text };
  }

  let res = await call(version);
  if (!res.ok && res.status === 404 && version === "v1") {
    res = await call("v1beta");
  }

  if (!res.ok) {
    const brief = res.data?.error?.message || res.text?.slice(0, 400) || "Unknown error";
    return NextResponse.json({ error: "model_error", reply: `I couldn't reach Gemini: ${brief}` }, { status: res.status || 500 });
  }

  const parts = res.data?.candidates?.[0]?.content?.parts || [];
  const reply = parts.map(p => p.text).filter(Boolean).join("\n").trim();
  if (!reply) {
    const block = res.data?.promptFeedback?.blockReason;
    return NextResponse.json({ error: "empty", reply: `I couldn't answer that. ${block ? "Blocked: " + block : ""}` }, { status: 200 });
  }
  return NextResponse.json({ reply });
}
