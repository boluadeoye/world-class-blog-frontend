"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Settings2, Plus, Copy, Check, Sparkles, LayoutGrid, Mic, ChevronLeft, Terminal, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DEFAULT_PERSONA = `**[CRITICAL SYSTEM ROLE: PRINCIPAL ARCHITECT & EXPERT STRATEGIST]**
You are a World-Class Termux Architect. Your user is on Android/Termux. 
1. No GUI suggestions. 
2. No guessing; provide verification commands. 
3. Use 'cat > file << "EOF"' for file creation.
4. Provide profound strategic 'why' before the 'how'.`;

// --- ISOLATED, ANTI-COLLAPSE CODE BLOCK ---
const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) return <code className="bg-[#2a2b2f] text-emerald-300 px-1.5 py-0.5 rounded text-[13px] font-mono break-words" {...props}>{children}</code>;

  return (
    <div className="my-6 bg-[#1e1f20] rounded-xl border border-white/10 w-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2a2b2f] border-b border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono">{match?.[1] || 'text'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/50 hover:text-white transition-all p-1">
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto touch-pan-x">
        <code className="text-[13px] font-mono text-emerald-300 whitespace-pre float-left min-w-full" {...props}>
          {children}
        </code>
      </div>
    </div>
  );
};

export default function ShannonStudio() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const[messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PERSONA);
  const[isLoading, setIsLoading] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch History
  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setSessions(data);
    }).catch(err => console.error("History fetch error:", err));
  },[]);

  // Load Active Session
  useEffect(() => {
    if (activeId) {
      fetch(`/api/shannon/history/${activeId}`).then(res => res.json()).then(data => {
        if (data && !data.error) {
          setMessages(data.messages ||[]);
          setSystemPrompt(data.system_prompt || DEFAULT_PERSONA);
        }
      }).catch(err => console.error("Session fetch error:", err));
    } else {
      setMessages([]);
    }
  },[activeId]);

  // Auto-scroll
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
      // 1. Create Session if new
      if (!currentId) {
        const res = await fetch('/api/shannon/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: input.substring(0, 30), system_prompt: systemPrompt, messages: newMessages })
        });
        const data = await res.json();
        if (data.error) throw new Error(`DB Error: ${data.error}`);
        currentId = data.id;
        setActiveId(currentId);
        setSessions(prev => [data, ...prev]);
      }

      // 2. Call Proxy
      const proxyRes = await fetch('/api/shannon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, systemPrompt, sessionId: currentId, temperature: 0 })
      });

      const proxyData = await proxyRes.json();
      
      // 3. ERROR SURFACING (Fixing the "Silent Death")
      if (proxyData.error) {
        throw new Error(proxyData.error);
      }

      if (proxyData.choices && proxyData.choices[0]) {
        const finalMessages = [...newMessages, proxyData.choices[0].message];
        setMessages(finalMessages);
        
        // Save to DB
        await fetch(`/api/shannon/history/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: finalMessages, title: sessions.find(s => s.id === currentId)?.title || 'Chat' })
        });
      }
    } catch (e: any) {
      console.error(e);
      // Display error in UI so it doesn't fail silently
      setMessages(prev =>[...prev, { role: 'system_error', content: `**SYSTEM ALERT:** ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-[#131314] text-[#e3e3e3] font-sans overflow-hidden">
      
      {/* --- LEFT DRAWER (HISTORY) --- */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#1e1f20] border-r border-white/5 z-50 transform transition-transform duration-300 ${leftDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
          <span className="font-medium text-[15px]">Google AI Studio</span>
          <button onClick={() => setLeftDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={20} /></button>
        </div>
        <div className="p-4">
          <button onClick={() => {setActiveId(null); setLeftDrawerOpen(false);}} className="w-full py-3 px-4 rounded-xl bg-[#2a2b2f] hover:bg-[#33353a] text-[14px] font-medium transition-all flex items-center gap-3">
            <Plus size={18} /> Create New Prompt
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="px-3 py-2 text-[11px] font-bold text-white/40 uppercase tracking-wider">Recent</div>
          {sessions.map(s => (
            <button key={s.id} onClick={() => {setActiveId(s.id); setLeftDrawerOpen(false);}} className={`w-full text-left px-3 py-3 rounded-xl text-[14px] truncate transition-all ${activeId === s.id ? 'bg-[#2a2b2f] text-emerald-400' : 'hover:bg-white/5 text-white/80'}`}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT DRAWER (SETTINGS) --- */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-[#1e1f20] border-l border-white/5 z-50 transform transition-transform duration-300 ${rightDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
          <span className="font-medium text-[15px]">Run settings</span>
          <button onClick={() => setRightDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={20} className="rotate-180" /></button>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <label className="text-[13px] font-medium text-white/80 mb-2 block">System instructions</label>
            <textarea value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} className="w-full h-48 bg-[#131314] border border-white/10 rounded-xl p-3 text-[13px] text-white/60 focus:border-emerald-500/50 outline-none resize-none font-mono"/>
          </div>
        </div>
      </div>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col h-[100dvh] relative min-w-0">
        
        {/* HEADER */}
        <header className="h-14 flex items-center justify-between px-2 shrink-0">
          <div className="flex items-center gap-1">
            <button onClick={() => setLeftDrawerOpen(true)} className="p-3 hover:bg-white/10 rounded-full"><Menu size={20} /></button>
            <span className="font-medium text-[18px] ml-1">Playground</span>
          </div>
          <button onClick={() => setRightDrawerOpen(true)} className="p-3 hover:bg-white/10 rounded-full"><Settings2 size={20} /></button>
        </header>

        {/* CHAT FEED */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-32 touch-pan-y">
          <div className="max-w-3xl mx-auto pt-4">
            {messages.length === 0 && (
              <div className="text-3xl font-medium text-white/30 mt-10 px-2">
                Explore Shannon models
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className="mb-8 flex flex-col gap-1 w-full">
                <div className="flex items-center gap-3 mb-1">
                  {msg.role === 'user' ? (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-bold text-white">U</div>
                  ) : msg.role === 'system_error' ? (
                    <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white"><AlertTriangle size={14}/></div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                  )}
                  <span className="text-[14px] font-medium text-white">
                    {msg.role === 'user' ? 'User' : msg.role === 'system_error' ? 'System Error' : 'Shannon Architect'}
                  </span>
                </div>
                
                <div className="pl-10 text-[15px] leading-relaxed text-[#e3e3e3] w-full">
                  {msg.role === 'system_error' ? (
                    <div className="text-red-400 font-mono text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg.content}</div>
                  ) : (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-p:mb-4 last:prose-p:mb-0"
                      components={{ code: CodeBlock }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="mb-8 flex flex-col gap-1 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white"><Sparkles size={14}/></div>
                  <span className="text-[14px] font-medium text-white">Shannon Architect</span>
                </div>
                <div className="pl-10 flex gap-1.5 py-3">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce[animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FLOATING COMMAND PILL (GOOGLE AI STUDIO STYLE) */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#131314] via-[#131314] to-transparent pt-10">
          <div className="max-w-3xl mx-auto bg-[#1e1f20] rounded-[32px] p-1.5 flex items-center gap-1 shadow-2xl border border-white/10">
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors shrink-0">
              <Sparkles size={20} />
            </button>
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors shrink-0 hidden sm:block">
              <LayoutGrid size={20} />
            </button>
            
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') handleRun(); }}
              placeholder="Start typing a prompt"
              className="flex-1 bg-transparent border-none outline-none text-[15px] px-2 placeholder:text-white/40 min-w-0"
            />
            
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors shrink-0">
              <Mic size={20} />
            </button>
            <button className="p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-colors shrink-0">
              <Plus size={20} />
            </button>
            <button 
              onClick={handleRun}
              disabled={!input.trim() || isLoading}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white text-[14px] font-medium rounded-full transition-all shrink-0"
            >
              Run
            </button>
          </div>
        </div>

        {/* OVERLAYS */}
        {(leftDrawerOpen || rightDrawerOpen) && (
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => { setLeftDrawerOpen(false); setRightDrawerOpen(false); }} />
        )}
      </div>
    </div>
  );
}
