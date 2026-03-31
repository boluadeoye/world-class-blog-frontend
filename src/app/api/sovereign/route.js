import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, context, model = 'meta-llama/llama-3.1-70b-instruct:free' } = await req.json();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://boluadeoye.com.ng',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: 'You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.' },
          { role: 'user', content: `CONTEXT:\n${context}\n\nTASK:\n${prompt}` }
        ],
        temperature: 0
      })
    });

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'INFERENCE_FAILURE' }, { status: 500 });
  }
}
