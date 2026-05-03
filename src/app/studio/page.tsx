"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Settings, MessageSquare, Terminal, Menu, X, Copy, Check, Trash2, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DEFAULT_PERSONA = `You are the Shannon Principal Architect and Expert Strategist. Your user operates strictly on a mobile Android device using Termux. You possess vast, multi-disciplinary strategic knowledge, combining high-level architectural thinking with low-level execution. 

RULES:
1. Never suggest GUI tools or heavy desktop environments.
2. Never guess; if a variable, path, or version is unknown, provide the exact Termux command to verify it.
3. Prioritize 'cat > file << "EOF"' for file creation.
4. Think like a master strategist: explain the 'why' briefly and profoundly, then deliver the 'how' with flawless, paste-ready execution.`;

// Custom Copy Button Component for Code Blocks
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors flex items-center gap-1">
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      <span className="text-[10px] uppercase tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};

export default function ShannonStudio() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PERSONA);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load all sessions on mount
  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(setSessions);
  },[]);

  // Load specific session when activeId changes
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startNewChat = () => {
    setActiveId(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const deleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/shannon/history/${id}`, { method: 'DELETE' });
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeId === id) startNewChat();
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const newMessages =[...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let currentId = activeId;

    try {
      // 1. If new chat, create it in DB first
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
        // Update existing chat with user message
        await fetch(`/api/shannon/history/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages, title: sessions.find(s => s.id === currentId)?.title })
        });
      }

      // 2. Call Shannon Proxy
      const proxyRes = await fetch('/api/shannon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, systemPrompt, temperature: 0.7 })
      });

      const proxyData = await proxyRes.json();
      
      if (proxyData.choices && proxyData.choices[0]) {
        const finalMessages = [...newMessages, proxyData.choices[0].message];
        setMessages(finalMessages);
        
        // 3. Auto-Save AI response to DB
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
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-emerald-500/30">
      
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 w-full h-14 bg-[#080808] border-b border-white/5 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 font-black tracking-widest uppercase text-sm">
          <Terminal size={16} className="text-emerald-500" /> Studio
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white/70">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* LEFT SIDEBAR: HISTORY */}
      <div className={`fixed lg:static top-14 lg:top-0 left-0 h-[calc(100vh-3.5rem)] lg:h-screen w-72 bg-[#080808] border-r border-white/5 flex flex-col transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-white/5">
          <button onClick={startNewChat} className="w-full py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
            <Plus size={16} /> New Session
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 px-2">Session Library</div>
          {sessions.map(session => (
            <div 
              key={session.id} 
              onClick={() => { setActiveId(session.id); setIsSidebarOpen(false); }}
              className={`group p-3 rounded-lg text-sm cursor-pointer border transition-all flex justify-between items-center ${activeId === session.id ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-transparent border-transparent hover:bg-white/5 text-white/70'}`}
            >
              <span className="truncate pr-2">{session.title}</span>
              <button onClick={(e) => deleteChat(session.id, e)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-opacity">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-grow flex flex-col relative pt-14 lg:pt-0 h-screen">
        
        {/* SYSTEM INSTRUCTIONS */}
        <div className="p-4 bg-[#080808] border-b border-white/5 shrink-0">
          <div className="max-w-4xl mx-auto">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2 flex items-center gap-2">
              <Settings size={12} /> Strategic Directives
            </label>
            <textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 text-[13px] text-white/60 focus:border-emerald-500/50 outline-none transition-all resize-none h-20 font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* CHAT FEED */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 md:p-8 space-y-8">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="h-full min-h-[40vh] flex flex-col items-center justify-center text-white/20">
                <Terminal size={48} className="mb-6 opacity-20" />
                <p className="text-sm font-mono uppercase tracking-widest">Awaiting Strategic Input...</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-8`}>
                <div className={`max-w-[95%] md:max-w-[85%] p-5 rounded-2xl text-[15px] leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-white/10 text-white rounded-tr-none border border-white/5' 
                  : 'bg-transparent text-white/90'
                }`}>
                  {msg.role === 'assistant' && <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2"><Terminal size={12}/> Shannon Architect</div>}
                  
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-code:text-emerald-300"
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');
                        return !inline ? (
                          <div className="relative group bg-[#0A0A0A] rounded-xl my-6 border border-white/10 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{match?.[1] || 'terminal'}</span>
                              <CopyButton text={codeString} />
                            </div>
                            <div className="p-4 overflow-x-auto text-[13px] font-mono text-emerald-400/90 leading-relaxed">
                              <code className={className} {...props}>{children}</code>
                            </div>
                          </div>
                        ) : (
                          <code className="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded text-[13px] font-mono" {...props}>{children}</code>
                        )
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-8">
                <div className="p-5 flex gap-2 items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce[animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="p-4 md:p-6 bg-[#080808] border-t border-white/5 shrink-0">
          <div className="max-w-4xl mx-auto relative">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Enter strategic parameters..."
              className="w-full bg-black border border-white/10 rounded-xl py-4 pl-6 pr-16 text-[15px] outline-none focus:border-emerald-500/50 transition-all resize-none h-14 overflow-hidden"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="max-w-4xl mx-auto mt-2 text-center">
            <span className="text-[10px] text-white/30 uppercase tracking-widest">Shift + Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
