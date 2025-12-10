export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const context = body.context || "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return new Response(JSON.stringify({ reply: "System Error: API Key missing." }), { status: 200 });

    const systemInstruction = `
      You are the Digital Twin of Boluwatife Adeoye.
      Context: ${context}
      Keep answers under 3 sentences. Be professional yet witty.
    `;

    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.content || "") }]
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
      return new Response(JSON.stringify({ reply: "I am currently experiencing high traffic. Please try again." }), { status: 200 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ reply: "Connection interrupted. Please retry." }), { status: 200 });
  }
}
