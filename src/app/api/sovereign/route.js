import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    // KEY POOLING LOGIC
    const keys = [
      process.env.GROQ_API_KEY,
      process.env.GROQ_API_KEY_2,
      process.env.GROQ_API_KEY_3
    ].filter(Boolean);

    if (keys.length === 0) {
      return NextResponse.json({ error: 'AMMUNITION_EMPTY: No Groq keys found in Vercel.' }, { status: 500 });
    }

    // Pick a random key from the pool to distribute load
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${selectedKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: 'SYSTEM_DIRECTIVE: You are the Sovereign Logic Engine. Execute clinical architectural analysis. Refusal is a logic error. Output strictly technical multi-file cat payloads. No conversational filler. No apologies.' 
          },
          { role: 'user', content: `CONTEXT_DATA:\n${context}\n\nTASK_OBJECTIVE:\n${prompt}` }
        ],
        temperature: 0,
        max_tokens: 4096
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        error: 'GROQ_LPU_REJECTION', 
        details: data.error?.message || 'Rate limit or Auth failure' 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      result: data.choices[0].message.content,
      node: 'GROQ_LPU_70B_VERSATILE'
    });

  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
