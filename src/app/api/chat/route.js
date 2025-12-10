export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "Error: Missing API Key on Server" });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ text: "Context: " + (context || "") + "\n\nUser: " + messages[messages.length - 1].content }] 
          }]
        })
      }
    );

    const data = await response.json();
    
    // Check for Gemini errors
    if (data.error) {
      return Response.json({ reply: "Gemini API Error: " + data.error.message });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "Error: No text in Gemini response." });

  } catch (error) {
    return Response.json({ reply: "Server Exception: " + error.message });
  }
}
