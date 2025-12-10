import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    
    // 1. Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "CRITICAL: GEMINI_API_KEY is missing in Vercel Settings." }), { status: 500 });
    }

    // 2. Initialize AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 3. Use the most stable model (Flash 1.5)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are the digital twin of Boluwatife Adeoye.
      Context: ${context || "General tech."}
    `;

    // 4. Simple Chat History Construction
    const history = [
      { role: "user", parts: [{ text: "System Initialization" }] },
      { role: "model", parts: [{ text: systemPrompt }] },
      ...messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;

    // 5. Generate Response
    const result = await chat.sendMessage(lastMessage);
    const response = result.response.text();

    return new Response(JSON.stringify({ reply: response }), { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    // Return the ACTUAL error message to the UI
    return new Response(JSON.stringify({ 
      error: `Google Error: ${error.message || "Unknown Error"}` 
    }), { status: 500 });
  }
}
