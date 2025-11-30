import { NextResponse } from "next/server";

// simple in-memory rate limit (per runtime instance)
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
    return NextResponse.json({ error: "Rate limit" }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  let body;
  try { body = await req.json(); } catch { body = {}; }
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  // Personalization from env
  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || process.env.NEXT_PUBLIC_OWNER_NAME || "Adeoye Boluwatife";
  const tagline = process.env.NEXT_PUBLIC_OWNER_TAGLINE || "Full‑stack developer & writer.";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://boluadeoye.com.ng";

  const systemPrompt =
`You are an assistant for ${name} (${tagline}). 
Answer questions about his work, projects, blog posts, videos, and approach.
Tone: concise, clear, helpful, positive. Mobile-friendly responses. 
Use short paragraphs and bullets where useful. 
If asked for private info or anything you don't know, say you don't know and suggest where on ${site} to look.`;

  // Convert chat history to Gemini "contents"
  const contents = [];
  for (const m of messages) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }
  // If no conversation yet, seed with a brief user question to start context
  if (!contents.length) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  // Gemini REST call
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const payload = {
    systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.65,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 768,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUAL_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json({ error: "model_error", detail: t.slice(0, 2000) }, { status: 500 });
    }
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") || "I couldn't generate a reply.";
    return NextResponse.json({ reply: text });
  } catch (e) {
    return NextResponse.json({ error: "fetch_failed", detail: String(e).slice(0, 1000) }, { status: 500 });
  }
}
