import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-001',
  'qwen/qwen-2.5-72b-instruct',
  'deepseek/deepseek-chat'
];

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) return NextResponse.json({ error: 'API_KEY_MISSING' }, { status: 500 });

    let lastError = null;

    // ARBITRAGE LOOP: Try models until one fires
    for (const model of MODELS) {
      try {
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

        if (response.ok && data.choices?.[0]?.message?.content) {
          return NextResponse.json({ 
            result: data.choices[0].message.content,
            active_node: model 
          });
        }
        
        lastError = data.error?.message || 'Unknown Provider Error';
        console.warn(`Node ${model} failed: ${lastError}`);
        continue; // Try next model
      } catch (err) {
        lastError = err.message;
        continue;
      }
    }

    return NextResponse.json({ 
      error: 'TOTAL_SYSTEM_FAILURE', 
      details: 'All mercenary nodes exhausted.',
      last_provider_error: lastError
    }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
