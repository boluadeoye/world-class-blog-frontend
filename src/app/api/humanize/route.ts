import { NextResponse } from "next/server";

// --- V3 CONFIGURATION ---
// Expanded list of words that trigger AI detectors immediately.
const FORBIDDEN_WORDS = [
  "delve", "crucial", "tapestry", "landscape", "moreover", "in conclusion", 
  "underscores", "testament", "realm", "dynamic", "foster", "utilize",
  "meticulous", "navigating", "ever-evolving", "game-changer", "notably"
];

export async function POST(req: Request) {
  try {
    // 1. CONFIG CHECK
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });

    const { text, mode = "ghost", tone = "professional" } = await req.json();

    // 2. AUTO-DISCOVERY (Find a working model)
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);
    const listData = await listResp.json();
    
    const availableModels = listData.models || [];
    let selectedModel = "";
    
    // Priority: Flash > Pro (Flash is actually better for 'dumb/human' writing than Pro)
    const preferredOrder = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const pref of preferredOrder) {
      const match = availableModels.find((m: any) => m.name.includes(pref) && m.supportedGenerationMethods?.includes("generateContent"));
      if (match) { selectedModel = match.name; break; }
    }
    if (!selectedModel) selectedModel = availableModels[0]?.name;

    if (!selectedModel) return NextResponse.json({ error: "No models available." }, { status: 500 });

    // 3. THE V3 "CHAOS" PROMPT
    // We explicitly instruct it to break grammatical symmetry.
    const prompt = `
      ROLE: You are a text forensics expert and ghostwriter.
      GOAL: Rewrite the input text to score 0% on AI Detection (GPTZero, Originality.ai).
      
      CRITICAL INSTRUCTIONS (The "Human" Algorithm):
      1. TEMPERATURE SPIKE: Do not write predictably. Choose the 3rd or 4th most likely word, not the 1st.
      2. SENTENCE VARIANCE: 
         - Write a sentence with 4 words.
         - Follow it with a sentence of 25+ words that uses multiple commas.
         - Then a fragment. Like this.
      3. BANNED VOCABULARY: Never use these words: ${FORBIDDEN_WORDS.join(", ")}.
      4. IMPERFECTIONS: AI is too perfect. Add "human noise". Use contractions (it's, don't). Start sentences with conjunctions (But, And, So).
      5. STRUCTURE: Destroy the original structure. If it had bullet points, turn them into a messy paragraph.
      
      TONE SETTING: ${tone}
      INTENSITY: ${mode === 'ghost' ? 'MAXIMUM (Aggressive Rewriting)' : 'Standard'}
      
      INPUT TEXT:
      "${text}"
      
      REWRITTEN OUTPUT (Text Only):
    `;

    // 4. EXECUTE WITH HIGH TEMPERATURE
    // This is the secret sauce. Temperature 1.0 forces high perplexity.
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 1.0,       // MAX RANDOMNESS (Standard is 0.7)
          topP: 0.95,             // Wide vocabulary search
          topK: 64,               // Consider more word options
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
      debug_mode: "V3_CHAOS_ENGINE"
    });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
