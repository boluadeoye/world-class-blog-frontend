"use client";
import React, { useState, useRef, useCallback, useTransition, useEffect } from "react";
import { MessageFeed } from "./MessageFeed";
import { Menu, Settings2, Send, Plus, X, Sparkles, CloudSync } from "lucide-react";

function generateUUID() {
  return typeof window !== 'undefined' && window.crypto?.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function balanceMarkdown(markdown: string): string {
  let balanced = markdown;
  const codeBlockMatches = markdown.match(/```/g);
  if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) balanced += '\n```';
  return balanced;
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
            if (parsed.text) yield parsed.text;
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
  const [isThinking, setIsThinking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [leftOpen, setLeftOpen] = useState(false);
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
    if (!text || isStreaming || isThinking) return;

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
      setIsThinking(true); setIsStreaming(true); setStreamingContent(""); setIsSyncing(true);
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
      
      const response = await fetch("/api/shannon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentId, messages: optimisticMessages, systemPrompt }),
        signal: abortRef.current.signal
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      for await (const chunk of readSSEStream(response)) {
        accumulatedContent += chunk;
        // UNICODE ASSASSIN: Strips up to 60 chars (no newlines) ending in a colon. Catches "SHANNON-Ω:" perfectly.
        const cleanContent = accumulatedContent.replace(/^[^:\n]{0,60}:\s*/, '');
        startTransition(() => { setIsThinking(false); setStreamingContent(cleanContent); });
      }

      const finalCleanContent = accumulatedContent.replace(/^[^:\n]{0,60}:\s*/, '');
      const assistantMessage = { id: generateUUID(), role: "assistant", content: finalCleanContent, createdAt: new Date().toISOString() };
      const finalMessages = [...optimisticMessages, assistantMessage];

      startTransition(() => {
        setMessages(finalMessages); setStreamingContent(""); setIsThinking(false); setIsStreaming(false);
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
          setIsThinking(false); setIsStreaming(false); setStreamingContent(""); setIsSyncing(false);
        });
      }
    }
  }, [inputValue, isStreaming, isThinking, messages, activeId, systemPrompt]);

  const balancedStreamingContent = streamingContent ? balanceMarkdown(streamingContent) : "";

  return (
    <div className="fixed inset-0 bg-[#000000] text-[#e3e3e3] overflow-hidden antialiased flex flex-col" style={{ height: 'var(--vv-height, 100dvh)' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        :root { --font-sans: 'Inter', sans-serif; --font-mono: 'JetBrains Mono', monospace; }
        body { font-family: var(--font-sans); background-color: #000000; margin: 0; padding: 0; overflow: hidden; }
        code, pre { font-family: var(--font-mono) !important; }
      `}} />

      {/* Header */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#050505] z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setLeftOpen(true)} className="text-white/40 hover:text-white transition-colors"><Menu size={16} /></button>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/50">{initialSession.title}</span>
        </div>
        <div className="flex items-center gap-4">
          {isSyncing && <CloudSync size={14} className="text-emerald-500 animate-pulse" />}
          <button onClick={() => setRightOpen(true)} className="text-white/40 hover:text-white transition-colors"><Settings2 size={16} /></button>
        </div>
      </header>

      {/* Feed */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-[#000000]">
        <MessageFeed messages={messages} isThinking={isThinking} streamingContent={balancedStreamingContent} />
      </div>

      {/* Docked Command Bar */}
      <div className="w-full bg-[#050505] border-t border-white/10 shrink-0">
        <div className="flex items-end w-full">
          <div className="w-[56px] shrink-0 flex justify-center pb-3 pt-3 border-r border-white/10">
            <Sparkles size={16} className="text-white/20" />
          </div>
          <div className="flex-1 flex items-end p-2">
            <textarea 
              ref={textareaRef} 
              value={inputValue} 
              onChange={(e) => { 
                setInputValue(e.target.value); 
                e.target.style.height = "auto"; 
                e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`; 
              }} 
              placeholder="ENTER STRATEGIC PARAMETERS..." 
              rows={1} 
              disabled={isStreaming} 
              className="flex-1 bg-transparent border-none outline-none text-[13px] px-2 py-1.5 placeholder:text-white/20 resize-none font-mono uppercase tracking-wider text-white"
            />
            <button 
              onClick={isStreaming ? () => abortRef.current?.abort() : handleSubmit} 
              disabled={!isStreaming && !inputValue.trim()} 
              className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-none transition-all mb-0.5 ${isStreaming ? 'bg-white/10' : inputValue.trim() ? 'bg-emerald-600 text-white' : 'bg-transparent text-white/20'}`}
            >
              {isStreaming ? <div className="w-2.5 h-2.5 bg-white rounded-none" /> : <Send size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* History Panel */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-[#050505] border-r border-white/10 z-50 transform transition-transform duration-200 ease-in-out flex flex-col ${leftOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/50">Session History</span>
          <button onClick={() => setLeftOpen(false)} className="text-white/30 hover:text-white"><X size={16}/></button>
        </div>
        <button onClick={() => { window.location.href = '/studio'; }} className="m-4 p-3 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2 rounded-none text-white/70">
          <Plus size={14} /> New Session
        </button>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {sessions.map(s => (
            <button key={s.id} onClick={() => { window.location.href = `/studio/${s.id}`; }} className={`w-full text-left px-3 py-2.5 text-[12px] font-mono truncate mb-1 border rounded-none ${activeId === s.id ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "border-transparent text-white/40 hover:border-white/10 hover:text-white/80"}`}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Directives Panel */}
      <div className={`fixed inset-y-0 right-0 w-[320px] bg-[#050505] border-l border-white/10 z-50 transform transition-transform duration-200 ease-in-out flex flex-col ${rightOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/50">System Directives</span>
          <button onClick={() => setRightOpen(false)} className="text-white/30 hover:text-white"><X size={16}/></button>
        </div>
        <div className="p-4 flex-1">
          <textarea 
            value={systemPrompt} 
            onChange={(e) => setSystemPrompt(e.target.value)} 
            className="w-full h-full bg-[#000000] border border-white/10 p-4 text-[12px] font-mono text-white/50 leading-relaxed resize-none outline-none focus:border-emerald-500/50 rounded-none"
          />
        </div>
      </div>

      {(leftOpen || rightOpen) && <div className="fixed inset-0 bg-black/80 z-40" onClick={() => { setLeftOpen(false); setRightOpen(false); }} />}
    </div>
  );
}
