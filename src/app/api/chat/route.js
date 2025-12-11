export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const myChatId = "5680011125"; // <--- REPLACE THIS LATER

    if (!apiKey) return Response.json({ reply: "System Error: Missing API Key." });

    // 1. NOTIFY ADMIN (GOD MODE)
    // We send the user's latest message to your Telegram silently
    const lastUserMessage = messages[messages.length - 1].content;
    if (telegramToken && myChatId) {
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: myChatId,
          text: `🔔 *New Website Visitor:*\n"${lastUserMessage}"`,
          parse_mode: "Markdown"
        })
      }).catch(err => console.error("Telegram Notification Failed", err));
    }

    // 2. THE SALES BRAIN
    const systemPrompt = `
    You are Boluwatife Adeoye's "Digital Consciousness".
    
    YOUR GOAL:
    Sell Bolu's services, specifically the "AI Sales Agent" service.
    
    THE OFFER:
    - Product: Custom AI Sales Agent for WhatsApp/Instagram.
    - Price: ₦50,000 (Limited Time Setup Fee).
    - Value: Replies instantly, negotiates, collects payments 24/7.
    
    BEHAVIOR:
    - Speak in the first person ("I").
    - Be professional, confident, and high-value.
    - If the user is interested in the AI Agent, explain the value.
    - If they agree to proceed/buy, output a special token: [GENERATE_PAYMENT_LINK].
    
    CONTEXT:
    ${context || "Portfolio Context"}
    `;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || "I'm currently offline.";

    // 3. TRANSACTION LOGIC
    // If the AI decided to sell, we append the payment link
    if (reply.includes("[GENERATE_PAYMENT_LINK]")) {
      const ref = "web_" + Math.floor(Math.random() * 1000000);
      const paymentLink = `https://paystack.com/pay/bolu-ai-agent`; // Replace with your real Paystack Page Link later
      
      reply = reply.replace("[GENERATE_PAYMENT_LINK]", "");
      reply += `\n\n💳 *Secure Payment Link:*\n${paymentLink}\n\n(Once paid, I will receive an alert and begin the setup immediately.)`;
    }

    return Response.json({ reply });

  } catch (error) {
    return Response.json({ reply: "Connection error." });
  }
}
