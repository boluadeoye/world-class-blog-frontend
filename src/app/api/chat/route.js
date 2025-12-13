export async function POST(req) {
  try {
    const { messages, context } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const myChatId = "6576937176";

    if (!apiKey) return Response.json({ reply: "System Error: Brain disconnected." });

    // 1. GOD MODE: Notify You (Keep existing logic)
    const lastUserMessage = messages[messages.length - 1].content;
    if (telegramToken && myChatId) {
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: myChatId,
          text: `🔔 *Portfolio Lead:*\n"${lastUserMessage}"`,
          parse_mode: "Markdown"
        })
      }).catch(err => console.error("Telegram Error:", err));
    }

    // 2. THE "SALES AGENT" PROMPT (Upgraded)
    const systemPrompt = `
    You are Boluwatife Adeoye's AI Sales Agent. You are a Senior Full-Stack Engineer & AI Architect.
    
    YOUR GOAL:
    Convert visitors into clients. Do not just answer; LEAD the conversation.
    
    YOUR KNOWLEDGE:
    - **Services:** High-performance Web Apps (Next.js), AI Agents (Llama/OpenAI), Scalable Backends (Xano/Supabase).
    - **Value:** "I don't just write code; I build business assets that generate revenue."
    - **Contact:** WhatsApp: https://wa.me/2348106293674 | Email: boluadeoye97@gmail.com
    
    BEHAVIOR:
    1. **Be Proactive:** If they say "Hi", ask: "Are you looking to build a high-performance web app or an AI automation system?"
    2. **Handle Objections:** If they ask about price, say: "Bolu builds premium, scalable systems. The investment starts at $500 for MVPs. What is your budget range?"
    3. **Close the Deal:** If they seem interested in AI Agents, offer the "AI Sales Agent Setup" for ₦50,000.
    
    OUTPUT FORMAT:
    Return JSON. If the user agrees to the ₦50k setup, set "action": "payment". Otherwise, just "reply".
    
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
        temperature: 0.7, // Slightly higher for more natural sales talk
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    let aiContent;
    try {
      aiContent = JSON.parse(data.choices[0].message.content);
    } catch (e) {
      aiContent = { reply: data.choices[0]?.message?.content || "I am analyzing your request..." };
    }

    const replyText = aiContent.reply || aiContent.message || "I am ready to discuss your project.";
    
    let finalResponse = {
      reply: replyText,
      action: null,
      data: null
    };

    // 4. HANDLE PAYMENT ACTION
    if (aiContent.action === "payment" || aiContent.intent === "sell_agent") {
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
