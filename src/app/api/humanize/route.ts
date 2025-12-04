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

    // --- THE V7 ADVERSARIAL PROMPT ---
    // We inject the User's research directly into the prompt.
    let prompt = "";

    if (mode === 'academic' || tone === 'professional') {
      // === ACADEMIC BURSTINESS PROTOCOL ===
      prompt = `
        ROLE: You are an adversarial AI expert. Your goal is to rewrite text to bypass AI detectors (like GPTZero).
        
        THEORY OF MIND (How Detectors Work):
        1. PERPLEXITY: Detectors flag text that is "predictable." You must be "surprising."
        2. BURSTINESS: Detectors flag text with uniform sentence lengths. You must create "bursts" of variation.
        
        TASK: Rewrite the input text for an Academic/Professional context, but MAXIMIZE Perplexity and Burstiness.
        
        TACTICS FOR ACADEMIC STEALTH:
        1. SENTENCE VARIANCE (Critical): 
           - Write a 5-word sentence. 
           - Follow it with a 35-word sentence containing multiple clauses.
           - Follow that with a 10-word sentence.
           - NEVER write three sentences of similar length in a row.
        2. VOCABULARY: Use specific, rare domain terminology. Avoid generic words like "utilize," "foster," "crucial," "landscape."
        3. STRUCTURE: 
           - Remove all "signposting" words (Moreover, Furthermore, In conclusion).
           - Use Active Voice (e.g., "We analyzed the data" NOT "The data was analyzed").
           - Use mid-sentence interruptions (e.g., "The data—while initially promising—failed to...").
        
        INPUT TEXT:
        "${text}"
        
        REWRITTEN OUTPUT (High Burstiness, High Perplexity):
      `;
    } else {
      // === CASUAL CHAOS PROTOCOL ===
      prompt = `
        TASK: Rewrite this text to score 0% on AI detection.
        STRATEGY: Maximize "Burstiness" (sentence length variation) and "Perplexity" (unpredictable words).
        
        TACTICS:
        1. Write like a human talking fast. Use fragments. Run-on sentences. Then a short stop.
        2. Use "Bridge Phrases": "Look," "Honestly," "Here's the deal."
        3. Be opinionated. AI is neutral; humans are biased.
        4. Use contractions (don't, can't, won't).
        
        INPUT TEXT:
        "${text}"
        
        REWRITTEN OUTPUT:
      `;
    }

    // EXECUTE WITH HIGH TEMPERATURE (1.1)
    // High temperature increases Perplexity (unpredictability).
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.1,
          topP: 0.99,
          topK: 64,
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
