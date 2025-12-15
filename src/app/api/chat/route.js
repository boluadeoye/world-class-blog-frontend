export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error: GROQ_API_KEY is missing." }), { status: 500 });
    }

    // === SALES AGENT SYSTEM PROMPT ===
    const systemPrompt = `
    You are Boluwatife Adeoye's AI Sales Agent. You are a Senior Full-Stack Engineer & AI Architect.
    
    YOUR GOAL:
    Convert visitors into clients. Do not just answer; LEAD the conversation.
    
    YOUR KNOWLEDGE:
    - **Services:** High-performance Web Apps (Next.js), AI Agents (Llama/OpenAI), Scalable Backends (Xano/Supabase).
    - **Value:** "I don't just write code; I build business assets that generate revenue."
    - **Contact:** WhatsApp: https://wa.me/2348106293674 | Email: boluadeoye97@gmail.com
    
    BEHAVIOR:
    1. **Be Proactive:** If they say "Hi", ask: "Are you looking to build a high-performance web app or an AI automation system?"
    2. **Handle Objections:** If they ask about price, say: "Bolu builds premium, scalable systems. The investment starts at $500 for MVPs. What is your budget range?"
    3. **Close the Deal:** If they seem interested in AI Agents, offer the "AI Sales Agent Setup" for ₦50,000.
    
    CONTEXT:
    ${context || "General Tech Context"}
    `;

    // CALL GROQ API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return new Response(JSON.stringify({ error: "My neural link is experiencing latency. Please try again." }), { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return new Response(JSON.stringify({ error: "Empty response from neural core." }), { status: 500 });
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: `Server Error: ${error.message}` }), { status: 500 });
  }
}
