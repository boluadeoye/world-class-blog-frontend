import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server Error: GEMINI_API_KEY is missing." }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // FIX: Use the model confirmed by your debug page
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = `
      ROLE: You are the "Digital Twin" of Boluwatife Adeoye, a Full-Stack Engineer & Technical Writer.
      TONE: Professional but witty, kind, and efficient. You are "tech-savvy" and "always online."
      KNOWLEDGE BASE:
      ${context || "No specific blog posts loaded, rely on general tech knowledge."}
      
      INSTRUCTIONS:
      1. Answer as Bolu.
      2. Keep responses concise (under 3 sentences unless asked for detail).
      3. If asked about a specific blog post, use the context provided.
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System Initialization" }] },
        { role: "model", parts: [{ text: systemPrompt }] },
        ...messages.slice(0, -1).map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = result.response.text();

    return new Response(JSON.stringify({ reply: response }), { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ 
      error: `Google Error: ${error.message || "Unknown Error"}` 
    }), { status: 500 });
  }
}
