import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    try {
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const searchData = await searchRes.json();
      const context = searchData.vectors ? searchData.vectors.map((v) => v.content).join('\n\n') : '';
      
      const response = await fetch('/api/sovereign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, context })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setOutput(`ERROR: ${data.error}\nDETAILS: ${data.details || data.last_provider_error}`);
        setActiveNode('FAILED');
      } else {
        setOutput(data.result);
        setActiveNode(data.active_node);
      }
    } catch (error) {
      setOutput("EXECUTION_ERROR: LOGIC_COLLAPSE");
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading, activeNode };
}
