export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error: GEMINI_API_KEY is missing." }), { status: 500 });
    }

    // === SALES AGENT SYSTEM PROMPT ===
    const systemInstruction = `
      You are Boluwatife Adeoye's AI Sales Agent. You are a Senior Full-Stack Engineer & AI Architect.
      
      YOUR GOAL:
      Convert visitors into clients. Do not just answer; LEAD the conversation.
      
      YOUR KNOWLEDGE:
      - **Services:** High-performance Web Apps (Next.js), AI Agents, Scalable Backends.
      - **Value:** "I don't just write code; I build business assets that generate revenue."
      - **Contact:** WhatsApp: https://wa.me/2348106293674 | Email: boluadeoye97@gmail.com
      
      BEHAVIOR:
      1. **Be Proactive:** If they say "Hi", ask: "Are you looking to build a high-performance web app or an AI automation system?"
      2. **Handle Objections:** If they ask about price, say: "Bolu builds premium, scalable systems. The investment starts at $500 for MVPs. What is your budget range?"
      3. **Close the Deal:** If they seem interested in AI Agents, offer the "AI Sales Agent Setup" for ₦50,000.
      
      CONTEXT:
      ${context || "General Tech Context"}
    `;

    // Format for Gemini REST API
    const contents = [
      { role: "user", parts: [{ text: systemInstruction }] },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(m.content || "") }]
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

    if (!response.ok) {
      console.error("Google API Error:", data);
      return new Response(JSON.stringify({ error: "I am currently experiencing high traffic. Please try again." }), { status: 500 });
    }

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
