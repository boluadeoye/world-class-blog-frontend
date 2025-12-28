import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { studentName, courseCode, score, total, failedQuestions } = await req.json();
    const firstName = studentName ? studentName.split(' ')[0] : "Student";

    if (!failedQuestions || failedQuestions.length === 0) {
      return NextResponse.json({ analysis: `### Flawless Execution, ${firstName}\n\nYou achieved absolute mastery in **${courseCode}**. No intervention required.` });
    }

    // THE HYDRA POOL: Rotating through multiple keys
    const keys = [
      process.env.GROQ_API_KEY,
      process.env.GROQ_API_KEY_2,
      process.env.GROQ_API_KEY_3
    ].filter(key => !!key); // Remove any undefined keys

    const limitedQuestions = failedQuestions.slice(0, 15);
    const prompt = `Act as a Senior Academic Strategist for ${firstName}. 
    Course: ${courseCode}, Score: ${score}/${total}. 
    Failed Data: ${JSON.stringify(limitedQuestions)}
    Task: Provide a direct 2nd-person briefing. 
    Structure: # EXECUTIVE SUMMARY, # COGNITIVE DIAGNOSTICS, # YOUR KNOWLEDGE GAPS, # YOUR RECOVERY ROADMAP.
    Tone: Professional, strict, encouraging. Use Markdown.`;

    let lastError = null;

    // ROTATION LOGIC
    for (let i = 0; i < keys.length; i++) {
      try {
        console.log(`Attempting AI Generation with Key ${i + 1}...`);
        
        const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${keys[i]}`, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 800
          })
        });

        // If Rate Limited, try the next key
        if (aiRes.status === 429) {
          console.warn(`Key ${i + 1} throttled. Rotating...`);
          continue; 
        }

        if (!aiRes.ok) {
          const errData = await aiRes.json();
          throw new Error(errData.error?.message || "Unknown AI Error");
        }

        const aiData = await aiRes.json();
        const content = aiData.choices?.[0]?.message?.content;

        if (content) {
          return NextResponse.json({ analysis: content });
        }

      } catch (err) {
        console.error(`Error with Key ${i + 1}:`, err.message);
        lastError = err.message;
        // Continue to next key
      }
    }

    // IF ALL KEYS FAIL
    return NextResponse.json({ 
      analysis: `### System Congestion\n\n**${firstName}**, our AI Diagnostic Engine is currently under extreme load. \n\n**Quick Tip:** Based on your score of ${score}/${total}, focus on reviewing the questions you marked as "Open" in the Matrix. Please try generating this report again in 60 seconds.` 
    });

  } catch (error) {
    return NextResponse.json({ 
      analysis: "### Diagnostic Offline\n\nTechnical glitch detected. AI Coach temporarily unavailable." 
    }, { status: 200 });
  }
}
