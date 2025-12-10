export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: API Key is missing." });

    // SELECTED MODEL: gemini-2.0-flash-lite
    // Reason: Explicitly available in your list and optimized for speed/quota.
    const modelName = "gemini-2.0-flash-lite";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return Response.json({ reply: `System Error: ${data.error.message} (Model: ${modelName})` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "I'm online, but I couldn't generate a response." });

  } catch (error) {
    return Response.json({ reply: "Connection failed. Please check your internet." });
  }
}
