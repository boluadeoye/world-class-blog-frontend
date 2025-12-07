'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Terminal, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NeuralInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural Link Established. I am the digital consciousness of Boluwatife. Accessing archives... How may I assist you?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection severed. Retrying protocol...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="fixed inset-0 bg-[#020617] text-slate-200 font-sans overflow-hidden flex flex-col">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-10 p-6 border-b border-white/5 flex items-center justify-between bg-[#020617]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-serif text-white tracking-wide flex items-center gap-2">
              <Cpu size={18} className="text-amber-500" />
              <span>NEURAL <span className="text-slate-600 italic">LINK</span></span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CHAT STREAM --- */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-6 md:p-12 space-y-8 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl p-6 rounded-2xl border backdrop-blur-sm ${
              m.role === 'user' 
                ? 'bg-white/5 border-white/10 text-white rounded-tr-none' 
                : 'bg-[#0B1120]/80 border-amber-500/10 text-slate-300 rounded-tl-none shadow-2xl shadow-black/50'
            }`}>
              {m.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3 text-amber-500/50 text-xs font-bold tracking-widest uppercase">
                  <Terminal size={12} />
                  <span>System Response</span>
                </div>
              )}
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {m.content}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
              <Sparkles size={14} className="text-amber-500 animate-spin" />
              <span className="text-xs font-mono text-slate-500">Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* --- INPUT TERMINAL --- */}
      <div className="relative z-10 p-6 bg-[#020617] border-t border-white/5">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative flex items-center bg-[#0B1120] border border-white/10 rounded-xl p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Enter command or query..."
              className="flex-1 bg-transparent border-none text-white placeholder-slate-600 focus:ring-0 px-4 py-3 font-mono text-sm"
              autoComplete="off"
            />
            <button 
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-[#020617] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
