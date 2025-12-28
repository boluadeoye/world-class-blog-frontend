import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();
    const firstName = studentName.split(' ')[0];

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Absolute Mastery Achieved\n\nCongratulations, **${firstName}**. Your performance in **${courseCode}** is flawless. You have demonstrated a 100% cognitive alignment with the course objectives. No corrective measures are required.` });
    }

    const prompt = `
    SYSTEM ROLE: Senior Academic Strategist.
    TASK: Provide a direct, second-person diagnostic briefing for ${firstName}.
    
    CONTEXT:
    - Course: ${courseCode}
    - Performance: ${score}/${total}
    - Data: ${JSON.stringify(failedQuestions)}
    
    STRICT INSTRUCTIONS:
    - Speak DIRECTLY to the student using "You", "Your", and "${firstName}".
    - Tone: Authoritative, encouraging, and direct.
    
    STRICT MARKDOWN STRUCTURE:
    # EXECUTIVE SUMMARY
    [A 2-sentence direct assessment of ${firstName}'s standing. e.g., "${firstName}, you have shown..."]

    # COGNITIVE DIAGNOSTICS
    [Identify the *nature* of their errors. Use sophisticated academic language but address them directly.]

    # YOUR CRITICAL KNOWLEDGE GAPS
    - **Gap 1:** [Description]
    - **Gap 2:** [Description]

    # YOUR TACTICAL RECOVERY ROADMAP
    1. **Immediate Action:** [Specific study task]
    2. **Conceptual Shift:** [How to rethink the topic]
    3. **Final Polish:** [Preparation tip]

    STYLE: Professional, Classic, Sophisticated. Use bold text for emphasis.
    `;

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 1000
      })
    });

    const aiData = await aiRes.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) throw new Error("AI returned empty content");

    return NextResponse.json({ analysis: content });

  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "AI Service Failed to generate report." }, { status: 500 });
  }
}
