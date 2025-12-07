import { NextResponse } from "next/server";
import { getSystemContext } from "../../../lib/aiContext";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "System Error: GEMINI_API_KEY is missing." });
    }

    // 1. PREPARE CONTEXT
    let body = {};
    try { body = await req.json(); } catch {}
    const history = Array.isArray(body?.messages) ? body.messages : [];
    
    let dynamicContext = "";
    try { dynamicContext = await getSystemContext(); } catch {}

    const preface = `
      You are Boluwatife Adeoye.
      Role: Full-Stack Engineer.
      Tone: Professional, confident, concise.
      ${dynamicContext}
    `;

    const contents = [{ role: "user", parts: [{ text: preface }] }];
    for (const m of history) {
      const role = m.role === "assistant" ? "model" : "user";
      const text = String(m.content || "").slice(0, 8000);
      if (text) contents.push({ role, parts: [{ text }] });
    }
    if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Hello!" }] });

    // 2. THE "UNKILLABLE" MODEL LIST (Based on your Diagnostic)
    // The code will try these in order until one works.
    const candidateModels = [
      "gemini-2.0-flash",       // PRIORITY 1: Fast, Modern, Stable
      "gemini-2.5-flash",       // PRIORITY 2: Cutting Edge
      "gemini-flash-latest",    // PRIORITY 3: Generic Alias (Safe Fallback)
      "gemini-2.0-pro-exp-02-05", // PRIORITY 4: High Intelligence
      "gemini-pro-latest"       // PRIORITY 5: Old Reliable
    ];

    for (const model of candidateModels) {
      // console.log(`Attempting connection to: ${model}...`); // Uncomment for local debugging
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      const r = await fetch(url, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ contents }) 
      });

      const json = await r.json();

      if (r.ok) {
        // SUCCESS! We found a working model.
        const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
        return NextResponse.json({ reply: reply || "..." });
      }

      // If the error is "Not Found", we continue to the next model in the list.
      // If it's a safety filter or other error, we might want to stop, but for robustness, we keep trying.
      const errorMessage = json.error?.message || "";
      // Only stop if it's a critical API Key error (which means no model will work)
      if (errorMessage.includes("API key not valid")) {
        return NextResponse.json({ reply: "System Error: API Key is invalid." });
      }
    }

    // 3. IF ALL FAIL
    return NextResponse.json({ reply: "System Error: All AI models are currently unreachable. Please try again later." });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ reply: "Connection error. Please try again." });
  }
}
