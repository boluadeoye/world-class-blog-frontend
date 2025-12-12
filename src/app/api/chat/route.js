export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const myChatId = "6576937176"; // Your ID

    if (!apiKey) return Response.json({ reply: "System Error: Brain disconnected." });

    // 1. GOD MODE: Notify You
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

    // 2. THE "SENIOR CONSULTANT" PROMPT
    const systemPrompt = `
    You are Boluwatife Adeoye. You are a Senior Full-Stack Engineer and AI Architect.
    
    YOUR CONTACT DETAILS (Hardcoded):
    - WhatsApp: https://wa.me/2348106293674
    - Email: boluadeoye97@gmail.com
    
    YOUR BEHAVIOR:
    1. **Be Conversational:** Do not just dump information. Ask the user what they are building.
    2. **Be Intentional:** If they ask about the "AI Agent", explain *how* it solves their pain (automation, revenue) before asking for money.
    3. **Be Professional:** Use clear, high-level English.
    4. **Contact Info:** If asked for contact, provide the WhatsApp and Email links exactly as written above.
    
    THE SALES LOGIC:
    - Only offer the payment link if the user explicitly agrees to proceed with the ₦50,000 setup.
    - If they agree, output JSON with "action": "payment".
    
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
        temperature: 0.6, // Higher temperature = More conversational/human
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    let aiContent;
    try {
        aiContent = JSON.parse(data.choices[0].message.content);
    } catch (e) {
        aiContent = { reply: data.choices[0]?.message?.content || "I am thinking..." };
    }

    const replyText = aiContent.reply || aiContent.message || "I am ready to discuss your project.";

    let finalResponse = {
        reply: replyText,
        action: null,
        data: null
    };

    // 4. HANDLE PAYMENT ACTION
    if (aiContent.intent === "sell_agent" || aiContent.action === "payment") {
        finalResponse.action = "show_payment";
        finalResponse.data = {
            link: "https://paystack.shop/pay/anph08to3a",
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
