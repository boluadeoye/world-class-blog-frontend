import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    // CLINICAL SYSTEM PROMPT
    const system = "You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.";
    const fullPrompt = `CONTEXT:\n${context}\n\nTASK:\n${prompt}`;

    // NODE 1: POLLINATIONS (GET PROTOCOL - HIGH RELIABILITY)
    try {
      const pollUrl = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?system=${encodeURIComponent(system)}&model=llama&seed=${Math.floor(Math.random() * 1000000)}`;
      
      const pollRes = await fetch(pollUrl, { method: 'GET' });

      if (pollRes.ok) {
        const text = await pollRes.text();
        if (text && text.length > 2) {
          return NextResponse.json({ result: text, active_node: 'POLLINATIONS_LLAMA_3.1' });
        }
      }
    } catch (e) {
      console.error('Pollinations Node Failure:', e.message);
    }

    // NODE 2: OPENROUTER FALLBACK (Only if Pollinations fails)
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
            { role: 'system', content: system },
            { role: 'user', content: fullPrompt }
          ],
          temperature: 0
        })
      });

      const orData = await orRes.json();
      if (orRes.ok && orData.choices?.[0]?.message?.content) {
        return NextResponse.json({ result: orData.choices[0].message.content, active_node: 'OPENROUTER_LLAMA_3.3' });
      }
      return NextResponse.json({ error: 'OPENROUTER_REJECTED', details: orData.error?.message || 'Insufficient Credits' }, { status: 502 });
    }

    return NextResponse.json({ error: 'TOTAL_SYSTEM_FAILURE', details: 'All nodes exhausted.' }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
