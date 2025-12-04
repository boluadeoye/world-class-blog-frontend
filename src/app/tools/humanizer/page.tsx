'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Copy, ShieldCheck, Activity, Zap, Sliders, History, Trash2, Check } from 'lucide-react';

export default function HumanizerTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // CONFIG
  const [mode, setMode] = useState('ghost');
  const [tone, setTone] = useState('casual'); // Casual beats detectors better
  
  // METRICS
  const [stats, setStats] = useState({ burstiness: 0, humanScore: 0 });

  // Load History on Mount
  useEffect(() => {
    const saved = localStorage.getItem('stealth_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (text: string) => {
    const newHistory = [text, ...history].slice(0, 5); // Keep last 5
    setHistory(newHistory);
    localStorage.setItem('stealth_history', JSON.stringify(newHistory));
  };

  const analyzeText = (text: string) => {
    if (!text.trim()) return { burstiness: 0, humanScore: 0 };
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.trim().split(/\s+/);
    if (sentences.length === 0) return { burstiness: 0, humanScore: 0 };

    const lengths = sentences.map(s => s.trim().split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
    const burstiness = Math.min(100, Math.round(Math.sqrt(variance) * 15)); // Tuned for V4
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const richness = (uniqueWords / words.length) * 100;
    
    const humanScore = Math.min(100, Math.round((burstiness * 0.6) + (richness * 0.4)));
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
      saveToHistory(data.result);
      
    } catch (err: any) {
      setError(err.message || 'System Error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 pt-24 pb-12 relative overflow-hidden">
      
      {/* BACKGROUND NOISE */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Stealth Protocol V4.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            Stealth<span className="text-amber-500 italic">Writer</span>
          </h1>
        </div>

        {/* HUD METRICS (GOLD THEME) */}
        <div className="flex gap-8 p-4 bg-[#0B1120]/80 backdrop-blur-md rounded-xl border border-amber-500/10 shadow-2xl shadow-black/50">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Burstiness</div>
            <div className={`text-2xl font-mono font-bold ${stats.burstiness > 65 ? 'text-amber-400' : 'text-slate-500'}`}>
              {stats.burstiness}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Human Score</div>
            <div className={`text-2xl font-mono font-bold ${stats.humanScore > 88 ? 'text-emerald-400' : 'text-amber-500'}`}>
              {stats.humanScore}
            </div>
          </div>
        </div>
      </div>

      {/* CONTROL DECK */}
      <div className="max-w-7xl mx-auto px-6 mb-6 relative z-10">
        <div className="flex flex-wrap justify-between gap-4 p-4 bg-[#0B1120]/50 border border-white/5 rounded-xl items-center backdrop-blur-sm">
          
          <div className="flex gap-4">
            {/* MODE */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold uppercase">Mode</span>
              <select 
                value={mode} 
                onChange={(e) => setMode(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-amber-500 focus:outline-none focus:border-amber-500/50"
              >
                <option value="ghost">👻 Ghost (Max Stealth)</option>
                <option value="academic">🎓 Academic</option>
                <option value="casual">☕ Casual</option>
              </select>
            </div>

            {/* TONE */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold uppercase">Tone</span>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-amber-500 focus:outline-none focus:border-amber-500/50"
              >
                <option value="casual">Casual (Best)</option>
                <option value="professional">Professional</option>
                <option value="storyteller">Storyteller</option>
                <option value="blunt">Blunt</option>
              </select>
            </div>
          </div>

          {/* HISTORY TOGGLE */}
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${showHistory ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-400 hover:text-white'}`}
          >
            <History size={14} /> Vault
          </button>
        </div>
      </div>

      {/* WORKSPACE */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[65vh] relative z-10">
        
        {/* INPUT */}
        <div className={`${showHistory ? 'lg:col-span-4' : 'lg:col-span-6'} flex flex-col gap-3 transition-all duration-500`}>
          <label className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Zap size={12} /> Input Source</span>
          </label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste AI-generated text here..."
            className="flex-1 bg-[#0B1120] border border-white/5 rounded-2xl p-6 text-slate-300 focus:outline-none focus:border-amber-500/30 focus:bg-[#0f1629] resize-none font-mono text-sm leading-relaxed transition-all"
          />
        </div>

        {/* OUTPUT */}
        <div className={`${showHistory ? 'lg:col-span-5' : 'lg:col-span-6'} flex flex-col gap-3 transition-all duration-500 relative`}>
          <label className="flex items-center justify-between text-xs font-bold text-amber-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Activity size={12} /> Humanized Output</span>
            {output && (
              <button 
                onClick={() => navigator.clipboard.writeText(output)}
                className="flex items-center gap-1 text-amber-500 hover:text-white transition-colors"
              >
                <Copy size={14} /> <span className="text-[10px]">COPY</span>
              </button>
            )}
          </label>
          
          <div className="flex-1 bg-[#0B1120] border border-amber-500/20 rounded-2xl p-6 text-amber-100/90 relative overflow-hidden shadow-2xl shadow-black/50">
            {isProcessing ? (
              <div className="absolute inset-0 bg-[#020617]/90 flex items-center justify-center z-10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-amber-500 animate-pulse tracking-widest">SCRAMBLING SIGNATURES...</span>
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

        {/* HISTORY SIDEBAR (Animated) */}
        {showHistory && (
          <div className="lg:col-span-3 flex flex-col gap-3 bg-[#0B1120] border border-white/5 rounded-2xl p-4 overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              <span>Vault</span>
              <button onClick={() => {setHistory([]); localStorage.removeItem('stealth_history')}} className="hover:text-rose-500"><Trash2 size={12}/></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {history.length === 0 && <div className="text-slate-600 text-xs italic text-center mt-10">No history yet.</div>}
              {history.map((item, i) => (
                <div key={i} onClick={() => setOutput(item)} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-amber-500/30 cursor-pointer transition-all text-xs text-slate-400 line-clamp-3 hover:text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ACTION BUTTON */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-center relative z-10">
        <button 
          onClick={handleHumanize}
          disabled={!input || isProcessing}
          className="group relative flex items-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-[#020617] font-bold rounded-full shadow-2xl shadow-amber-900/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Wand2 size={20} />
          <span className="relative tracking-widest text-sm">HUMANIZE</span>
        </button>
      </div>

    </main>
  );
}
