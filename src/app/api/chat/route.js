export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return Response.json({ reply: "System Error: API Key is missing." });

    // 1. Try the specific version: gemini-1.5-flash-latest
    // (Sometimes the alias 'gemini-1.5-flash' is missing in some regions)
    const modelToUse = "gemini-1.5-flash-latest";
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`,
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
    
    // 2. If it fails, DIAGNOSE the issue
    if (data.error) {
      console.error("Gemini API Error:", data.error);

      // If 404 (Model Not Found), let's ask Google what models ARE available
      if (data.error.code === 404 || data.error.status === "NOT_FOUND") {
        try {
          const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
          const listData = await listRes.json();
          
          if (listData.models) {
            const availableModels = listData.models
              .map(m => m.name.replace('models/', '')) // Clean up names
              .filter(name => name.includes('gemini')) // Only show Gemini models
              .join(', ');
              
            return Response.json({ 
              reply: `DEBUG: The model '${modelToUse}' was not found. \n\nYOUR AVAILABLE MODELS: \n${availableModels || "None"}. \n\nPlease tell the developer to switch to one of these.` 
            });
          }
        } catch (e) {
          return Response.json({ reply: "DEBUG: Could not list models. Your API Key might be invalid." });
        }
      }

      return Response.json({ reply: `API Error: ${data.error.message}` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return Response.json({ reply: text || "No response generated." });

  } catch (error) {
    return Response.json({ reply: `Server Exception: ${error.message}` });
  }
}
