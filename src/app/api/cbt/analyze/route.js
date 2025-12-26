import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentId, failedQuestions } = await req.json();

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: "Perfect score! No analysis needed. Keep it up!" });
    }

    // 1. Construct the Prompt
    const prompt = `
    You are a strict but encouraging University Professor. A student just failed the following questions in a GST Mock Exam.
    
    Analyze their mistakes and provide a concise, bullet-point study guide.
    Do NOT just give the answers. Explain the *concept* they missed.
    
    FAILED QUESTIONS:
    ${JSON.stringify(failedQuestions)}
    
    FORMAT:
    - **Concept 1:** Explanation...
    - **Concept 2:** Explanation...
    - **Study Tip:** One actionable tip.
    
    Keep it under 150 words. Use Markdown.
    `;

    // 2. Call Groq AI (Llama 3.3 70B)
    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const aiData = await aiRes.json();
    const analysis = aiData.choices?.[0]?.message?.content || "AI Analysis unavailable at the moment.";

    return NextResponse.json({ analysis }, { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}
