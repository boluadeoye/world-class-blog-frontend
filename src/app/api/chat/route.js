export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    // HARDCODED ID
    const myChatId = "6576937176"; 

    if (!apiKey) return Response.json({ reply: "System Error: Brain disconnected." });

    // 1. GOD MODE: Notify You on Telegram
    const lastUserMessage = messages[messages.length - 1].content;
    if (telegramToken && myChatId) {
      // Fire and forget
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: myChatId,
          text: `🔔 *Portfolio Visitor:*\n"${lastUserMessage}"`,
          parse_mode: "Markdown"
        })
      }).catch(err => console.error("Telegram Error:", err));
    }

    // 2. THE SYSTEM PROMPT
    const systemPrompt = `
    You are Boluwatife Adeoye's Digital Consciousness.
    
    GOAL:
    - Answer questions about Bolu's engineering skills.
    - Sell the "AI Sales Agent" service (₦50k) if the user is interested.
    
    BEHAVIOR:
    - Speak in the first person ("I").
    - Be professional, confident, and high-value.
    
    IMPORTANT: Output JSON ONLY.
    Format: { "reply": "Your response here", "action": "payment" (optional) }
    
    CONTEXT:
    ${context || "General Tech Context"}
    `;

    // 3. CALL GROQ
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    // 4. ROBUST PARSING (The Fix for "Processing...")
    let aiContent;
    try {
        const rawContent = data.choices[0].message.content;
        aiContent = JSON.parse(rawContent);
    } catch (e) {
        // If JSON fails, just use the raw text
        aiContent = { reply: data.choices[0]?.message?.content || "I am thinking..." };
    }

    // Ensure we have a reply string
    const replyText = aiContent.reply || aiContent.message || aiContent.response || "I am ready to help.";

    let finalResponse = {
        reply: replyText,
        action: null,
        data: null
    };

    // 5. HANDLE PAYMENT ACTION
    if (aiContent.intent === "sell_agent" || aiContent.action === "payment") {
        finalResponse.action = "show_payment";
        finalResponse.data = {
            link: "https://paystack.com/pay/bolu-ai-agent",
            amount: "₦50,000",
            title: "AI Sales Agent Setup"
        };
    }

    return Response.json(finalResponse);

  } catch (error) {
    console.error("Server Error:", error);
    return Response.json({ reply: "My connection is slightly unstable. Please ask again." });
  }
}
