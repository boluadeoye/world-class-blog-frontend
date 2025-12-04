import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. CONFIG CHECK
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });

    const { text, mode = "ghost", tone = "casual" } = await req.json();

    // 2. AUTO-DISCOVERY (Find a working model)
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);
    const listData = await listResp.json();
    
    const availableModels = listData.models || [];
    let selectedModel = "";
    
    // Priority: Flash > Pro (Flash is 'dumber' and thus writes more like a human naturally)
    const preferredOrder = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const pref of preferredOrder) {
      const match = availableModels.find((m: any) => m.name.includes(pref) && m.supportedGenerationMethods?.includes("generateContent"));
      if (match) { selectedModel = match.name; break; }
    }
    if (!selectedModel) selectedModel = availableModels[0]?.name;

    // 3. THE V5 "RE-VOICING" PROMPT
    // We stop asking for "rewrites". We ask for "retellings".
    const prompt = `
      TASK: You are a blunt, opinionated blogger. Read the input text, understand the core message, and then RETELL it in your own voice.
      
      CRITICAL RULES TO BEAT AI DETECTION:
      1. DESTROY THE STRUCTURE: Do not go sentence-by-sentence. Read the whole thing, then explain it from scratch.
      2. USE "BRIDGE PHRASES": Start sentences with: "Here's the thing," "Honestly," "Look," "Basically," "Truth is,".
      3. BE OPINIONATED: AI is neutral. You are not. Add tiny subjective comments like "(which is wild)" or "obviously."
      4. SIMPLIFY: Use 8th-grade reading level. No complex words like "utilize" or "facilitate." Use "use" and "help."
      5. CONTRACTIONS: Use "don't," "can't," "it's" everywhere. Never say "do not."
      
      TONE: ${tone} (Make it sound like a real person talking, not a robot writing).
      
      INPUT TEXT:
      "${text}"
      
      YOUR RETELLING (Text Only):
    `;

    // 4. EXECUTE WITH TUNED SETTINGS
    // Temperature 1.0 is the sweet spot. 1.15 was too high (caused confusion).
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.0,       // High randomness, but controlled
          topP: 0.95,             // Diverse vocabulary
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    });

    const genData = await genResp.json();
    
    if (!genResp.ok) {
      return NextResponse.json({ error: `Google Error: ${genData.error?.message}` }, { status: 500 });
    }

    const humanizedText = genData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!humanizedText) throw new Error("AI returned empty response.");

    return NextResponse.json({ 
      result: humanizedText,
      debug_model: selectedModel,
      debug_engine: "V5_REVOICER"
    });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
