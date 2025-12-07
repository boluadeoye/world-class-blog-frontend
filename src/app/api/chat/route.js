import { NextResponse } from "next/server";
import { getSystemPrompt } from "../../../lib/brain";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: "System Error: Neural Link Severed (Missing Key)." });

    // 1. LOAD THE BRAIN
    const brainData = getSystemPrompt();

    // 2. PARSE INPUT
    let body = {};
    try { body = await req.json(); } catch {}
    const history = Array.isArray(body?.messages) ? body.messages : [];

    // 3. CONSTRUCT THE NEURAL PATHWAY
    const preface = `
      SYSTEM IDENTITY:
      ${brainData}
      
      CURRENT OBJECTIVE:
      Engage with the visitor as the sophisticated digital architect of this platform.
    `;

    const contents = [{ role: "user", parts: [{ text: preface }] }];
    for (const m of history) {
      const role = m.role === "assistant" ? "model" : "user";
      const text = String(m.content || "").slice(0, 8000);
      if (text) contents.push({ role, parts: [{ text }] });
    }
    if (contents.length === 1) contents.push({ role: "user", parts: [{ text: "Initialize connection." }] });

    // 4. EXECUTE MODEL (Unkillable List)
    const candidateModels = [
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-flash-latest",
      "gemini-pro"
    ];

    for (const model of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const r = await fetch(url, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ contents }) 
      });

      const json = await r.json();
      if (r.ok) {
        const reply = json.candidates?.[0]?.content?.parts?.[0]?.text;
        return NextResponse.json({ reply: reply || "Signal received, but data is empty." });
      }
    }

    return NextResponse.json({ reply: "Neural Network Unreachable. All models offline." });

  } catch (error) {
    return NextResponse.json({ reply: "Critical System Failure." });
  }
}
