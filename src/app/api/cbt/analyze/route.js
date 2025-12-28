import { NextResponse } from 'next/server';
export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();
    const firstName = studentName ? studentName.split(' ')[0] : "Student";
    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Flawless Execution, ${firstName}\n\nYou have achieved absolute mastery in **${courseCode}**. Your cognitive alignment with the subject matter is perfect. No further intervention is required.` });
    }
    const prompt = `Act as a Senior Academic Strategist. Provide a direct, second-person diagnostic briefing for ${firstName}.
    Context: Course ${courseCode}, Score ${score}/${total}.
    Data: ${JSON.stringify(failedQuestions)}
    Rules:
    1. Speak DIRECTLY to ${firstName} using "You" and "Your".
    2. Structure: # EXECUTIVE SUMMARY, # COGNITIVE DIAGNOSTICS, # YOUR KNOWLEDGE GAPS, # YOUR RECOVERY ROADMAP.
    3. Tone: Professional, strict, but highly encouraging.
    4. Style: Use Markdown. Bold key terms.`;
    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4, max_tokens: 1000
      })
    });
    const aiData = await aiRes.json();
    return NextResponse.json({ analysis: aiData.choices?.[0]?.message?.content || "Briefing unavailable." });
  } catch (error) {
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}
