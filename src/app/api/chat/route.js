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

/** Fetch available models once and pick a working one for generateContent */
async function detectModel(apiKey) {
  if (MODEL_CACHE?.id) return MODEL_CACHE.id;
  const prefers = process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";
  // v1 is the recommended endpoint now
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const r = await fetch(url, { next: { revalidate: 300 } });
    if (!r.ok) throw new Error(`ListModels ${r.status}`);
    const data = await r.json();
    const models = Array.isArray(data?.models) ? data.models : [];
    const gens = models.filter(m => (m.supportedGenerationMethods || []).includes("generateContent"));
    // Prioritize flash -> flash-latest -> 1.5 -> 2.0, else first generative model
    const pick = gens.sort((a,b) => {
      const aw = /flash/i.test(a.name) ? (/-latest/i.test(a.name)?0:1) : 9;
      const bw = /flash/i.test(b.name) ? (/-latest/i.test(b.name)?0:1) : 9;
      return aw - bw;
    })[0] || gens[0];
    const raw = (pick?.name || prefers); // e.g. "models/gemini-1.5-flash-latest"
    const id = raw.replace(/^models\//, "");
    MODEL_CACHE = { id };
    globalThis.__geminiModelCache = MODEL_CACHE;
    return id;
  } catch {
    // fallback to preferred id if listing fails
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
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer.";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng";

  const systemText =
`You are an assistant for ${name} (${tagline}).
Answer questions about his work, projects, blog posts, videos, stacks, and services.
Style: concise, clear, helpful. Prefer short paragraphs and bullets. Mobile-first formatting.
If unsure, say you don't know and suggest where to look on ${site}. Avoid inventing details.`;

  const contents = [];
  for (const m of messages) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }
  if (contents.length === 0) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  const modelId = await detectModel(apiKey); // e.g. "gemini-1.5-flash-latest"
  const version = process.env.GEMINI_API_VERSION || "v1";
  const url = `https://generativelanguage.googleapis.com/${version}/models/${modelId}:generateContent?key=${apiKey}`;

  const payload = {
    systemInstruction: { role: "user", parts: [{ text: systemText }] },
    contents,
    generationConfig: {
      temperature: 0.6,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 768,
    },
    // Omit safetySettings to avoid enum mismatches across regions/versions.
  };

  try {
    let r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // If v1 fails with not-found, try v1beta transparently
    if (!r.ok && r.status === 404 && (!version || version === "v1")) {
      const urlBeta = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
      r = await fetch(urlBeta, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }

    const textBody = await r.text();
    let data = {};
    try { data = JSON.parse(textBody); } catch {}

    if (!r.ok) {
      const brief = data?.error?.message || textBody.slice(0, 400);
      return NextResponse.json({ error: "model_error", reply: `I couldn't reach Gemini: ${brief}` }, { status: r.status || 500 });
    }

    const parts = data?.candidates?.[0]?.content?.parts || [];
    const reply = parts.map(p => p.text).filter(Boolean).join("\n").trim();
    if (!reply) {
      const block = data?.promptFeedback?.blockReason;
      return NextResponse.json({ error: "empty", reply: `I couldn't answer that. ${block ? "Blocked: "+block : ""}` }, { status: 200 });
    }
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ error: "fetch_failed", reply: `Network error: ${String(e).slice(0, 200)}` }, { status: 500 });
  }
}
