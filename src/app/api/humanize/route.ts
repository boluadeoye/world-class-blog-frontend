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

    // --- THE V6 PROMPT LOGIC ---
    let prompt = "";

    if (mode === 'academic' || tone === 'professional') {
      // === ACADEMIC SCRAMBLER (The "Tenured Professor" Protocol) ===
      // Goal: High complexity, zero "AI Fluff".
      prompt = `
        TASK: Rewrite the following text for a high-level Academic Research Paper.
        GOAL: Bypass AI detection by using "Syntactic Complexity."
        
        STRICT ACADEMIC RULES:
        1. BANISH TRANSITIONS: Do NOT use "Moreover," "Furthermore," "In conclusion," "Additionally," or "It is important to note." These are dead giveaways.
        2. SENTENCE FUSION: AI writes short, choppy sentences. You must combine them. Use semi-colons (;) and em-dashes (—) to link related ideas into single, dense sentences.
        3. INVERTED STRUCTURE: Do not start sentences with the subject. Start with a dependent clause. 
           (Bad: "The data shows X." -> Good: "Given the prevalence of X in the dataset, it becomes clear that...")
        4. VOCABULARY: Use precise, concrete verbs. Avoid "utilize" (use "deploy"), avoid "show" (use "indicate").
        5. VOICE: Active voice only. (Bad: "Mistakes were made." -> Good: "The study identifies errors.")
        
        INPUT TEXT:
        "${text}"
        
        REWRITTEN ACADEMIC OUTPUT:
      `;
    } else {
      // === CASUAL/GHOST PROTOCOL (Unchanged - it works) ===
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

    // EXECUTE WITH HIGH TEMPERATURE (1.1)
    // We need high randomness even for academic text to break the "average" patterns.
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.1,
          topP: 0.98,
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
