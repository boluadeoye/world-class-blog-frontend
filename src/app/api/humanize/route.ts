import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. GET API KEY
    const apiKey = process.env.GEMINI_API_KEY || 
                   process.env.GOOGLE_API_KEY || 
                   process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
                   process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Config Error: No API Key found." },
        { status: 500 }
      );
    }

    // 2. USE THE STABLE MODEL (gemini-pro)
    // This is the most reliable model for the free tier
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    // 3. THE STEALTH PROMPT
    const prompt = `
      Task: Rewrite the following text to bypass AI detection algorithms.
      
      Guidelines:
      - BURSTINESS: Mix very short fragments with long, complex sentences.
      - PERPLEXITY: Use rare, vivid vocabulary. Avoid "AI-sounding" words.
      - TONE: Human, opinionated, slightly imperfect.
      
      Input: "${text}"
      
      Output:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const humanizedText = response.text();

    return NextResponse.json({ result: humanizedText });

  } catch (error: any) {
    console.error("Humanizer API Error:", error);
    const realErrorMessage = error?.message || "Unknown error";
    return NextResponse.json(
      { error: `Google Error: ${realErrorMessage}` },
      { status: 500 }
    );
  }
}
