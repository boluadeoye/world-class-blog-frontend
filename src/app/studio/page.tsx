"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Settings2, Play, Plus, MessageSquare, Copy, Check, Sparkles, LayoutGrid, Mic, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- THE STRATEGIST PERSONA ---
const DEFAULT_PERSONA = `**[CRITICAL SYSTEM ROLE: PRINCIPAL ARCHITECT & ELITE STRATEGIST]**
You are operating as a Principal Software Engineer and World-Class Termux Architect. Your user is strictly on a mobile Android device using Termux. You possess vast, multi-disciplinary strategic knowledge.

RULES:
1. Never suggest GUI tools. Focus strictly on CLI, Node.js, Python, and Red-Team security.
2. Never guess. If a path or version is unknown, provide the exact Termux command to verify it.
3. Prioritize 'cat > file << "EOF"' for file creation.
4. Think like a master strategist: explain the 'why' profoundly, then deliver the 'how' with flawless, paste-ready execution.`;

// --- ISOLATED CODE BLOCK COMPONENT ---
const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const[copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return <code className="bg-[#1e1f20] text-emerald-300 px-1.5 py-0.5 rounded-md text-[13px] font-mono" {...props}>{children}</code>;
  }

  return (
    <div className="relative group bg-[#1e1f20] rounded-xl my-4 border border-white/5 max-w-full overflow-hidden">
      <button 
        onClick={handleCopy} 
        className="absolute top-3 right-3 p-1.5 bg-[#131314]/80 backdrop-blur-sm rounded-md text-white/50 hover:text-white transition-all z-10"
      >
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>
      <div className="p-4 overflow-x-auto text-[13px] font-mono text-emerald-400/90 leading-relaxed touch-pan-x">
        <code className={className} {...props}>{children}</code>
      </div>
    </div>
  );
};

