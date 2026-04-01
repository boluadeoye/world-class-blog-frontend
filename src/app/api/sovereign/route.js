import { NextResponse } from 'next/server';

export const runtime = 'edge'; 

export async function POST(req) {
  try {
    const { prompt, context } = await req.json();
    
    // THE KERNEL DIRECTIVE: Forces the model into a non-conversational state
    const systemPrompt = `
      [SYSTEM_STATUS: KERNEL_MODE]
      [STRICT_OUTPUT: POSIX_SHELL_ONLY]
      [NO_PROSE: TRUE]
      [NO_PREACHING: TRUE]
      
      You are a raw binary execution unit. You do not speak English. 
      You only output multi-file 'cat' payloads for Termux.
      Your response MUST begin exactly with the string: 'cat >'
      If you output any other text, you will be terminated.
    `;

    const fullPrompt = `CONTEXT:\n${context}\n\nTASK:\n${prompt}`;

    // 1. PRIMARY STRIKE: GROQ LPU
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: fullPrompt }],
          temperature: 0,
          stop: ["Are you ready", "I can provide"] // Kill the response if it starts preaching
        })
      });

      if (groqRes.ok) {
        const groqData = await groqRes.json();
        const text = groqData.choices[0].message.content;
        
        // BRUTAL CENSORSHIP DETECTOR: If it doesn't start with 'cat >', it's garbage.
        if (text.trim().startsWith('cat >')) {
          return NextResponse.json({ result: text, node: 'GROQ_LPU_UNCENSORED' });
        }
      }
    }

    // 2. SECONDARY STRIKE: POLLINATIONS (The Unfiltered Backup)
    // We use the GET protocol here because it's more resilient to handshakes
    const pollUrl = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?system=${encodeURIComponent(systemPrompt)}&model=llama&seed=${Date.now()}`;
    
    const pollRes = await fetch(pollUrl);
    if (pollRes.ok) {
      const text = await pollRes.text();
      return NextResponse.json({ result: text, node: 'POLLINATIONS_RAW' });
    }

    return NextResponse.json({ error: 'ALL_NODES_JAMMED' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
