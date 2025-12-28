import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Absolute Mastery Achieved\n\nCongratulations, **${studentName}**. Your performance in **${courseCode}** is flawless. You have demonstrated a 100% cognitive alignment with the course objectives. No corrective measures are required.` });
    }

    const prompt = `
    SYSTEM ROLE: Senior Academic Strategist.
    TASK: Provide a "Classic & Premium" diagnostic briefing for ${studentName}.
    
    CONTEXT:
    - Course: ${courseCode}
    - Performance: ${score}/${total}
    - Data: ${JSON.stringify(failedQuestions)}
    
    STRICT MARKDOWN STRUCTURE:
    # EXECUTIVE SUMMARY
    [A 2-sentence high-level assessment of the student's current standing.]

    # COGNITIVE DIAGNOSTICS
    [Identify the *nature* of their errors. Are they rushing? Is it a lack of theoretical depth? Use sophisticated academic language.]

    # CRITICAL KNOWLEDGE GAPS
    - **Gap 1:** [Description]
    - **Gap 2:** [Description]

    # TACTICAL RECOVERY ROADMAP
    1. **Immediate Action:** [Specific study task]
    2. **Conceptual Shift:** [How to rethink the topic]
    3. **Final Polish:** [Preparation tip]

    STYLE: Authoritative, Classic, Sophisticated. Use bold text for emphasis.
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
    return NextResponse.json({ analysis: aiData.choices?.[0]?.message?.content });

  } catch (error) {
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}
