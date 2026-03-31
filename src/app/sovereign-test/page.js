'use client';
import { useState } from 'react';
import { useSovereign } from '@/hooks/useSovereign';

export default function FiringRange() {
  const [prompt, setPrompt] = useState('');
  const { execute, output, loading } = useSovereign();

  return (
    <div style={{ padding: '20px', background: '#000', color: '#0f0', minHeight: '100vh', fontFamily: 'monospace' }}>
      <h1>SOVEREIGN_CORE_V6: FIRING RANGE</h1>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', height: '100px', background: '#111', color: '#0f0', border: '1px solid #0f0', padding: '10px' }}
        placeholder="ENTER BRUTAL COMMAND..."
      />
      <button 
        onClick={() => execute(prompt)}
        style={{ marginTop: '10px', padding: '10px 20px', background: '#0f0', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'FIRING...' : 'EXECUTE'}
      </button>
      <pre style={{ marginTop: '20px', whiteSpace: 'pre-wrap', borderTop: '1px dashed #0f0', paddingTop: '20px' }}>
        {output || 'AWAITING INPUT...'}
      </pre>
    </div>
  );
}
