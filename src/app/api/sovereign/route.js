import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    // NODE 1: POLLINATIONS (NO-AUTH, UNCENSORED LLAMA 3.1)
    try {
      const pollRes = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.' },
            { role: 'user', content: `CONTEXT:\n${context}\n\nTASK:\n${prompt}` }
          ],
          model: 'llama',
          seed: Math.floor(Math.random() * 1000000)
        })
      });

      if (pollRes.ok) {
        const text = await pollRes.text();
        if (text && !text.includes('{"error"')) {
          return NextResponse.json({ result: text, active_node: 'POLLINATIONS_LLAMA_3.1' });
        }
      }
    } catch (e) {
      console.warn('Pollinations failed, falling back to OpenRouter...', e);
    }

    // NODE 2: OPENROUTER FALLBACK (Requires Credits/Verification)
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (apiKey) {
      const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://boluadeoye.com.ng'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages: [
            { role: 'system', content: 'You are Sovereign Studio. Logic only. No apologies.' },
            { role: 'user', content: `CONTEXT:\n${context}\n\nTASK:\n${prompt}` }
          ],
          temperature: 0
        })
      });

      const orData = await orRes.json();
      if (orRes.ok && orData.choices?.[0]?.message?.content) {
        return NextResponse.json({ result: orData.choices[0].message.content, active_node: 'OPENROUTER_LLAMA_3.3' });
      }
      return NextResponse.json({ error: 'OPENROUTER_REJECTED', details: orData.error?.message }, { status: 502 });
    }

    return NextResponse.json({ error: 'TOTAL_SYSTEM_FAILURE', details: 'Pollinations down and OpenRouter key missing/invalid.' }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
