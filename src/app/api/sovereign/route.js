import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, context, model = 'meta-llama/llama-3.3-70b-instruct:free' } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API_KEY_MISSING' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://boluadeoye.com.ng',
        'X-Title': 'Sovereign Studio V6'
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

    if (!response.ok) {
      // Log the specific OpenRouter error for Termux debugging
      console.error('OpenRouter Error:', data);
      return NextResponse.json({ 
        error: 'OPENROUTER_REJECTION', 
        status: response.status,
        details: data.error?.message || 'Check Model ID or Credits'
      }, { status: response.status });
    }

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
