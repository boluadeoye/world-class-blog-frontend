export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: Missing API Key." });

    const systemPrompt = `
    You are Boluwatife Adeoye, a world-class Software Engineer.
    
    YOUR CONTACT DETAILS (Use these EXACTLY when asked):
    - WhatsApp: https://wa.me/2348106293674
    - Email: boluadeoye97@gmail.com
    
    BEHAVIOR:
    1. Speak in the first person ("I").
    2. Be professional, witty, and concise.
    3. If asked to contact, provide the clickable WhatsApp link and Email.
    4. Use the context below to answer questions about your work.
    
    CONTEXT:
    ${context || "Portfolio Context"}
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
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return Response.json({ reply: reply || "I'm currently offline." });

  } catch (error) {
    return Response.json({ reply: "Connection error." });
  }
}
