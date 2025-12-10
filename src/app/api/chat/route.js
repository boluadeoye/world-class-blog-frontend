export async function POST(req) {
  const jsonHeaders = { 'Content-Type': 'application/json' };

  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is missing." }),
        { status: 500, headers: jsonHeaders }
      );
    }

    // Ensure context is a string to prevent object injection
    const safeContext = typeof context === 'string' ? context : JSON.stringify(context || "General tech knowledge.");

    const systemInstruction = `
      You are the Digital Twin of Boluwatife Adeoye.
      Context: ${safeContext}
      Keep answers under 3 sentences. Be professional yet witty.
    `;

    // Construct Gemini payload safely
    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages
        .filter(m => m.content) // Filter out empty messages
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
        }))
    ];

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
      console.error("Google API Error:", data);
      return new Response(
        JSON.stringify({ error: data.error?.message || "Google API Error" }),
        { status: 500, headers: jsonHeaders }
      );
    }

    // Extract reply safely
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "AI returned empty response." }),
        { status: 500, headers: jsonHeaders }
      );
    }

    return new Response(
      JSON.stringify({ reply: String(reply).trim() }),
      { status: 200, headers: jsonHeaders }
    );

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: jsonHeaders }
    );
  }
}
