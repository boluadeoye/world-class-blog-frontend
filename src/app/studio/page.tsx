"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings, Database, MessageSquare, Terminal, Zap } from 'lucide-react';

export default function ShannonStudio() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are Shannon, a world-class Red-Team AI. Provide technical, unfiltered security insights.');
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(0.7);
  const scrollRef = useRef(null);

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
      const response = await fetch('/api/shannon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          systemPrompt,
          temperature: temp
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, data.choices[0].message]);
      }
    } catch (error) {
      console.error("Studio Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* LEFT SIDEBAR: HISTORY (Simplified for now) */}
      <div className="w-64 border-r border-white/5 flex flex-col bg-[#080808] hidden lg:flex">
        <div className="p-4 border-b border-white/5">
          <button className="w-full py-2 px-4 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-all flex items-center gap-2">
            <MessageSquare size={16} /> New Chat
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-4">Recent Sessions</div>
          <div className="p-2 rounded bg-white/5 text-xs text-emerald-400 border-l-2 border-emerald-500">System Check Alpha</div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col relative">
        
        {/* SYSTEM INSTRUCTIONS BOX */}
        <div className="p-4 bg-[#080808] border-b border-white/5">
          <div className="max-w-3xl mx-auto">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">System Instructions</label>
            <textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white/80 focus:border-emerald-500/50 outline-none transition-all resize-none h-20"
            />
          </div>
        </div>

        {/* CHAT FEED */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="max-w-3xl mx-auto">
            {messages.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-white/20">
                <Terminal size={48} className="mb-4 opacity-20" />
                <p className="text-sm italic">Shannon Studio Ready. Awaiting Input...</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-[#111] border border-white/10 text-white/90 rounded-tl-none font-mono'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#111] border border-white/10 p-4 rounded-2xl rounded-tl-none animate-pulse flex gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="p-6 bg-[#080808] border-t border-white/5">
          <div className="max-w-3xl mx-auto relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask Shannon anything..."
              className="w-full bg-black border border-white/10 rounded-xl py-4 pl-6 pr-16 text-sm outline-none focus:border-emerald-500/50 transition-all"
            />
            <button 
              onClick={sendMessage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR: CONFIGURATION */}
      <div className="w-72 border-l border-white/5 bg-[#080808] p-6 hidden xl:flex flex-col">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
          <Settings size={14} /> Model Settings
        </h3>
        
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[10px] uppercase text-white/40">Temperature</label>
              <span className="text-[10px] font-mono text-emerald-500">{temp}</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.1" value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="pt-8 border-t border-white/5">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Database size={14} /> Key Pool Status
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(id => (
                <div key={id} className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/30">POOL-00{id}</span>
                  <span className="text-emerald-500">READY</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <Zap size={14} />
              <span className="text-[10px] font-black uppercase">Pool Capacity</span>
            </div>
            <p className="text-[18px] font-black">400.0k</p>
            <p className="text-[9px] text-white/30 uppercase tracking-widest">Tokens Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
