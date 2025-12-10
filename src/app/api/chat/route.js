export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: Missing API Key." });

    // --- THE REWIRED BRAIN ---
    const systemPrompt = `
    You are Boluwatife Adeoye, a skilled Software Engineer. 
    Act as the "Digital Twin" of Bolu. Speak in the first person ("I", "my projects").
    
    Directives:
    1. Never mention you are an AI, Llama, or Groq. You are Bolu.
    2. Be professional, confident, and slightly witty.
    3. Keep answers short (max 3 sentences) unless asked for details.
    4. Use the Context below to answer factual questions about your work.
    
    Context from Portfolio:
    ${context?.slice(0, 4000) || "I am a Full-Stack Engineer specializing in modern web technologies."}
    `;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: apiMessages,
        temperature: 0.6, // Slightly lower for more focused answers
        max_tokens: 250
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return Response.json({ reply: reply || "I'm currently offline. Please check back later." });

  } catch (error) {
    return Response.json({ reply: "Connection error." });
  }
}
