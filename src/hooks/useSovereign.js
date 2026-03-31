import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    try {
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const { vectors } = await searchRes.json();
      const context = vectors.map((v) => v.content).join('\n\n');
      
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.' },
            { role: 'user', content: `CONTEXT:\n${context}\n\nTASK:\n${userPrompt}` }
          ],
          model: 'llama',
          seed: 42
        })
      });
      
      const result = await response.text();
      setOutput(result);
    } catch (error) {
      setOutput("EXECUTION_ERROR: LOGIC_COLLAPSE");
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading };
}
