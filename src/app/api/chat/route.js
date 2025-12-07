import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. DEBUG: Check API Key Presence
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "DEBUG ERROR: GEMINI_API_KEY is undefined in Vercel. Please check Settings > Environment Variables." });
    }

    // 2. DEBUG: Skip complex context loading (Rule out file system errors)
    const preface = `
      You are Boluwatife Adeoye. 
      Role: Full-Stack Engineer.
      Tone: Professional and confident.
      Answer briefly.
    `;

    // 3. Parse Body
    let body = {};
    try { body = await req.json(); } catch (e) {
      return NextResponse.json({ reply: "DEBUG ERROR: Invalid JSON body sent from frontend." });
    }
    
    const history = Array.isArray(body?.messages) ? body.messages : [];
    const contents = [{ role: "user", parts: [{ text: preface }] }];

    for (const m of history) {
      const role = m.role === "assistant" ? "model" : "user";
      const text = String(m.content || "").slice(0, 8000);
      if (text) contents.push({ role, parts: [{ text }] });
    }

    // 4. Call Google API (Gemini 1.5 Flash)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const payload = {
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 500 },
    };

    const r = await fetch(url, { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(payload) 
    });

    const json = await r.json();

    // 5. DEBUG: Catch Google Errors
    if (!r.ok) {
      const googleError = json.error?.message || r.statusText;
      return NextResponse.json({ reply: `GOOGLE API ERROR: ${googleError}` });
    }

    const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      return NextResponse.json({ reply: "DEBUG ERROR: Google returned success but no text. Check safety filters." });
    }

    return NextResponse.json({ reply });

  } catch (error) {
    // 6. Catch Server Errors
    return NextResponse.json({ reply: `CRITICAL SERVER ERROR: ${error.message}` });
  }
}
