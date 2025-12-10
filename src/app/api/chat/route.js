export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: API Key is missing." });

    // We stick to the most stable model: gemini-1.5-flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: `System: You are Bolu's Digital Twin. Context: ${context?.slice(0, 3000) || "Tech Portfolio"}.\n\nUser: ${messages[messages.length - 1].content}` }] 
          }]
        })
      }
    );

    const data = await response.json();
    
    // Handle Errors Gracefully
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      
      // Check for Quota/Rate Limit
      if (data.error.code === 429 || data.error.message.includes("quota")) {
        return Response.json({ reply: "I'm receiving too many messages. Please wait 1 minute and try again." });
      }
      
      // Check for "Not Found" or "User Location" errors
      if (data.error.code === 404 || data.error.message.includes("not found")) {
        return Response.json({ reply: "System Error: My AI model is currently unavailable in this region or for this API Key." });
      }

      return Response.json({ reply: `System Error: ${data.error.message}` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "I'm online, but I couldn't generate a response." });

  } catch (error) {
    return Response.json({ reply: "Connection failed. Please check your internet." });
  }
}
