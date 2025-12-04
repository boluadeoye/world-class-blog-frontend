import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// THE ROBUST MODEL LIST
// The system will try these in order until one works.
const MODELS_TO_TRY = [
  "gemini-1.5-flash",      // Best balance of speed/free-tier
  "gemini-1.5-pro",        // High intelligence
  "gemini-pro",            // Standard stable
  "gemini-1.0-pro"         // Legacy backup
];

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
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. THE STEALTH PROMPT (Aggressive Humanization)
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

    // 3. THE FALLBACK LOOP
    let lastError = null;

    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Attempting generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const humanizedText = response.text();

        // If we get here, it worked! Return immediately.
        return NextResponse.json({ 
          result: humanizedText,
          modelUsed: modelName 
        });

      } catch (error: any) {
        console.warn(`Model ${modelName} failed:`, error.message);
        lastError = error;
        // Continue to the next model in the list...
      }
    }

    // 4. IF ALL FAIL
    throw lastError || new Error("All models failed to generate content.");

  } catch (error: any) {
    console.error("Final Humanizer Error:", error);
    return NextResponse.json(
      { error: `System Exhausted: ${error.message}. Check API Key Quotas.` },
      { status: 500 }
    );
  }
}
