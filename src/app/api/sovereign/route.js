import { NextResponse } from 'next/server';
import { SOVEREIGN_SYSTEM_PROMPT } from '@/lib/prompts';

export const runtime = 'edge'; 

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    // DETERMINISTIC GATEKEEPER
    const wordCount = prompt.trim().split(/\s+/).length;
    if (prompt.length < 15 || wordCount < 4) {
      return NextResponse.json({ 
        result: "ERROR: NULL_OBJECTIVE. Input lacks architectural entropy. Provide a complex directive.", 
        node: "SOVEREIGN_GATEKEEPER (EDGE)" 
      });
    }

    const fullPrompt = `CONTEXT:\n${context}\n\nTASK:\n${prompt}`;
    const groqKey = process.env.GROQ_API_KEY;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SOVEREIGN_SYSTEM_PROMPT }, { role: 'user', content: fullPrompt }],
        temperature: 0
      })
    });

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content, node: 'GROQ_LPU_70B' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
