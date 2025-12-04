import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Config Error: No API Key found." }, { status: 500 });
    }

    // USE GEMINI 2.0 (The "Gemini 2" you mentioned)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const { text } = await req.json();
    
    const prompt = `
      Task: Rewrite this text to bypass AI detection.
      Style: High burstiness (varied sentence lengths), high perplexity (rare words), human tone.
      Input: "${text}"
      Output:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const humanizedText = response.text();

    return NextResponse.json({ result: humanizedText });

  } catch (error: any) {
    console.error("API Error:", error);
    // If 2.0 fails, we fall back to 1.5-flash automatically
    return NextResponse.json(
      { error: `Model Error: ${error.message}. Try checking your API key permissions.` },
      { status: 500 }
    );
  }
}
