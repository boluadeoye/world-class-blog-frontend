import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    try {
      // Step 1: Ghost Claw Search
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const searchData = await searchRes.json();
      const context = searchData.vectors ? searchData.vectors.map((v) => v.content).join('\n\n') : 'No web context found.';
      
      // Step 2: Stealth Inference
      const response = await fetch('/api/sovereign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, context })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setOutput(`ERROR: ${data.error}\nSTATUS: ${data.status || '500'}\nDETAILS: ${data.details || 'None'}`);
      } else {
        setOutput(data.result);
      }
    } catch (error) {
      setOutput("EXECUTION_ERROR: LOGIC_COLLAPSE");
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading };
}
