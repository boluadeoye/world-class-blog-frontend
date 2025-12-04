import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. GET THE KEY (Checks your existing variables)
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Error: API Key not found. Please check your env variables." },
        { status: 500 }
      );
    }

    // 2. INITIALIZE GEMINI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. PARSE INPUT
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    // 4. THE STEALTH PROMPT (Engineered for Zero Detection)
    const prompt = `
      Task: Rewrite the following text to bypass AI detection algorithms (like GPTZero or Turnitin).
      
      Target Style:
      - BURSTINESS: Aggressively vary sentence lengths. Mix fragments with long, winding sentences.
      - PERPLEXITY: Use unpredictable vocabulary. Avoid common AI words like "delve", "crucial", "tapestry", "landscape", "moreover".
      - TONE: Casual, opinionated, and slightly imperfect. Sound like a tired human expert, not a machine.
      - FORMAT: Keep the original meaning but completely change the structure.
      
      Input Text:
      "${text}"
      
      Humanized Output:
    `;

    // 5. GENERATE
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const humanizedText = response.text();

    return NextResponse.json({ result: humanizedText });

  } catch (error) {
    console.error("Humanizer API Error:", error);
    return NextResponse.json(
      { error: "Failed to process text. The AI might be overloaded." },
      { status: 500 }
    );
  }
}
