import { NextResponse } from "next/server";

// FIX: Hardcoded stable model and v1beta
const MODEL = "gemini-2.0-flash";

export async function POST(req) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return NextResponse.json({ error: "No API Key" }, { status: 500 });

  try {
    const { messages } = await req.json();
    // Simple completion logic
    const history = Array.isArray(messages) ? messages : [];
    const last = history[history.length - 1]?.content || "";
    
    // FIX: Force v1beta
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: "Complete this sentence: " + last }] }],
      generationConfig: { maxOutputTokens: 100 }
    };

    const r = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
    const data = await r.json();
    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
