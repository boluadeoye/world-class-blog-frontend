import { NextResponse } from "next/server";

const bucket = globalThis.__chatRate || (globalThis.__chatRate = new Map());
function rateLimit(ip, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const entry = bucket.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > windowMs) { entry.count = 0; entry.ts = now; }
  entry.count += 1; bucket.set(ip, entry);
  return entry.count <= limit;
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

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Use camelCase and a safe category set. If the API still rejects, we retry without safetySettings.
  const basePayload = {
    systemInstruction: { role: "user", parts: [{ text: systemText }] },
    contents,
    generationConfig: {
      temperature: 0.6,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 768,
    },
  };

  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    // Some regions/models reject older enum names; try the generic "HARM_CATEGORY_SEXUAL"
    { category: "HARM_CATEGORY_SEXUAL",            threshold: "BLOCK_ONLY_HIGH" },
  ];

  async function call(payload) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const textBody = await r.text();
    let data = {};
    try { data = JSON.parse(textBody); } catch {}
    return { ok: r.ok, status: r.status, data, text: textBody };
  }

  // First attempt: with safetySettings
  let { ok, status, data, text } = await call({ ...basePayload, safetySettings });

  // If invalid-argument complains about safety settings, retry without them
  if (!ok && status === 400) {
    const msg = data?.error?.message || text;
    if (/safety[_-]?settings/i.test(msg) || /HarmCategory/i.test(msg)) {
      ({ ok, status, data, text } = await call(basePayload));
    }
  }

  if (!ok) {
    const brief = data?.error?.message || text.slice(0, 400);
    return NextResponse.json({ error: "model_error", reply: `I couldn't reach Gemini: ${brief}` }, { status: 500 });
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const reply = parts.map(p => p.text).filter(Boolean).join("\n").trim();
  if (!reply) {
    const block = data?.promptFeedback?.blockReason;
    const note = block ? `Blocked: ${block}` : "No text in response.";
    return NextResponse.json({ error: "empty", reply: `I couldn't answer that. ${note}` }, { status: 200 });
  }

  return NextResponse.json({ reply });
}
