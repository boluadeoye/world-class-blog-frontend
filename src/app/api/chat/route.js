import { NextResponse } from "next/server";
import { getSystemContext } from "../../../lib/aiContext";

export async function POST(req) {
  try {
    // 1. Get Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "System Error: GEMINI_API_KEY is missing in Vercel." });
    }

    // 2. Parse Input
    let body = {};
    try { body = await req.json(); } catch {}
    const history = Array.isArray(body?.messages) ? body.messages : [];

    // 3. Build Context
    let dynamicContext = "";
    try { dynamicContext = await getSystemContext(); } catch {}

    const preface = `
      You are Boluwatife Adeoye.
      Role: Full-Stack Engineer.
      Tone: Professional, confident.
      ${dynamicContext}
    `;

    const contents = [{ role: "user", parts: [{ text: preface }] }];
    for (const m of history) {
      const role = m.role === "assistant" ? "model" : "user";
      const text = String(m.content || "").slice(0, 8000);
      if (text) contents.push({ role, parts: [{ text }] });
    }
    if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

    // 4. Call Google (Stable Model)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const r = await fetch(url, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ contents }) 
    });

    const json = await r.json();

    if (!r.ok) {
      const err = json.error?.message || "Unknown Error";
      console.error("Google API Error:", err);
      return NextResponse.json({ reply: `AI Error: ${err}` });
    }

    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
    return NextResponse.json({ reply: reply || "..." });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ reply: "Connection error. Please try again." });
  }
}
