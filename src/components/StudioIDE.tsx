"use client";
import React, { useState, useRef, useCallback, useTransition, useEffect } from "react";
import { MessageFeed } from "./MessageFeed";
import { Settings2, Send, Plus, X, Sparkles, CloudSync, History } from "lucide-react";

function generateUUID() {
  return typeof window !== 'undefined' && window.crypto?.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function* readSSEStream(response: Response) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1) {
        const chunk = buffer.substring(0, boundary).trim();
        buffer = buffer.substring(boundary + 2);
        const lines = chunk.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") return;
          try {
            const parsed = JSON.parse(data);
            yield parsed; // Yields either {text: "..."} or {thought: "..."} or {error: "..."}
          } catch (e) {}
        }
        boundary = buffer.indexOf("\n\n");
      }
    }
  } finally { reader.releaseLock(); }
}

export default function StudioIDE({ initialSession }: any) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>(initialSession.messages ?? []);
  const [systemPrompt, setSystemPrompt] = useState(initialSession.systemPrompt ?? "");
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [streamingThoughts, setStreamingThoughts] = useState<string[]>([]);
  const [rightOpen, setRightOpen] = useState(false);
  const [activeId, setActiveId] = useState(initialSession.id);
  const [, startTransition] = useTransition();
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastSessionIdRef = useRef(initialSession.id);

  useEffect(() => {
    if (!window.visualViewport) return;
    let rafId: number;
    const handleResize = () => {
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--vv-height', `${window.visualViewport!.height}px`);
      });
    };
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    handleResize();
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (initialSession.id !== lastSessionIdRef.current) {
      setMessages(initialSession.messages ?? []);
      setSystemPrompt(initialSession.systemPrompt ?? "");
      setActiveId(initialSession.id);
      lastSessionIdRef.current = initialSession.id;
    }
  }, [initialSession.id]);

  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setSessions(data);
    }).catch(() => {});
  }, []);

  const handleSubmit = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isStreaming) return;

    const currentId = activeId || generateUUID();
    if (!activeId) {
      setActiveId(currentId);
      window.history.replaceState(null, '', `/studio/${currentId}`);
    }

    const userMessage = { id: generateUUID(), role: "user", content: text, createdAt: new Date().toISOString() };
    const optimisticMessages = [...messages, userMessage];

    startTransition(() => {
      setMessages(optimisticMessages);
      setInputValue("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setIsStreaming(true); setStreamingContent(""); setStreamingThoughts([]); setIsSyncing(true);
    });

    try {
      if (!activeId) {
        await fetch('/api/shannon/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentId, title: text.substring(0, 30), system_prompt: systemPrompt, messages: optimisticMessages })
        });
      }

      abortRef.current = new AbortController();
      let accumulatedContent = "";
      let accumulatedThoughts: string[] = [];
      
      const response = await fetch("/api/shannon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentId, messages: optimisticMessages, systemPrompt }),
        signal: abortRef.current.signal
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      for await (const packet of readSSEStream(response)) {
        if (packet.error) throw new Error(packet.error);
        if (packet.thought) {
          accumulatedThoughts = [...accumulatedThoughts, packet.thought];
          startTransition(() => { setStreamingThoughts(accumulatedThoughts); });
        }
        if (packet.text) {
          accumulatedContent += packet.text;
          const cleanContent = accumulatedContent.replace(/^[^:\n]{1,30}:\s*/, '');
          startTransition(() => { setStreamingContent(cleanContent); });
        }
      }

      const finalCleanContent = accumulatedContent.replace(/^[^:\n]{1,30}:\s*/, '');
      const assistantMessage = { 
        id: generateUUID(), 
        role: "assistant", 
        content: finalCleanContent, 
        thoughts: accumulatedThoughts,
        createdAt: new Date().toISOString() 
      };
      const finalMessages = [...optimisticMessages, assistantMessage];

      startTransition(() => {
        setMessages(finalMessages); setStreamingContent(""); setStreamingThoughts([]); setIsStreaming(false);
      });

      await fetch("/api/shannon", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentId, messages: finalMessages }),
      });
      setIsSyncing(false);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        startTransition(() => {
          setMessages([...optimisticMessages, { id: generateUUID(), role: "system_error", content: `**SYSTEM ALERT:** ${err.message}`, createdAt: new Date().toISOString() }]);
          setIsStreaming(false); setStreamingContent(""); setStreamingThoughts([]); setIsSyncing(false);
        });
      }
    }
  }, [inputValue, isStreaming, messages, activeId, systemPrompt]);

  return (
    <div className="fixed inset-0 bg-[#000000] text-[#e3e3e3] overflow-hidden antialiased flex flex-col" style={{ height: 'var(--vv-height, 100dvh)' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        :root { --font-sans: 'Inter', sans-serif; --font-mono: 'JetBrains Mono', monospace; }
        body { font-family: var(--font-sans); background-color: #000000; margin: 0; padding: 0; overflow: hidden; }
        code, pre { font-family: var(--font-mono) !important; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header */}
      <header className="h-12 flex items-center justify-between px-3 border-b border-neutral-900 bg-[#050505] z-20 shrink-0">
        <div className="flex items-center gap-3">
          <Sparkles size={14} className="text-emerald-500" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/70">Shannon Ω</span>
        </div>
        <div className="flex items-center gap-4">
          {isSyncing && <CloudSync size={14} className="text-emerald-500 animate-pulse" />}
          <button onClick={() => setRightOpen(true)} className="text-white/40 hover:text-white transition-colors p-1"><Settings2 size={16} /></button>
        </div>
      </header>

      {/* Context Strip (Horizontal History) */}
      <div className="w-full bg-[#020202] border-b border-neutral-900 flex items-center px-2 py-1.5 overflow-x-auto hide-scrollbar shrink-0">
        <button onClick={() => { window.location.href = '/studio'; }} className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/70 mr-2 transition-colors">
          <Plus size={10} /> New
        </button>
        {sessions.slice(0, 10).map(s => (
          <button key={s.id} onClick={() => { window.location.href = `/studio/${s.id}`; }} className={`shrink-0 px-3 py-1 text-[10px] font-mono truncate max-w-[120px] mr-1 border transition-colors ${activeId === s.id ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "border-transparent text-white/40 hover:bg-white/5"}`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Feed */}
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col bg-[#000000]">
        <MessageFeed messages={messages} isStreaming={isStreaming} streamingContent={streamingContent} streamingThoughts={streamingThoughts} />
      </div>

      {/* Docked Command Bar */}
      <div className="w-full bg-[#050505] border-t border-neutral-900 shrink-0">
        <div className="flex items-end w-full">
          <div className="w-[32px] shrink-0 flex justify-center pb-3.5 pt-3 border-r border-neutral-900">
            <span className="text-[10px] font-mono font-bold text-white/20">OP</span>
          </div>
          <div className="flex-1 flex items-end p-1.5">
            <textarea 
              ref={textareaRef} 
              value={inputValue} 
              onChange={(e) => { 
                setInputValue(e.target.value); 
                e.target.style.height = "auto"; 
                e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`; 
              }} 
              placeholder="ENTER STRATEGIC PARAMETERS OR URL..." 
              rows={1} 
              disabled={isStreaming} 
              className="flex-1 bg-transparent border-none outline-none text-[13px] px-2 py-1.5 placeholder:text-white/20 resize-none font-mono text-white"
            />
            <button 
              onClick={isStreaming ? () => abortRef.current?.abort() : handleSubmit} 
              disabled={!isStreaming && !inputValue.trim()} 
              className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-none transition-all mb-0.5 ${isStreaming ? 'bg-white/10' : inputValue.trim() ? 'bg-emerald-600 text-white' : 'bg-transparent text-white/10'}`}
            >
              {isStreaming ? <div className="w-2.5 h-2.5 bg-white rounded-none" /> : <Send size={12} />}
            </button>
          </div>
        </div>
      </div>

      {/* Directives Panel */}
      {rightOpen && (
        <div className="fixed inset-0 bg-[#050505] z-50 flex flex-col transition-all duration-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 shrink-0">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/50">System Directives</span>
            <button onClick={() => setRightOpen(false)} className="text-white/30 hover:text-white p-1"><X size={18}/></button>
          </div>
          <div className="p-4 flex-1">
            <textarea 
              value={systemPrompt} 
              onChange={(e) => setSystemPrompt(e.target.value)} 
              className="w-full h-full bg-[#000000] border border-neutral-800 p-4 text-[12px] font-mono text-white/50 leading-relaxed resize-none outline-none focus:border-neutral-700 rounded-none focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
