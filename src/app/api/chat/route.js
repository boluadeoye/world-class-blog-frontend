export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error: GEMINI_API_KEY is missing in Vercel." }), { status: 500 });
    }

    // System Prompt
    const systemInstruction = `
      You are the Digital Twin of Boluwatife Adeoye.
      Context: ${context || "General tech knowledge."}
      Keep answers under 3 sentences. Be professional yet witty.
    `;

    // Format for Gemini REST API
    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    // Direct Fetch to Gemini 2.0 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      }
    );

    const data = await response.json();

    // Handle Google Errors
    if (!response.ok) {
      console.error("Google API Error:", data);
      const googleError = data.error?.message || "Unknown Google Error";
      return new Response(JSON.stringify({ error: `Google says: ${googleError}` }), { status: 500 });
    }

    // Extract Text
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return new Response(JSON.stringify({ error: "AI returned an empty response." }), { status: 500 });
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: `Server Error: ${error.message}` }), { status: 500 });
  }
}
