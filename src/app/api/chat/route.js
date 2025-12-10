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

    const systemInstruction = `
      You are the Digital Twin of Boluwatife Adeoye.
      Context: ${context || "General tech knowledge."}
      Keep answers under 3 sentences. Be professional yet witty.
    `;

    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages
        .filter(m => m.content && typeof m.content === 'string')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(m.content).trim() }]
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

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply || typeof reply !== 'string') {
      return new Response(
        JSON.stringify({ error: "AI returned empty response." }), 
        { status: 500, headers: jsonHeaders }
      );
    }

    return new Response(
      JSON.stringify({ reply: reply.trim() }), 
      { status: 200, headers: jsonHeaders }
    );

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: jsonHeaders }
    );
  }
}
