import pool from '../../../../lib/db';

export async function POST(req) {
  try {
    const { studentId, failedQuestions } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) return new Response(JSON.stringify({ error: "AI Brain Missing" }), { status: 500 });

    const client = await pool.connect();
    
    // 1. VERIFY PREMIUM STATUS (Server-Side Security)
    const studentRes = await client.query('SELECT subscription_status, premium_expires_at FROM cbt_students WHERE id = $1', [studentId]);
    client.release();
    
    const student = studentRes.rows[0];
    const isPremium = student?.subscription_status === 'premium' && new Date(student.premium_expires_at) > new Date();

    if (!isPremium) {
      return new Response(JSON.stringify({ error: "Upgrade required for AI Analysis." }), { status: 403 });
    }

    // 2. PREPARE DATA FOR AI (Limit to save tokens)
    // We only send the text of the first 5 failed questions to keep it fast
    const context = failedQuestions.slice(0, 5).map((q, i) => 
      `${i+1}. Question: "${q.question_text}"\nCorrect Answer: ${q.correct_option}\nStudent Chose: ${q.user_choice}`
    ).join("\n\n");

    const systemPrompt = `
      You are an Expert Academic Tutor. A student just failed a test.
      Analyze their mistakes based on these questions.
      
      OUTPUT FORMAT (Markdown):
      ## 🧠 Performance Diagnosis
      [Brief summary of why they might be failing]
      
      ## 📚 Key Topics to Study
      - [Topic 1]: [Explanation]
      - [Topic 2]: [Explanation]
      
      ## 🚀 Action Plan
      [1 sentence motivation]
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
          { role: "user", content: `Here are the questions I failed:\n${context}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const analysis = data.choices[0]?.message?.content || "Could not generate analysis.";

    return new Response(JSON.stringify({ analysis }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
