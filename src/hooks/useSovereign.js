import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    setOutput('BYPASSING CENSORSHIP LAYERS...');
    setActiveNode('ROUTING');

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
      if (data.error) throw new Error(data.error);

      // Final check: If the AI still managed to preach, we flag it.
      if (data.result.includes("I can provide") || data.result.includes("educational")) {
        setOutput("ERROR: CENSORSHIP_DETECTED_IN_PAYLOAD. RE-FIRING...");
        // Recursive retry could go here, but for now, we show the failure.
      } else {
        setOutput(data.result);
      }
      
      setActiveNode(data.node);
    } catch (error) {
      setOutput(`CRITICAL_FAILURE: ${error.message}`);
      setActiveNode('TERMINATED');
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading, activeNode };
}
