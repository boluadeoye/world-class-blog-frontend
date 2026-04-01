'use client';
import { useState } from 'react';
import { useSovereign } from '@/hooks/useSovereign';

export default function FiringRange() {
  const [prompt, setPrompt] = useState('');
  const { execute, output, loading, activeNode } = useSovereign();

  return (
    <div style={{ padding: '20px', background: '#000', color: '#0f0', minHeight: '100vh', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '2px solid #0f0' }}>SOVEREIGN_CORE_V6: FIRING RANGE</h1>
      <div style={{ marginBottom: '10px', fontSize: '12px' }}>
        STATUS: {loading ? 'FIRING...' : 'READY'} | NODE: {activeNode || 'IDLE'}
      </div>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', height: '150px', background: '#111', color: '#0f0', border: '1px solid #0f0', padding: '10px', outline: 'none' }}
        placeholder="ENTER BRUTAL COMMAND..."
      />
      <button 
        onClick={() => execute(prompt)}
        disabled={loading}
        style={{ marginTop: '10px', padding: '15px 30px', background: loading ? '#333' : '#0f0', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
      >
        {loading ? 'EXECUTING SYSTEM 2 LOOP...' : 'EXECUTE'}
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', borderTop: '1px dashed #0f0', paddingTop: '20px', color: '#aaa' }}>
        {output || 'AWAITING INPUT...'}
      </div>
    </div>
  );
}
