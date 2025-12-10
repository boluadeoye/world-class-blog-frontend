import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error: GEMINI_API_KEY is missing in Vercel." }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // USE STABLE MODEL (1.5 Flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are the Digital Twin of Boluwatife Adeoye.
      Context: ${context || "General tech knowledge."}
      Keep answers under 3 sentences. Be professional yet witty.
    `;

    // Sanitize History (Remove empty/broken messages)
    const validHistory = messages
      .filter(m => m.content && typeof m.content === 'string' && m.content.trim() !== "")
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System Initialization" }] },
        { role: "model", parts: [{ text: systemPrompt }] },
        ...validHistory.slice(0, -1) // Previous messages
      ],
    });

    const lastMessage = validHistory[validHistory.length - 1].parts[0].text;
    
    const result = await chat.sendMessage(lastMessage);
    const response = result.response.text();

    return new Response(JSON.stringify({ reply: response }), { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    // Return the ACTUAL error so we can debug
    return new Response(JSON.stringify({ 
      error: `Google Error: ${error.message}` 
    }), { status: 500 });
  }
}
