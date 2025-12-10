export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: GEMINI_API_KEY is missing in .env" });

    // Helper function to try a specific model
    async function tryModel(modelName) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
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
      return await response.json();
    }

    // ATTEMPT 1: Gemini 1.5 Flash (Preferred)
    let data = await tryModel("gemini-1.5-flash");

    // If 1.5 Flash fails, try ATTEMPT 2: Gemini Pro (Legacy/Stable)
    if (data.error) {
      console.error("Gemini 1.5 Flash Failed:", data.error);
      data = await tryModel("gemini-pro");
    }

    // If BOTH fail, return the specific error message to the user
    if (data.error) {
      console.error("Gemini Pro Failed:", data.error);
      const errorMsg = data.error.message || "Unknown API Error";
      return Response.json({ reply: `API Error: ${errorMsg} (Code: ${data.error.code})` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "I'm here, but I couldn't generate a response." });

  } catch (error) {
    return Response.json({ reply: `Server Exception: ${error.message}` });
  }
}
