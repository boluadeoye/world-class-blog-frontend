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

    // 2. THE SELF-HEALING MODEL LIST
    // We try these in order. If one fails, we try the next.
    const candidateModels = [
      "gemini-1.5-flash-001", // Specific version (Often works when alias fails)
      "gemini-1.5-flash",     // Generic alias
      "gemini-pro"            // Legacy fallback (Reliable)
    ];

    for (const model of candidateModels) {
      console.log(`Attempting model: ${model}...`);
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

      // If error is NOT "Not Found", it's a real error (like safety), so stop.
      // If error IS "Not Found", loop to the next model.
      const errorMessage = json.error?.message || "";
      if (!errorMessage.includes("not found") && !errorMessage.includes("not supported")) {
        return NextResponse.json({ reply: `AI Error (${model}): ${errorMessage}` });
      }
    }

    // 3. IF ALL FAIL
    return NextResponse.json({ reply: "System Error: No available AI models found for this API Key." });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ reply: "Connection error. Please try again." });
  }
}
