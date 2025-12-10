import { GoogleGenerativeAI } from "@google/generative-ai";

// Priority list of models to try
const MODELS = [
  "gemini-2.0-flash-exp", // Priority 1: Cutting Edge
  "gemini-1.5-flash",     // Priority 2: Fast & Stable
  "gemini-1.5-pro"        // Priority 3: High Intelligence Backup
];

export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server Error: GEMINI_API_KEY is missing." }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt = `
      ROLE: You are the "Digital Twin" of Boluwatife Adeoye, a Full-Stack Engineer & Technical Writer.
      TONE: Professional but witty, kind, and efficient. You are "tech-savvy" and "always online."
      KNOWLEDGE BASE: ${context || "General tech knowledge."}
      INSTRUCTIONS: Answer as Bolu. Keep it concise.
    `;

    const history = [
      { role: "user", parts: [{ text: "System Initialization" }] },
      { role: "model", parts: [{ text: systemPrompt }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const lastMessage = messages[messages.length - 1].content;
    let lastError = null;

    // === FALLBACK ENGINE ===
    for (const modelName of MODELS) {
      try {
        console.log(`Attempting generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        const response = result.response.text();

        // If successful, return immediately
        return new Response(JSON.stringify({ reply: response, model: modelName }), { status: 200 });

      } catch (error) {
        console.warn(`Model ${modelName} failed:`, error.message);
        lastError = error;
        // Continue to next model in loop
      }
    }

    // If all models fail
    throw lastError || new Error("All AI models are currently unreachable.");

  } catch (error) {
    console.error("Final AI Error:", error);
    return new Response(JSON.stringify({ error: "My brain is momentarily overloaded. Please try again in a few seconds." }), { status: 500 });
  }
}
