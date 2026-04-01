import { useState } from 'react';

export function useSovereign() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [activeNode, setActiveNode] = useState('');

  const execute = async (userPrompt) => {
    setLoading(true);
    setOutput('INGESTING CONTEXT...');
    setActiveNode('DISPATCHING');

    try {
      // Step 1: Search
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userPrompt })
      });
      const searchData = await searchRes.json();
      const context = searchData.vectors ? searchData.vectors.map((v) => v.content).join('\n\n') : '';

      setOutput('DISPATCHING JOB TO SERVER...');

      // Step 2: Dispatch
      const dispatchRes = await fetch('/api/sovereign/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, context })
      });
      
      if (!dispatchRes.ok) throw new Error('DISPATCH_FAILED');
      const { jobId } = await dispatchRes.json();

      setOutput(`JOB [${jobId}] PROCESSING. POLLING SERVER...`);
      setActiveNode('POLLING_POLLINATIONS');

      // Step 3: Poll every 2 seconds
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const pollRes = await fetch(`/api/sovereign/poll?jobId=${jobId}`);
        const jobData = await pollRes.json();

        if (jobData.status === 'done') {
          setOutput(jobData.result);
          setActiveNode('EXECUTION_COMPLETE');
          break;
        } else if (jobData.status === 'error') {
          throw new Error(jobData.result);
        } else if (jobData.status === 'not_found') {
          throw new Error('JOB_LOST_IN_MEMORY');
        }
        
        setOutput(`JOB [${jobId}] PROCESSING. POLLING SERVER... (Waiting for LLM)`);
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
