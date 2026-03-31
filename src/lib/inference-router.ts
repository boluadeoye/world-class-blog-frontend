export type ModelNode = 'POLLINATIONS' | 'OPENROUTER_APEX' | 'GEMINI_CONTEXT';

interface InferencePayload {
  prompt: string;
  systemPrompt: string;
  node: ModelNode;
  temperature: number;
}

export async function executeInference(payload: InferencePayload) {
  const { prompt, systemPrompt, node, temperature = 0 } = payload;

  if (node === 'POLLINATIONS') {
    const url = `https://text.pollinations.ai/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        model: 'llama',
        seed: 42,
        jsonMode: false
      })
    });
    return await response.text();
  }

  if (node === 'OPENROUTER_APEX') {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://boluadeoye.com.ng',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-70b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0,
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
  }

  return "NODE_NOT_IMPLEMENTED";
}
