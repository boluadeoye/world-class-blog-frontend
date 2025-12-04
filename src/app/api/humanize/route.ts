import { NextResponse } from "next/server";

// --- THE STEALTH CONFIGURATION ---
const FORBIDDEN_WORDS = [
  "delve", "crucial", "tapestry", "landscape", "moreover", "in conclusion", 
  "underscores", "testament", "realm", "dynamic", "foster", "utilize"
];

const MODES = {
  "standard": "Balance between readability and humanization.",
  "ghost": "MAXIMUM STEALTH. Aggressively change sentence structure. Use idioms. Intentionally imperfect grammar if needed.",
  "academic": "High-level vocabulary, but varied sentence length. Avoid repetitive transition words.",
  "casual": "Conversational, blog-style. Use contractions (don't, can't). Sound opinionated."
};

export async function POST(req: Request) {
  try {
    // 1. CONFIG CHECK
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });

    // 2. PARSE REQUEST (Now accepts 'mode' and 'tone')
    const { text, mode = "ghost", tone = "professional" } = await req.json();

    // 3. AUTO-DISCOVERY (Keep this, it works)
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);
    const listData = await listResp.json();
    
    const availableModels = listData.models || [];
    let selectedModel = "";
    
    // Priority: Flash > Pro
    const preferredOrder = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const pref of preferredOrder) {
      const match = availableModels.find((m: any) => m.name.includes(pref) && m.supportedGenerationMethods?.includes("generateContent"));
      if (match) { selectedModel = match.name; break; }
    }
    if (!selectedModel) selectedModel = availableModels[0]?.name; // Fallback

    if (!selectedModel) return NextResponse.json({ error: "No models available." }, { status: 500 });

    // 4. THE ADVANCED PROMPT ENGINEERING
    const prompt = `
      ROLE: You are a professional ghostwriter and text forensics expert.
      GOAL: Rewrite the input text to bypass AI detection algorithms (like GPTZero, Turnitin).
      
      CONFIGURATION:
      - MODE: ${MODES[mode as keyof typeof MODES] || MODES.ghost}
      - TONE: ${tone}
      
      STRICT RULES (THE "HUMAN" ALGORITHM):
      1. BURSTINESS: You MUST vary sentence length. Follow this pattern: Short. Medium. Very long and complex. Short.
      2. VOCABULARY: Do NOT use these words: ${FORBIDDEN_WORDS.join(", ")}. Use Anglo-Saxon roots (e.g., "use" instead of "utilize").
      3. PERPLEXITY: Increase lexical diversity. Don't repeat words.
      4. STRUCTURE: Remove all bullet points. Merge them into flowing paragraphs.
      5. IMPERFECTION: If mode is 'ghost' or 'casual', add slight conversational nuances (e.g., starting sentences with "Look," or "Honestly,").
      
      INPUT TEXT:
      "${text}"
      
      REWRITTEN OUTPUT (Text Only):
    `;

    // 5. EXECUTE
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${selectedModel}:generateContent?key=${apiKey}`;
    const genResp = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const genData = await genResp.json();
    const humanizedText = genData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!humanizedText) throw new Error("AI returned empty response.");

    return NextResponse.json({ 
      result: humanizedText,
      debug_model: selectedModel
    });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
