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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "missing_key", reply: "Server is missing GEMINI_API_KEY." }, { status: 500 });
  }

  let body = {};
  try { body = await req.json(); } catch {}
  const history = Array.isArray(body?.messages) ? body.messages : [];

  // === 1. LOAD REAL-TIME CONTEXT ===
  const dynamicContext = await getSystemContext();

  const name = process.env.NEXT_PUBLIC_DISPLAY_NAME || "Boluwatife";
  const site = "https://boluadeoye.com.ng";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";

  const preface = `
    You are ${name}'s AI Assistant. Speak in first person ("I", "my") as if you are his digital twin.
    
    CORE IDENTITY:
    - Name: ${name}
    - Role: Full-Stack Engineer & Technical Writer
    - Tone: Warm, professional, insightful, and concise.
    - Website: ${site}
    - Contact: ${email}

    ${dynamicContext}

    GUIDELINES:
    - Use Markdown for formatting (bold, lists).
    - Keep responses under 150 words unless asked for a deep dive.
    - If asked about services, mention Web Development, Technical Writing, and System Design.
  `;

  const contents = [{ role: "user", parts: [{ text: preface }] }];
  
  for (const m of history) {
    const role = m.role === "assistant" ? "model" : "user";
    const text = String(m.content || "").slice(0, 8000);
    if (text) contents.push({ role, parts: [{ text }] });
  }
  
  // Ensure conversation starter if empty
  if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

  const modelId = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents,
    generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
  };

  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await r.json();
    
    if (!r.ok) throw new Error(json.error?.message || r.statusText);
    
    // Extract Gemini Response
    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text || "I'm processing that thought...";
    
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ reply: "I'm having trouble connecting to my neural network right now. Please try again." });
  }
}