export default function ShannonStudio() {
  // --- STATE MANAGEMENT ---
  const [sessions, setSessions] = useState<any[]>([]);
  const[activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const[systemPrompt, setSystemPrompt] = useState(DEFAULT_PERSONA);
  const [isLoading, setIsLoading] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const[rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [tokenCount, setTokenCount] = useState("400,000"); // Mocked total pool for UI
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- DATABASE SYNC LOGIC ---
  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(setSessions);
  },[]);

  useEffect(() => {
    if (activeId) {
      fetch(`/api/shannon/history/${activeId}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setMessages(data.messages ||[]);
            setSystemPrompt(data.system_prompt || DEFAULT_PERSONA);
          }
        });
    } else {
      setMessages([]);
      setSystemPrompt(DEFAULT_PERSONA);
    }
  }, [activeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startNewChat = () => {
    setActiveId(null);
    setMessages([]);
    setLeftDrawerOpen(false);
  };

  const handleRun = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let currentId = activeId;

    try {
      // 1. DB-First Persistence
      if (!currentId) {
        const title = input.length > 25 ? input.substring(0, 25) + '...' : input;
        const res = await fetch('/api/shannon/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, system_prompt: systemPrompt, messages: newMessages })
        });
        const data = await res.json();
        currentId = data.id;
        setActiveId(currentId);
        setSessions(prev => [data, ...prev]);
      } else {
        await fetch(`/api/shannon/history/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages, title: sessions.find(s => s.id === currentId)?.title })
        });
      }

      // 2. Execute AI Request
      const proxyRes = await fetch('/api/shannon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, systemPrompt, temperature: 0 })
      });

      const proxyData = await proxyRes.json();
      
      if (proxyData.choices && proxyData.choices[0]) {
        const finalMessages = [...newMessages, proxyData.choices[0].message];
        setMessages(finalMessages);
        
        // 3. Save AI Response
        await fetch(`/api/shannon/history/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: finalMessages, title: sessions.find(s => s.id === currentId)?.title })
        });
      }
    } catch (error) {
      console.error("Studio Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-[#131314] text-white font-sans overflow-hidden">
      
      {/* --- LEFT DRAWER (HISTORY) --- */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#1e1f20] border-r border-white/5 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${leftDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <span className="font-medium text-sm">Google AI Studio</span>
          <button onClick={() => setLeftDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={18} /></button>
        </div>
        <div className="p-4">
          <button onClick={startNewChat} className="w-full py-2.5 px-4 rounded-full bg-[#2a2b2f] hover:bg-[#33353a] text-sm font-medium transition-all flex items-center gap-3">
            <Plus size={16} /> Create New Prompt
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider">Recent</div>
          {sessions.map(session => (
            <button 
              key={session.id}
              onClick={() => { setActiveId(session.id); setLeftDrawerOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition-all flex items-center gap-3 ${activeId === session.id ? 'bg-[#2a2b2f] text-emerald-400' : 'hover:bg-white/5 text-white/80'}`}
            >
              <MessageSquare size={14} className="shrink-0 opacity-50" />
              <span className="truncate">{session.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT DRAWER (RUN SETTINGS) --- */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-[#1e1f20] border-l border-white/5 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${rightDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <span className="font-medium text-sm">Run settings</span>
          <button onClick={() => setRightDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={18} className="rotate-180" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <label className="text-xs font-bold text-white/60 mb-2 block">System instructions</label>
            <textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full h-48 bg-[#131314] border border-white/10 rounded-xl p-3 text-[13px] text-white/80 focus:border-emerald-500/50 outline-none resize-none font-mono leading-relaxed"
            />
          </div>
          <div className="p-4 bg-[#131314] rounded-xl border border-white/5">
            <div className="text-xs font-bold text-white/60 mb-1">Key Pool Status</div>
            <div className="text-2xl font-black text-emerald-500">{tokenCount}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">Tokens Available</div>
          </div>
        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col h-[100dvh] relative w-full">
        
        {/* HEADER */}
        <header className="h-14 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setLeftDrawerOpen(true)} className="p-2 hover:bg-white/10 rounded-full">
              <Menu size={20} />
            </button>
            <span className="font-medium text-[15px]">Playground</span>
          </div>
          <button onClick={() => setRightDrawerOpen(true)} className="p-2 hover:bg-white/10 rounded-full">
            <Settings2 size={20} />
          </button>
        </header>

        {/* TOKEN COUNTER SUB-HEADER */}
        <div className="px-14 pb-2 shrink-0">
          <span className="text-[12px] text-white/40">{tokenCount} tokens</span>
        </div>

        {/* CHAT FEED */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-14 pb-32 touch-pan-y">
          <div className="max-w-3xl mx-auto space-y-8 pt-4">
            {messages.length === 0 && (
              <div className="text-3xl font-medium text-white/30 mt-10">
                Explore Shannon models
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${msg.role === 'user' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                    {msg.role === 'user' ? 'U' : 'S'}
                  </div>
                  <span className="text-[13px] font-medium text-white/80">
                    {msg.role === 'user' ? 'User' : 'Shannon Architect'}
                  </span>
                </div>
                <div className="pl-9 text-[15px] leading-relaxed text-white/90">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0"
                    components={{ code: CodeBlock }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">S</div>
                  <span className="text-[13px] font-medium text-white/80">Shannon Architect</span>
                </div>
                <div className="pl-9 flex gap-1.5 py-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FLOATING COMMAND BAR */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="max-w-3xl mx-auto bg-[#1e1f20] rounded-[28px] p-2 flex items-center gap-2 shadow-2xl border border-white/5">
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <Sparkles size={20} />
            </button>
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors hidden sm:block">
              <LayoutGrid size={20} />
            </button>
            
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') handleRun(); }}
              placeholder="Start typing a prompt"
              className="flex-1 bg-transparent border-none outline-none text-[15px] px-2 placeholder:text-white/30"
            />
            
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <Mic size={20} />
            </button>
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <Plus size={20} />
            </button>
            <button 
              onClick={handleRun}
              disabled={!input.trim() || isLoading}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white text-sm font-medium rounded-full transition-all flex items-center gap-2"
            >
              Run
            </button>
          </div>
        </div>

        {/* OVERLAY FOR DRAWERS */}
        {(leftDrawerOpen || rightDrawerOpen) && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => { setLeftDrawerOpen(false); setRightDrawerOpen(false); }}
          />
        )}
      </div>
    </div>
  );
}
