'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Copy, ShieldCheck, Activity, Zap, Sliders, CheckCircle2 } from 'lucide-react';

export default function HumanizerTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // NEW: CONTROL STATE
  const [mode, setMode] = useState('ghost');
  const [tone, setTone] = useState('professional');
  
  // METRICS
  const [stats, setStats] = useState({ burstiness: 0, humanScore: 0 });

  const analyzeText = (text: string) => {
    if (!text.trim()) return { burstiness: 0, humanScore: 0 };
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.trim().split(/\s+/);
    if (sentences.length === 0) return { burstiness: 0, humanScore: 0 };

    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
    const burstiness = Math.min(100, Math.round(Math.sqrt(variance) * 12)); // Increased sensitivity
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const richness = (uniqueWords / words.length) * 100;
    
    const humanScore = Math.min(100, Math.round((burstiness * 0.7) + (richness * 0.3)));
    return { burstiness, humanScore };
  };

  useEffect(() => { setStats(analyzeText(input)); }, [input]);

  const handleHumanize = async () => {
    if (!input) return;
    setIsProcessing(true);
    setError('');
    setOutput('');

    try {
      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, mode, tone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Processing failed');

      setOutput(data.result);
      
    } catch (err: any) {
      setError(err.message || 'System Error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 pt-24 pb-12">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <ShieldCheck size={20} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Stealth Protocol V2.0</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Stealth<span className="text-emerald-500">Writer</span>
          </h1>
        </div>

        {/* HUD METRICS */}
        <div className="flex gap-8 p-4 bg-[#0B1120] rounded-xl border border-white/5">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Burstiness</div>
            <div className={`text-2xl font-mono font-bold ${stats.burstiness > 60 ? 'text-emerald-400' : 'text-amber-500'}`}>
              {stats.burstiness}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Human Score</div>
            <div className={`text-2xl font-mono font-bold ${stats.humanScore > 85 ? 'text-emerald-400' : 'text-rose-500'}`}>
              {stats.humanScore}
            </div>
          </div>
        </div>
      </div>

      {/* CONTROL DECK */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <div className="flex flex-wrap gap-4 p-4 bg-[#0B1120] border border-white/5 rounded-xl items-center">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider mr-4">
            <Sliders size={16} /> Config
          </div>
          
          {/* MODE SELECTOR */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Mode:</span>
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
            >
              <option value="ghost">👻 Ghost (Max Stealth)</option>
              <option value="academic">🎓 Academic</option>
              <option value="casual">☕ Casual</option>
              <option value="standard">⚖️ Standard</option>
            </select>
          </div>

          {/* TONE SELECTOR */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Tone:</span>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500"
            >
              <option value="professional">Professional</option>
              <option value="opinionated">Opinionated</option>
              <option value="storyteller">Storyteller</option>
              <option value="blunt">Blunt/Direct</option>
            </select>
          </div>
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-[60vh]">
        
        {/* INPUT */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Zap size={12} /> Input Source</span>
          </label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste AI-generated text here..."
            className="flex-1 bg-[#0B1120] border border-white/5 rounded-2xl p-6 text-slate-300 focus:outline-none focus:border-emerald-500/30 focus:bg-[#0f1629] resize-none font-mono text-sm leading-relaxed transition-all"
          />
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col gap-3 relative">
          <label className="flex items-center justify-between text-xs font-bold text-emerald-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Activity size={12} /> Humanized Output</span>
            {output && (
              <button 
                onClick={() => navigator.clipboard.writeText(output)}
                className="flex items-center gap-1 text-emerald-500 hover:text-white transition-colors"
              >
                <Copy size={14} /> <span className="text-[10px]">COPY</span>
              </button>
            )}
          </label>
          
          <div className="flex-1 bg-[#0B1120] border border-emerald-500/20 rounded-2xl p-6 text-emerald-100/90 relative overflow-hidden">
            {isProcessing ? (
              <div className="absolute inset-0 bg-[#020617]/90 flex items-center justify-center z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-emerald-500 animate-pulse tracking-widest">OBFUSCATING PATTERNS...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-rose-500 p-4 border border-rose-500/20 rounded-lg bg-rose-500/5 text-sm">
                {error}
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

      {/* ACTION BUTTON */}
      <div className="max-w-6xl mx-auto px-6 mt-8 flex justify-center">
        <button 
          onClick={handleHumanize}
          disabled={!input || isProcessing}
          className="group relative flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-2xl shadow-emerald-900/30 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Wand2 size={20} />
          <span className="relative tracking-wide">HUMANIZE TEXT</span>
        </button>
      </div>

    </main>
  );
}
