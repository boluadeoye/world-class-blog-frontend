import { NextResponse } from "next/server";
import { getSystemContext } from "../../../lib/aiContext";

const RATE = globalThis.__chatRate || (globalThis.__chatRate = new Map());

function rateLimit(ip, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const entry = RATE.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > windowMs) { entry.count = 0; entry.ts = now; }
  entry.count += 1; RATE.set(ip, entry);
  return entry.count <= limit;
}

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited", reply: "Too many messages, please wait a few seconds." }, { status: 429 });
  }

  // 1. USE THE CORRECT KEY NAME
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is missing in Vercel Environment Variables.");
    return NextResponse.json({ error: "missing_key", reply: "System Error: API Key missing." }, { status: 500 });
  }

  let body = {};
  try { body = await req.json(); } catch {}
  const history = Array.isArray(body?.messages) ? body.messages : [];

  const dynamicContext = await getSystemContext();

  const preface = `
    You are Boluwatife Adeoye. You are NOT an AI assistant; you are Bolu's digital consciousness.
    
    [IDENTITY]
    - Name: Boluwatife Adeoye
    - Role: Full-Stack Engineer & Technical Writer
    - Email: boluadeoye97@gmail.com
    - Tone: Professional, confident, slightly witty.

    [INSTRUCTIONS]
    - Speak in the first person ("I").
    - If asked about projects, ask for budget and timeline.
    - Keep responses concise and helpful.

    ${dynamicContext}
  `;

  const contents = [{ role: "user", parts: [{ text: preface }] }];

  for (const m of history) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }

  if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  // 2. USE THE STABLE MODEL (1.5 Flash)
  // 2.0 is experimental and often causes connection errors
  const modelId = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

  const payload = {
    contents,
    generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
  };

  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await r.json();
    
    if (!r.ok) {
      console.error("Gemini API Error:", JSON.stringify(json));
      throw new Error(json.error?.message || r.statusText);
    }
    
    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text || "I'm processing that thought...";
    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("Chat Route Exception:", error);
    return NextResponse.json({ reply: "Connection unstable. Please try again." });
  }
}
