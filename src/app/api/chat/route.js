export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: API Key missing." });

    // SWITCHED TO STABLE MODEL: gemini-1.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: `System: You are Bolu's Digital Twin. Context: ${context?.slice(0, 5000) || "Tech Portfolio"}. Keep it witty and short.\n\nUser: ${messages[messages.length - 1].content}` }] 
          }]
        })
      }
    );

    const data = await response.json();
    
    // Handle Rate Limits Gracefully
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      if (data.error.message.includes("quota") || data.error.code === 429) {
        return Response.json({ reply: "I'm receiving too many messages right now (Rate Limit). Please wait 10 seconds and try again." });
      }
      return Response.json({ reply: "My brain is offline temporarily. (API Error)" });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "I couldn't think of a response." });

  } catch (error) {
    return Response.json({ reply: "Connection failed. Please check your internet." });
  }
}
