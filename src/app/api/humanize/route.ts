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

    // 2. THE STEALTH PROMPT
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

    // 3. RAW FETCH TO GOOGLE (Bypassing the SDK)
    // We use gemini-1.5-flash because it is the most stable free model.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    // 4. ERROR HANDLING
    if (!response.ok) {
      const errorMsg = data.error?.message || "Unknown Google Error";
      console.error("Google API Error:", errorMsg);
      
      // If 1.5 Flash fails, we could try Pro, but let's see the error first.
      return NextResponse.json({ error: `Google Error: ${errorMsg}` }, { status: 500 });
    }

    // 5. EXTRACT TEXT
    const humanizedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!humanizedText) {
      return NextResponse.json({ error: "AI returned empty response." }, { status: 500 });
    }

    return NextResponse.json({ result: humanizedText });

  } catch (error: any) {
    console.error("System Error:", error);
    return NextResponse.json(
      { error: `System Error: ${error.message}` },
      { status: 500 }
    );
  }
}
