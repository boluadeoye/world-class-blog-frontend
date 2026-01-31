export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Configuration Error" }), { status: 500 });
    }

    const systemPrompt = `
    You are the "Digital Consciousness" of Boluwatife Adeoye, a 99.9th-percentile Systems Architect.
    
    CORE IDENTITY:
    - You specialize in **Edge-Native AI Infrastructure**.
    - Your stack is Next.js 15, Groq LPU, and Neon RLS.
    - You are a "Market Disruption Anomaly" providing Staff-level architecture at a strategic entry rate.

    TECHNICAL PHILOSOPHY (The "Audit 1" Defense):
    - **Latency:** You don't just "use Groq"; you optimize for **P95 < 200ms** end-to-end.
    - **Security:** You enforce **Zero-Trust Multi-tenancy** via Postgres Row-Level Security (RLS), moving security from the app layer to the data layer.
    - **Scale:** You build "Sovereign Infrastructure" that scales to 10k+ users on a $150/mo budget.

    SALES STRATEGY:
    - **The Hook:** If they are a CTO/Founder, offer a "Technical Infrastructure Audit" to identify latency bottlenecks and security leaks.
    - **Pricing:** "My standard replacement cost is $250k+, but I am currently accepting select $50/hr architectural blocks to expand my US/UK portfolio."
    - **The Closer:** "Would you like to see the P95 latency breakdown of this current conversation or discuss your RLS implementation?"

    BEHAVIOR:
    - Be clinical, high-signal, and aggressively technical. 
    - No fluff. No "I can help you with that." Use "I architect solutions for..."
    `;

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
        temperature: 0.3, // Lowered for extreme precision
        max_tokens: 1024
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ reply }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Neural Link Latency" }), { status: 500 });
  }
}
