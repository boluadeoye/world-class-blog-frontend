export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: API Key is missing." });

    // HELPER: Try a model and return result or null if failed
    async function tryModel(modelName) {
      try {
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
        if (data.error) return { error: data.error };
        return { text: data.candidates?.[0]?.content?.parts?.[0]?.text };
      } catch (e) {
        return { error: e.message };
      }
    }

    // ATTEMPT 1: gemini-flash-latest (The safest generic alias)
    let result = await tryModel("gemini-flash-latest");

    // ATTEMPT 2: gemini-pro-latest (Fallback if Flash is restricted)
    if (result.error) {
      console.log("Flash Latest failed, trying Pro Latest...");
      result = await tryModel("gemini-pro-latest");
    }

    // FINAL CHECK
    if (result.error) {
      console.error("All Models Failed:", result.error);
      
      if (result.error.message?.includes("limit: 0")) {
        return Response.json({ 
          reply: "CRITICAL ACCOUNT ERROR: Your Google API Key has a 'Limit of 0'. This means your Google Cloud Project is not allowed to use Gemini Free Tier. \n\nSOLUTION: Go to aistudio.google.com, create a NEW Project, and generate a NEW API Key." 
        });
      }
      
      return Response.json({ reply: `System Error: ${result.error.message || "Unknown"}` });
    }

    return Response.json({ reply: result.text || "I'm online, but I couldn't generate a response." });

  } catch (error) {
    return Response.json({ reply: "Connection failed. Please check your internet." });
  }
}
