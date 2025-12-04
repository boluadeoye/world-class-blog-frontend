import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });

    const { text, mode, tone } = await req.json();

    // AUTO-DISCOVERY
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);
    const listData = await listResp.json();
    const availableModels = listData.models || [];
    let selectedModel = "";
    const preferredOrder = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const pref of preferredOrder) {
      const match = availableModels.find((m: any) => m.name.includes(pref) && m.supportedGenerationMethods?.includes("generateContent"));
      if (match) { selectedModel = match.name; break; }
    }
    if (!selectedModel) selectedModel = availableModels[0]?.name;

    // --- THE SPLIT BRAIN LOGIC ---
    let prompt = "";

    if (mode === 'academic' || tone === 'professional') {
      // === ACADEMIC STEALTH PROTOCOL ===
      // No slang. No contractions. High complexity.
      prompt = `
        TASK: Rewrite the text for a Ph.D. or Undergraduate Research Project.
        GOAL: 100% Human Score on Turnitin/GPTZero, but maintain strict ACADEMIC FORMALITY.
        
        ACADEMIC RULES:
        1. NO CONTRACTIONS: Never use "don't", "can't", "it's". Use "do not", "cannot", "it is".
        2. NO SLANG: Do not use "Look," "Honestly," or "Basically."
        3. OBJECTIVE TONE: Third-person only. No "I think" or "In my opinion."
        
        STEALTH TACTICS (How to beat AI while being formal):
        1. INVERTED SENTENCES: Don't start every sentence with "The". Start with clauses: "While X suggests Y, Z remains..."
        2. DENSITY VARIATION: Write one very long, complex sentence (30+ words) followed by a short, direct assertion.
        3. SYNONYM SWAP: 
           - Instead of "utilize", use "employ".
           - Instead of "show", use "demonstrate" or "exhibit".
           - Instead of "important", use "significant" or "critical".
        4. REMOVE AI FLUFF: Delete "In conclusion," "Moreover," "It is important to note." Just state the facts.
        
        INPUT TEXT:
        "${text}"
        
        REWRITTEN ACADEMIC OUTPUT:
      `;
    } else {
      // === CASUAL/GHOST PROTOCOL (The V5 Engine) ===
      // Slang allowed. High voice.
      prompt = `
        TASK: Retell this text in a casual, opinionated human voice.
        GOAL: 0% AI Detection.
        
        RULES:
        1. USE "BRIDGE PHRASES": Start with "Look," "Honestly," "Here's the thing."
        2. CONTRACTIONS: Use "don't," "won't," "can't" everywhere.
        3. IMPERFECTION: Break grammar rules slightly. Use fragments.
        4. OPINION: Sound like a blogger, not a robot.
        
        INPUT TEXT:
        "${text}"
        
        REWRITTEN CASUAL OUTPUT:
      `;
    }

    // EXECUTE
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.0,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    });

    const genData = await genResp.json();
    if (!genResp.ok) return NextResponse.json({ error: `Google Error: ${genData.error?.message}` }, { status: 500 });

    const humanizedText = genData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!humanizedText) throw new Error("AI returned empty response.");

    return NextResponse.json({ result: humanizedText });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
