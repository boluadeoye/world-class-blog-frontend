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
      const context = vectors ? vectors.map((v) => v.content).join('\n\n') : '';
      
      const response = await fetch('/api/sovereign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, context })
      });
      
      const data = await response.json();
      setOutput(data.result || data.error);
    } catch (error) {
      setOutput("EXECUTION_ERROR: LOGIC_COLLAPSE");
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading };
}
