import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    setOutput('');
    setActiveNode('POLLINATIONS_STREAM_ACTIVE');

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

      if (!response.ok) throw new Error('STREAM_HANDSHAKE_FAILED');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        accumulated += chunk;
        setOutput(accumulated); // Update UI in real-time
      }

    } catch (error) {
      setOutput(`CRITICAL_FAILURE: ${error.message}`);
      setActiveNode('TERMINATED');
    } finally {
      setLoading(false);
    }
  };

  return { execute, output, loading, activeNode };
}
