import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. GET API KEY
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });
    }

    const { text } = await req.json();

    // 2. AUTO-DISCOVERY: Ask Google what models are available
    // This prevents 404 errors by only using models that actually exist for your key.
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);
    const listData = await listResp.json();

    if (!listResp.ok) {
      return NextResponse.json({ error: `Failed to list models: ${listData.error?.message}` }, { status: 500 });
    }

    // 3. SELECT THE BEST AVAILABLE MODEL
    // We look for models that support 'generateContent'.
    // Priority: Flash > Pro > 1.0
    const availableModels = listData.models || [];
    
    let selectedModel = "";
    
    // Strategy: Find the first model that is NOT experimental (to avoid 429s) and is "Gemini"
    const preferredOrder = [
      "gemini-1.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro"
    ];

    // Try to find a preferred match
    for (const pref of preferredOrder) {
      const match = availableModels.find((m: any) => m.name.includes(pref) && m.supportedGenerationMethods?.includes("generateContent"));
      if (match) {
        selectedModel = match.name; // e.g., "models/gemini-1.5-flash-001"
        break;
      }
    }

    // Fallback: Just take the first available "gemini" model if no preferred match found
    if (!selectedModel) {
      const fallback = availableModels.find((m: any) => m.name.includes("gemini") && m.supportedGenerationMethods?.includes("generateContent"));
      if (fallback) selectedModel = fallback.name;
    }

    if (!selectedModel) {
      return NextResponse.json({ error: "No compatible Gemini models found for this API key." }, { status: 500 });
    }

    console.log(`Auto-Selected Model: ${selectedModel}`);

    // 4. GENERATE CONTENT USING THE FOUND MODEL
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const prompt = `
      Act as a professional ghostwriter. Rewrite the text below to be 100% undetectable by AI detectors.
      
      Strict Rules:
      1. BURSTINESS: Vary sentence length aggressively. Use a 3-word sentence. Then a 25-word sentence.
      2. VOCABULARY: Remove all "AI words" (e.g., "delve", "crucial", "tapestry", "landscape", "moreover", "in conclusion").
      3. IMPERFECTION: Add slight conversational nuances. Start sentences with "Look," or "Honestly,".
      4. STRUCTURE: No bullet points. No headers. Just raw, flowing text.
      
      Input Text:
      "${text}"
      
      Rewritten Output:
    `;

    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const genData = await genResp.json();

    if (!genResp.ok) {
      return NextResponse.json({ error: `Generation Error (${selectedModel}): ${genData.error?.message}` }, { status: 500 });
    }

    const humanizedText = genData.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ 
      result: humanizedText,
      debug_model: selectedModel
    });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
