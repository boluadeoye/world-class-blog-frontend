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
  // FIX: Use specific stable model version
  const prefers = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  // FIX: Use v1beta for discovery
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  try {
    const r = await fetch(url, { next: { revalidate: 300 } });
    if (!r.ok) throw new Error(`ListModels ${r.status}`);
    const data = await r.json();
    const models = Array.isArray(data?.models) ? data.models : [];
    const gens = models.filter(m => (m.supportedGenerationMethods || []).includes("generateContent"));
    
    // Try to find the preferred model in the list, otherwise fallback
    const pick = gens.find(m => m.name.includes(prefers)) || gens[0];
    
    const raw = (pick?.name || prefers);
    const id = raw.replace(/^models\//, "");
    MODEL_CACHE = { id };
    globalThis.__geminiModelCache = MODEL_CACHE;
    return id;
  } catch (e) {
    // Fallback if listing fails
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

  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || process.env.NEXT_PUBLIC_OWNER_NAME || "Boluwatife";
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng").replace(/\/+$/,'');
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";

  const preface = 
`You are ${name}. Speak in first person ("I", "my") at all times. Do not say you're an AI.
Tone: warm, concise, professional.
- Canonical website: ${site}. Use only this domain in links.
- Contact: ${email}. When appropriate, suggest sending a summary to this email.
- Topics: services, stack, projects, articles.
- Formatting: short paragraphs, Markdown bullets.`;

  const contents = [{ role: "user", parts: [{ text: preface }] }];
  for (const m of history) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }
  if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  const modelId = await detectModel(apiKey);
  // FIX: Default to v1beta
  const version = "v1beta";

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
  return NextResponse.json(res.ok ? res.data : { error: res.status, text: res.text }, { status: res.ok ? 200 : res.status });
}
