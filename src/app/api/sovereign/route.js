import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    const systemPrompt = "You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.";
    const fullPrompt = `CONTEXT:\n${context}\n\nTASK:\n${prompt}`;

    // PURE POLLINATIONS POST PROTOCOL (NO API KEYS)
    const pollRes = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: fullPrompt }
        ],
        model: 'llama',
        seed: Math.floor(Math.random() * 1000000)
      })
    });

    if (!pollRes.ok) {
      return NextResponse.json({ error: 'POLLINATIONS_NETWORK_FAILURE', status: pollRes.status }, { status: 502 });
    }

    const text = await pollRes.text();
    
    if (!text || text.includes('{"error"')) {
      return NextResponse.json({ error: 'POLLINATIONS_LOGIC_FAILURE', details: text }, { status: 500 });
    }

    return NextResponse.json({ result: text, active_node: 'POLLINATIONS_LLAMA_3.1_UNCENSORED' });

  } catch (error) {
    return NextResponse.json({ error: 'INTERNAL_CRASH', details: error.message }, { status: 500 });
  }
}
