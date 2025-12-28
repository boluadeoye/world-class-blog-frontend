import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();
    const firstName = studentName ? studentName.split(' ')[0] : "Student";

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Absolute Mastery Achieved\n\nCongratulations, **${firstName}**. Your performance in **${courseCode}** is flawless. You have demonstrated the elite standard of **ExamForge**. No corrective measures are required.` });
    }

    const keys = [process.env.GROQ_API_KEY, process.env.GROQ_API_KEY_2, process.env.GROQ_API_KEY_3].filter(k => !!k);
    const limitedQuestions = failedQuestions.slice(0, 15);
    
    const prompt = `Act as the ExamForge Senior Academic Strategist for ${firstName}. 
    Course: ${courseCode}, Score: ${score}/${total}. 
    Failed Data: ${JSON.stringify(limitedQuestions)}
    Task: Provide a direct 2nd-person briefing. 
    Structure: # EXECUTIVE SUMMARY, # COGNITIVE DIAGNOSTICS, # YOUR KNOWLEDGE GAPS, # YOUR RECOVERY ROADMAP.
    Tone: Professional, strict, encouraging. Use Markdown.`;

    for (let i = 0; i < keys.length; i++) {
      try {
        const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${keys[i]}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 800
          })
        });
        if (aiRes.status === 429) continue; 
        const aiData = await aiRes.json();
        return NextResponse.json({ analysis: aiData.choices?.[0]?.message?.content });
      } catch (err) { continue; }
    }

    return NextResponse.json({ analysis: `### System Congestion\n\n**${firstName}**, the ExamForge AI is under heavy load. Please try again in 60s.` });
  } catch (error) {
    return NextResponse.json({ analysis: "### Diagnostic Offline\n\nTechnical glitch detected." }, { status: 200 });
  }
}
