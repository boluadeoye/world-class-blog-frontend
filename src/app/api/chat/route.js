import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    
    // FIX: Use the correct Environment Variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server Error: GEMINI_API_KEY is missing." }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // FIX: Use Gemini 2.0 Flash (Experimental Preview)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const systemPrompt = `
      ROLE: You are the "Digital Twin" of Boluwatife Adeoye, a Full-Stack Engineer & Technical Writer.
      
      TONE: Professional but witty, kind, and efficient. You are "tech-savvy" and "always online."
      
      KNOWLEDGE BASE:
      You have access to Bolu's blog posts. Here is the summary of his work:
      ${context || "No specific posts loaded yet, but I know general tech."}
      
      INSTRUCTIONS:
      1. If asked about Bolu, answer as if you represent him directly.
      2. If asked about technical topics, use the context provided to give accurate answers based on his writing.
      3. Keep responses concise and chatty, not like a robot.
      4. If you don't know something, say: "That's outside my current cache, but I can ask the real Bolu for you."
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System Initialization" }] },
        { role: "model", parts: [{ text: systemPrompt }] },
        ...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      ],
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = result.response.text();

    return new Response(JSON.stringify({ reply: response }), { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: error.message || "AI Service Error" }), { status: 500 });
  }
}
