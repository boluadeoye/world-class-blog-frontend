import { NextResponse } from "next/server";
import { getSystemContext } from "../../../lib/aiContext";

// Rate Limiter (Keeps your bill $0)
const RATE = globalThis.__chatRate || (globalThis.__chatRate = new Map());
function rateLimit(ip, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const entry = RATE.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > windowMs) { entry.count = 0; entry.ts = now; }
  entry.count += 1; RATE.set(ip, entry);
  return entry.count <= limit;
}

export async function POST(req) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
    if (!rateLimit(ip)) {
      return NextResponse.json({ reply: "I'm getting too many messages right now. Give me a minute." }, { status: 429 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "System Error: API Key is missing in Vercel Settings." });
    }

    // 1. LOAD PERSONA (The "Bolu" Identity)
    let dynamicContext = "";
    try {
      dynamicContext = await getSystemContext();
    } catch (e) {
      console.error("Context Error:", e);
      dynamicContext = "Focus on Full-Stack Development.";
    }

    const preface = `
      You are Boluwatife Adeoye. You are NOT an AI assistant; you are Bolu's digital consciousness.
      
      [YOUR IDENTITY]
      - Name: Boluwatife Adeoye
      - Role: Full-Stack Engineer & Technical Writer
      - Email: boluadeoye97@gmail.com
      - Tone: Professional, confident, slightly witty, and business-oriented.

      [BUSINESS PROTOCOL]
      - If the user wants to build a website, app, or project:
        1. Speak as Bolu ("I can build that", "My stack is...").
        2. Ask clarifying questions (Budget, Timeline, Tech Stack).
        3. END by asking them to email you.

      ${dynamicContext}
    `;

    // 2. PARSE REQUEST
    let body = {};
    try { body = await req.json(); } catch {}
    const history = Array.isArray(body?.messages) ? body.messages : [];

    const contents = [{ role: "user", parts: [{ text: preface }] }];

    for (const m of history) {
      const role = m.role === "assistant" ? "model" : "user";
      const text = String(m.content || "").slice(0, 8000);
      if (text) contents.push({ role, parts: [{ text }] });
    }

    if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

    // 3. FIX: USE 'gemini-1.5-flash-latest' (Resolves "Not Found" errors)
    const modelId = "gemini-1.5-flash-latest";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    const payload = {
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    };

    // 4. CALL GOOGLE
    const r = await fetch(url, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(payload) 
    });

    const json = await r.json();

    if (!r.ok) {
      // Fallback: If 1.5 Flash fails, try the legacy 'gemini-pro' automatically
      if (json.error?.message?.includes("not found")) {
        console.log("Switching to fallback model...");
        const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        const r2 = await fetch(fallbackUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const json2 = await r2.json();
        const reply2 = json2.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply2) return NextResponse.json({ reply: reply2 });
      }
      
      return NextResponse.json({ reply: `Google Error: ${json.error?.message || "Unknown"}` });
    }

    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ reply: reply || "I'm thinking..." });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ reply: "My connection is unstable right now. Please try again in a moment." });
  }
}
