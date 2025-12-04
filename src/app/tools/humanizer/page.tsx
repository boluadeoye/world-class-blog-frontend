'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Copy, ShieldCheck, Activity, Zap } from 'lucide-react';

export default function HumanizerTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // METRICS STATE
  const [stats, setStats] = useState({ 
    burstiness: 0, 
    perplexity: 0, 
    humanScore: 0 
  });

  // --- LOCAL ANALYSIS ENGINE ---
  // This runs instantly in the browser to score your text
  const analyzeText = (text: string) => {
    if (!text.trim()) return { burstiness: 0, perplexity: 0, humanScore: 0 };

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.trim().split(/\s+/);
    
    if (sentences.length === 0) return { burstiness: 0, perplexity: 0, humanScore: 0 };

    // 1. Burstiness (Variance in sentence length)
    // AI writes uniform sentences. Humans write chaotic lengths.
    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
    // Scale variance to a 0-100 score
    const burstiness = Math.min(100, Math.round(Math.sqrt(variance) * 10));

    // 2. Perplexity (Vocabulary Richness)
    // AI uses common words. Humans use rare words.
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const richness = (uniqueWords / words.length) * 100;
    const perplexity = Math.min(100, Math.round(richness * 1.5));

    // 3. Estimated Human Score
    const humanScore = Math.round((burstiness * 0.6) + (perplexity * 0.4));

    return { burstiness, perplexity, humanScore };
  };

  // Update stats whenever input changes
  useEffect(() => {
    setStats(analyzeText(input));
  }, [input]);

  const handleHumanize = () => {
    setIsProcessing(true);
    
    // SIMULATION MODE (Waiting for Backend)
    setTimeout(() => {
      setIsProcessing(false);
      setOutput("System Ready. Waiting for API Key configuration to enable Neural Rewriting engine.");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-emerald-500/30 pt-24 pb-12">
      
      {/* --- HEADER --- */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <ShieldCheck size={20} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Stealth Protocol v1.0</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Stealth<span className="text-emerald-500">Writer</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Advanced text humanization engine. Target Score: &lt; 20% Detection.
          </p>
        </div>

        {/* HUD METRICS */}
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Burstiness</div>
            <div className={`text-2xl font-mono font-bold ${stats.burstiness > 50 ? 'text-emerald-400' : 'text-amber-500'}`}>
              {stats.burstiness}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Human Score</div>
            <div className={`text-2xl font-mono font-bold ${stats.humanScore > 80 ? 'text-emerald-400' : 'text-rose-500'}`}>
              {stats.humanScore}
            </div>
          </div>
        </div>
      </div>

      {/* --- WORKSPACE --- */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh]">
        
        {/* INPUT (AI) */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Zap size={12} /> Input Source</span>
            <span className="text-slate-600">{input.split(/\s+/).filter(w => w).length} words</span>
          </label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste AI-generated text here..."
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 text-slate-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none font-mono text-sm leading-relaxed transition-all"
          />
        </div>

        {/* OUTPUT (HUMAN) */}
        <div className="flex flex-col gap-3 relative">
          <label className="flex items-center justify-between text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Activity size={12} /> Humanized Output</span>
            {output && <Copy size={14} className="cursor-pointer hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(output)} />}
          </label>
          
          <div className="flex-1 bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl p-6 text-emerald-100/90 relative overflow-hidden">
            {isProcessing ? (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-emerald-500 animate-pulse tracking-widest">REWRITING PATTERNS...</span>
                </div>
              </div>
            ) : (
              <textarea 
                readOnly
                value={output}
                placeholder="Processed text will appear here..."
                className="w-full h-full bg-transparent border-none focus:outline-none resize-none font-mono text-sm leading-relaxed"
              />
            )}
          </div>
        </div>

      </div>

      {/* --- CONTROLS --- */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-center">
        <button 
          onClick={handleHumanize}
          disabled={!input || isProcessing}
          className="group relative flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Wand2 size={20} />
          <span className="relative">HUMANIZE TEXT</span>
        </button>
      </div>

    </main>
  );
}
