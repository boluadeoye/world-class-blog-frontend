"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Settings2, Play, Plus, MessageSquare, Copy, Check, Sparkles, LayoutGrid, Mic, ChevronLeft, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DEFAULT_PERSONA = `**[CRITICAL SYSTEM ROLE: PRINCIPAL ARCHITECT & EXPERT STRATEGIST]**
You are a World-Class Termux Architect. Your user is on Android/Termux. 
1. No GUI suggestions. 
2. No guessing; provide verification commands. 
3. Use 'cat > file << "EOF"' for file creation.
4. Provide profound strategic 'why' before the 'how'.`;

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) return <code className="bg-[#1e1f20] text-emerald-300 px-1.5 py-0.5 rounded-md text-[13px] font-mono" {...props}>{children}</code>;

  return (
    <div className="relative group bg-[#1e1f20] rounded-xl my-4 border border-white/5 w-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Terminal / Code</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/50 hover:text-white transition-all">
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          <span className="text-[10px] uppercase font-bold">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] font-mono text-emerald-400/90 leading-relaxed touch-pan-x whitespace-pre">
        <code className={className} {...props}>{children}</code>
      </div>
    </div>
  );
};

export default function ShannonStudio() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PERSONA);
  const [isLoading, setIsLoading] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(setSessions);
  }, []);

  useEffect(() => {
    if (activeId) {
      fetch(`/api/shannon/history/${activeId}`).then(res => res.json()).then(data => {
        if (data) {
          setMessages(data.messages || []);
          setSystemPrompt(data.system_prompt || DEFAULT_PERSONA);
        }
      });
    }
  }, [activeId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleRun = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let currentId = activeId;
    try {
      if (!currentId) {
        const res = await fetch('/api/shannon/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: input.substring(0, 30), system_prompt: systemPrompt, messages: newMessages })
        });
        const data = await res.json();
        currentId = data.id;
        setActiveId(currentId);
        setSessions(prev => [data, ...prev]);
      }

      const proxyRes = await fetch('/api/shannon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, systemPrompt, sessionId: currentId, temperature: 0 })
      });

      const proxyData = await proxyRes.json();
      if (proxyData.choices) {
        const finalMessages = [...newMessages, proxyData.choices[0].message];
        setMessages(finalMessages);
        await fetch(`/api/shannon/history/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: finalMessages, title: sessions.find(s => s.id === currentId)?.title })
        });
      }
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  return (
    <div className="flex h-[100dvh] bg-[#131314] text-white overflow-hidden">
      {/* LEFT DRAWER */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#1e1f20] border-r border-white/5 z-50 transform transition-transform ${leftDrawerOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="font-bold text-sm uppercase tracking-widest">History</span>
          <button onClick={() => setLeftDrawerOpen(false)} className="lg:hidden"><X size={18}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {sessions.map(s => (
            <button key={s.id} onClick={() => {setActiveId(s.id); setLeftDrawerOpen(false);}} className={`w-full text-left p-3 rounded-lg text-xs truncate mb-1 ${activeId === s.id ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-white/5 text-white/60'}`}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-4 border-b border-white/5">
          <button onClick={() => setLeftDrawerOpen(true)} className="lg:hidden"><Menu size={20}/></button>
          <span className="font-black uppercase tracking-tighter text-xl">Shannon Studio</span>
          <button onClick={() => setRightDrawerOpen(true)}><Settings2 size={20}/></button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-full overflow-x-hidden">
          <div className="max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-5 h-5 rounded-full ${msg.role === 'user' ? 'bg-emerald-500' : 'bg-blue-500'}`}/>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/40">{msg.role}</span>
                </div>
                <div className="text-[15px] leading-relaxed text-white/90">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#131314]">
          <div className="max-w-3xl mx-auto bg-[#1e1f20] rounded-full p-2 flex items-center gap-2 border border-white/5">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRun()} placeholder="Enter strategic parameters..." className="flex-1 bg-transparent border-none outline-none px-4 text-sm"/>
            <button onClick={handleRun} disabled={isLoading} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"><Play size={18}/></button>
          </div>
        </div>
      </div>

      {/* RIGHT DRAWER */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-[#1e1f20] border-l border-white/5 z-50 transform transition-transform ${rightDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <span className="font-bold text-sm uppercase tracking-widest">Directives</span>
          <button onClick={() => setRightDrawerOpen(false)}><X size={18}/></button>
        </div>
        <div className="p-4">
          <textarea value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} className="w-full h-64 bg-black border border-white/10 rounded-xl p-4 text-xs font-mono text-white/60 outline-none focus:border-emerald-500/50"/>
        </div>
      </div>
    </div>
  );
}

function X({size}: {size: number}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>; }
