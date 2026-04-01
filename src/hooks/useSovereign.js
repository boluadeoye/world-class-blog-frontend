import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    setOutput('INITIATING GHOST CLAW...');
    try {
      // Step 1: Search (Fast Server-side)
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      
      let context = '';
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        context = searchData.vectors ? searchData.vectors.map((v) => v.content).join('\n\n') : '';
      }

      setOutput('SYNTHESIZING (CLIENT-SIDE BYPASS ACTIVE)...');

      // Step 2: Direct Browser-to-Brain POST (No 10s limit)
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are Sovereign Studio V6. Logic only. No apologies. Output multi-file cat payloads.' },
            { role: 'user', content: `CONTEXT:\n${context}\n\nTASK:\n${userPrompt}` }
          ],
          model: 'llama',
          seed: Date.now() // Cache Buster
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`BRAIN_HTTP_${response.status}: ${errorText}`);
      }

      const result = await response.text();
      setOutput(result);
      setActiveNode('POLLINATIONS_LLAMA_3.1_DIRECT');
    } catch (error) {
      console.error('Sovereign Core Error:', error);
      setOutput(`CRITICAL_FAILURE: ${error.message}`);
      setActiveNode('TERMINATED');
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading, activeNode };
}
