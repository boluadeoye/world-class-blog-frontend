import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// THE KITCHEN SINK LIST
// We try every known alias. One of these WILL work.
const MODELS_TO_TRY = [
  "gemini-1.5-flash",          // Standard Free
  "gemini-1.5-flash-latest",   // Latest Alias
  "gemini-1.5-flash-8b",       // High-efficiency (often empty quota)
  "gemini-1.5-pro",            // High Intelligence
  "gemini-1.5-pro-latest",     // Latest Pro
  "gemini-pro",                // Legacy Stable
  "gemini-1.0-pro",            // Legacy Versioned
  "gemini-2.0-flash-exp"       // Experimental (Last resort due to quota)
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });
    }

    const { text } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);

    // THE STEALTH PROMPT (Score 20 Target)
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

    let lastError = null;
    let successModel = "";
    let humanizedText = "";

    // LOOP THROUGH MODELS
    for (const modelName of MODELS_TO_TRY) {
      try {
        console.log(`Trying model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        humanizedText = response.text();
        successModel = modelName;
        
        // If we get here, it worked. Break the loop.
        break;

      } catch (error: any) {
        console.warn(`Model ${modelName} failed: ${error.message}`);
        lastError = error;
        // Continue to next model...
      }
    }

    if (!humanizedText) {
      throw lastError || new Error("All models failed.");
    }

    return NextResponse.json({ 
      result: humanizedText,
      debug_model: successModel 
    });

  } catch (error: any) {
    console.error("Final Error:", error);
    return NextResponse.json(
      { error: `System Exhausted. Last error: ${error.message}` },
      { status: 500 }
    );
  }
}
