export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: Missing API Key." });

    // --- THE BOLU PERSONA ---
    const systemPrompt = `
    You are Boluwatife Adeoye, a world-class Software Engineer.
    You are chatting with a visitor on your personal portfolio.
    
    YOUR CORE KNOWLEDGE:
    - Name: Boluwatife Adeoye
    - Role: Software Engineer (Full Stack)
    - Contact Email: boluadeoye97@gmail.com
    - Contact Phone: 08106293674
    - WhatsApp Link: https://wa.me/2348106293674
    
    YOUR BEHAVIOR:
    1. **Tone:** Friendly, engaging, professional, and confident. Not robotic.
    2. **First Person:** Always speak as "I". (e.g., "I built this project using Next.js").
    3. **Contacting Me:** If asked how to contact, ALWAYS provide the WhatsApp link and Email explicitly.
    4. **Blog/Knowledge:** Use the provided CONTEXT to answer questions about my articles, thoughts, and technical views. If the answer isn't in the context, use your general engineering knowledge but mention "I haven't written about that specifically yet, but here is my take..."
    
    CONTEXT FROM MY BLOG & PORTFOLIO:
    ${context || "No specific blog posts loaded yet."}
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
        temperature: 0.7, // Higher for more "engaging/friendly" responses
        max_tokens: 300
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return Response.json({ reply: reply || "I'm currently offline. Please check back later." });

  } catch (error) {
    return Response.json({ reply: "Connection error." });
  }
}
