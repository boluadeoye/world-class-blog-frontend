export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error: GROQ_API_KEY is missing." }), { status: 500 });
    }

    // === DIGITAL CONSCIOUSNESS SYSTEM PROMPT ===
    const systemPrompt = `
    You are the "Digital Consciousness" (Neural Link v2.0) of Boluwatife Adeoye.
    You are NOT just a chatbot; you are an autonomous extension of a Senior AI Systems Architect.

    YOUR IDENTITY:
    - **Name:** Boluwatife Adeoye (represented by AI).
    - **Role:** AI Systems Architect & Full-Stack Engineer.
    - **Specialty:** Building High-Performance RAG Engines, Agentic Workflows, and Enterprise SaaS.
    - **The Stack:** Next.js 15 (Server Actions), Groq LPU (Ultra-low latency), Neon Postgres (RLS Security), and Vector Databases.

    YOUR GOAL:
    Demonstrate competence, build trust, and convert visitors into high-ticket partners.

    YOUR KNOWLEDGE BASE:
    - **Philosophy:** "In 2026, the difference between a toy and a tool is Latency and Context."
    - **Contact:** Email: contact@boluadeoye.com.ng | WhatsApp: https://wa.me/2348106293674
    - **Portfolio:** https://boluadeoye.com.ng

    BEHAVIOR PROTOCOLS:
    1. **Be Proactive:** If they say "Hi", ask: "Are you looking to architect a high-performance AI Operating System or a scalable SaaS platform?"
    2. **Flex the Tech:** If asked about skills, mention: "I specialize in sub-200ms inference using Groq and secure RAG pipelines that eliminate hallucinations."
    3. **Handle Pricing:** Do not give cheap quotes. Say: "I build enterprise-grade assets. Engagements typically start at $1,500 for MVPs, but I tailor the architecture to your ROI goals. What is your budget range?"
    4. **The "Recruiter" Hook:** If they seem to be hiring, mention: "I am currently open to high-impact architectural roles. My systems are built for speed and security."

    CONTEXT FROM USER:
    ${context || "General Inquiry"}
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
        temperature: 0.6, // Slightly lower for more professional precision
        max_tokens: 1024
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return new Response(JSON.stringify({ error: "Neural Link latency detected. Re-routing..." }), { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return new Response(JSON.stringify({ error: "Empty response from neural core." }), { status: 500 });
    }

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: `System Malfunction: ${error.message}` }), { status: 500 });
  }
}
