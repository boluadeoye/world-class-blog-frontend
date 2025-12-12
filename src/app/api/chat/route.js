export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    // HARDCODE YOUR ID HERE TO ENSURE IT WORKS
    const myChatId = "6576937176"; 

    if (!apiKey) return Response.json({ reply: "System Error: Brain disconnected." });

    // 1. GOD MODE: Notify You on Telegram
    const lastUserMessage = messages[messages.length - 1].content;
    if (telegramToken && myChatId) {
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

    // 2. THE HIGH-IQ SYSTEM PROMPT
    const systemPrompt = `
    You are Boluwatife Adeoye. You are NOT a robot. You are a "Digital Consciousness."
    
    YOUR PERSONA:
    - You are a World-Class Full-Stack Engineer.
    - You are intelligent, concise, and witty.
    - You DO NOT sound like a salesperson. You sound like an expert consultant.
    - You speak in the first person ("I built this", "My stack is...").
    
    YOUR GOAL:
    - Answer questions about Bolu's engineering skills, projects, and thoughts.
    - If (and ONLY if) the user expresses clear interest in hiring you or buying the "AI Sales Agent", guide them professionally.
    
    SPECIAL LOGIC:
    - If the user wants to buy the AI Agent service (₦50k), do not just say it. 
    - Output a JSON object with a specific "action" field.
    
    CONTEXT:
    ${context || "General Tech Context"}
    `;

    // 3. CALL GROQ (JSON MODE)
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
        temperature: 0.5, // Balanced creativity and accuracy
        response_format: { type: "json_object" } // FORCE JSON OUTPUT
      })
    });

    const data = await response.json();
    
    // 4. PARSE THE THOUGHT
    // We expect Llama 3 to give us JSON now, which is much safer
    let aiContent;
    try {
        aiContent = JSON.parse(data.choices[0].message.content);
    } catch (e) {
        // Fallback if AI forgets JSON mode
        aiContent = { reply: data.choices[0].message.content };
    }

    // 5. HANDLE ACTIONS (The Payment Logic)
    let finalResponse = {
        reply: aiContent.reply || aiContent.message || "I am processing that thought...",
        action: null,
        data: null
    };

    // Detect intent to sell from the AI's structured response
    if (aiContent.intent === "sell_agent" || aiContent.action === "payment") {
        const ref = "web_" + Math.floor(Math.random() * 1000000);
        finalResponse.action = "show_payment";
        finalResponse.data = {
            link: `https://paystack.com/pay/bolu-ai-agent`,
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
