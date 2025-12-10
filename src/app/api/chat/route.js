export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Server Error: GEMINI_API_KEY is missing." }), { status: 500 });
    }

    // Construct the prompt
    const systemInstruction = `
      You are the "Digital Twin" of Boluwatife Adeoye, a Full-Stack Engineer.
      Tone: Professional, witty, and concise.
      Context from Bolu's blog: ${context || "No specific context."}
      Instructions: Answer as Bolu. Keep it under 3 sentences.
    `;

    // === CRITICAL FIX: SANITIZE HISTORY ===
    // 1. Filter out empty messages
    // 2. Ensure role is correct
    // 3. Ensure text is a string
    const validMessages = messages.filter(m => m.content && typeof m.content === 'string' && m.content.trim() !== "");

    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...validMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    // Direct HTTP Call to Gemini 2.0 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Log the full error for debugging
      console.error("Google API Error Details:", JSON.stringify(data, null, 2));
      throw new Error(data.error?.message || "Google API Error");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("Empty response from AI.");
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ 
      error: `System Error: ${error.message}` 
    }), { status: 500 });
  }
}
