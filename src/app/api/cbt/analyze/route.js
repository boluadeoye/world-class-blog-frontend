import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Excellent Performance, ${studentName}!\n\nYou have achieved a perfect score in **${courseCode}**. Your mastery of this subject is absolute. No corrective measures are required at this time.` });
    }

    // THE SOPHISTICATED PROMPT
    const prompt = `
    SYSTEM ROLE: You are the "Bolu Adeoye Digital Consciousness" — a high-level AI Academic Strategist. 
    TASK: Perform a deep-dive diagnostic on a student's performance in the FUOYE GST Mock Exam.
    
    STUDENT: ${studentName}
    COURSE: ${courseCode}
    SCORE: ${score}/${total}
    
    DATASET (FAILED QUESTIONS):
    ${JSON.stringify(failedQuestions)}
    
    INSTRUCTIONS:
    1. EXECUTIVE SUMMARY: Start with a personalized, sophisticated assessment of their current standing. Use an authoritative yet encouraging tone.
    2. COGNITIVE PATTERN RECOGNITION: Do not just list topics. Identify the *nature* of their errors. (e.g., "You are struggling with chronological sequences" or "There is a clear disconnect in your understanding of theoretical frameworks vs. practical application").
    3. CRITICAL FAILURE POINTS: Group the failed questions into high-level academic pillars.
    4. TACTICAL RECOVERY ROADMAP: Provide 3 highly specific, actionable steps they must take in the next 48 hours to bridge this gap.
    
    STYLE: Professional, "Aggressively Excellent," State-of-the-Art. Use Markdown for premium formatting. Use bold text for emphasis.
    `;

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a world-class academic diagnostic engine." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5, // Lower temperature for more precise, academic analysis
        max_tokens: 800
      })
    });

    const aiData = await aiRes.json();
    const analysis = aiData.choices?.[0]?.message?.content || "Diagnostic engine offline. Please retry.";

    return NextResponse.json({ analysis }, { status: 200 });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}
