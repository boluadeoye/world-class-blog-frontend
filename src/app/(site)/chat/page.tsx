'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

// --- TYPEWRITER COMPONENT (Simulates Typing) ---
const Typewriter = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');
    
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (indexRef.current < text.length) {
          const nextChar = text.charAt(indexRef.current);
          indexRef.current++;
          return prev + nextChar;
        } else {
          clearInterval(intervalId);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 15); // Speed of typing (lower is faster)

    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

// --- AVATAR COMPONENT (The Glowing Core) ---
const AiAvatar = ({ isThinking }: { isThinking: boolean }) => (
  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
    {/* Outer Glow Ring */}
    <div className={`absolute inset-0 rounded-full bg-amber-500/20 blur-md transition-all duration-1000 ${isThinking ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
    
    {/* Inner Core */}
    <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#000] border border-amber-500/30 flex items-center justify-center shadow-inner shadow-amber-500/20">
      <Cpu size={18} className={`text-amber-500 transition-all duration-500 ${isThinking ? 'animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]' : ''}`} />
    </div>
    
    {/* Orbiting Particle (Animation) */}
    {isThinking && (
      <div className="absolute inset-0 animate-spin-slow">
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(251,191,36,1)]" />
      </div>
    )}
  </div>
);

export default function LivingChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural Link Established. I am ready.' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // True when typewriter is active
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isThinking || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      
      const data = await res.json();
      setIsThinking(false);
      setIsTyping(true); // Start typewriter effect
      
      // Add message but render it via Typewriter
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, isNew: true }]);
      
    } catch (e) {
      setIsThinking(false);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Signal lost. Please retry.', isNew: true }]);
    }
  };

  return (
    <main className="fixed inset-0 bg-[#020617] text-slate-200 font-sans overflow-hidden flex flex-col">
      
      {/* --- BEAMING ATMOSPHERE --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central Beam */}
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[150px] rounded-full animate-pulse-slow" />
        
        {/* Moving Aurora */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-900/10 to-transparent opacity-50" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-20 p-6 border-b border-white/5 flex items-center justify-between bg-[#020617]/60 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-serif text-white tracking-wide flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <span>BOLU <span className="text-slate-600 italic">AI</span></span>
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isThinking ? 'animate-ping' : ''}`} />
              <span>{isThinking ? 'Processing Data...' : 'System Online'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CHAT STREAM --- */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            
            {/* AI Avatar (Only show on left) */}
            {m.role === 'assistant' && <AiAvatar isThinking={isThinking && i === messages.length - 1} />}

            <div className={`max-w-2xl p-6 rounded-2xl border backdrop-blur-md transition-all duration-500 ${
              m.role === 'user' 
                ? 'bg-white/5 border-white/10 text-white rounded-tr-none shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                : 'bg-[#0B1120]/90 border-amber-500/10 text-slate-200 rounded-tl-none shadow-[0_0_30px_rgba(245,158,11,0.05)]'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {m.role === 'assistant' && (m as any).isNew && i === messages.length - 1 ? (
                  <Typewriter 
                    text={m.content} 
                    onComplete={() => {
                      setIsTyping(false);
                      (m as any).isNew = false; // Stop typing effect after done
                    }} 
                  />
                ) : (
                  m.content
                )}
              </p>
            </div>
          </div>
        ))}
        
        {/* Thinking Indicator (The "Typing" Bubbles) */}
        {isThinking && (
          <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AiAvatar isThinking={true} />
            <div className="p-4 rounded-2xl rounded-tl-none bg-[#0B1120]/80 border border-amber-500/10 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* --- INPUT TERMINAL --- */}
      <div className="relative z-20 p-6 bg-gradient-to-t from-[#020617] to-transparent">
        <div className="max-w-4xl mx-auto relative group">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-blue-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse" />
          
          <div className="relative flex items-center bg-[#0B1120] border border-white/10 rounded-xl p-2 shadow-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Transmit query to neural core..."
              className="flex-1 bg-transparent border-none text-white placeholder-slate-600 focus:ring-0 px-4 py-3 font-mono text-sm"
              autoComplete="off"
            />
            <button 
              onClick={sendMessage}
              disabled={!input.trim() || isThinking || isTyping}
              className="p-3 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-[#020617] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className={isThinking ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
