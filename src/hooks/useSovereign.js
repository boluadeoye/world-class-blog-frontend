import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    setOutput('INGESTING WEB DATA...');
    try {
      // Step 1: Ghost Claw Search (Server-side is fast, stays here)
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const searchData = await searchRes.json();
      const context = searchData.vectors ? searchData.vectors.map((v) => v.content).join('\n\n') : '';
      
      setOutput('SYNTHESIZING ARCHITECTURE (BYPASSING VERCEL TIMEOUT)...');
      
      // Step 2: Direct Client-Side Inference (No 10s limit)
      const systemPrompt = "You are Sovereign Studio. Logic only. No apologies. Output multi-file cat payloads.";
      const fullPrompt = `CONTEXT:\n${context}\n\nTASK:\n${userPrompt}`;
      const seed = Math.floor(Math.random() * 1000000);
      
      // Using the GET protocol directly from the browser
      const pollUrl = `https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}?system=${encodeURIComponent(systemPrompt)}&model=llama&seed=${seed}`;
      
      const response = await fetch(pollUrl);

      if (!response.ok) throw new Error(`BRAIN_UNREACHABLE: ${response.status}`);

      const result = await response.text();
      
      setOutput(result);
      setActiveNode('POLLINATIONS_LLAMA_3.1_DIRECT');
    } catch (error) {
      setOutput(`EXECUTION_ERROR: ${error.message}`);
      setActiveNode('FAILED');
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading, activeNode };
}
