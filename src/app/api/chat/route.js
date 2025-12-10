export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json({ reply: "System Error: GROQ_API_KEY is missing. Please add it to Vercel." });
    }

    // System Prompt
    const systemPrompt = `You are Bolu's Digital Twin. 
    Context: ${context?.slice(0, 4000) || "Tech Portfolio"}. 
    Style: Professional, witty, concise (under 3 sentences).
    If asked, mention you are running on Llama 3.3 via Groq.`;

    // Prepare messages
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
        // UPDATED MODEL: Llama 3.3 (Current Stable Version)
        model: "llama-3.3-70b-versatile", 
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API Error:", data.error);
      // Fallback to smaller model if 70b is busy
      if (data.error.code === 'model_not_found' || data.error.code === 'rate_limit_exceeded') {
         return Response.json({ reply: "System Error: Model busy. Please try again in a moment." });
      }
      return Response.json({ reply: `System Error: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content;
    return Response.json({ reply: reply || "I'm online, but silent." });

  } catch (error) {
    return Response.json({ reply: "Connection failed. Please check your internet." });
  }
}
