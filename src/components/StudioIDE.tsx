"use client";
import React, { useState, useRef, useCallback, useTransition, useEffect } from "react";
import { MessageFeed } from "./MessageFeed";
import { Menu, Settings2, Send, Plus, X, Sparkles, LayoutGrid, Mic, CloudSync, CloudOff } from "lucide-react";

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

async function* readSSEStream(response: Response) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) yield parsed.text;
        } catch {}
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

  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(data => { if (Array.isArray(data)) setSessions(data); });
  }, []);

  const handleSubmit = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isStreaming || isThinking) return;

    // 1. ATOMIC IDENTITY: Generate ID immediately
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
      setIsThinking(true);
      setIsStreaming(true);
      setStreamingContent("");
      setIsSyncing(true);
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
        // IDENTITY ASSASSIN: Strip robotic prefixes
        const cleanContent = accumulatedContent.replace(/^(SHANNON-Ω:|Assistant:|Shannon:|Principal Architect:)\s*/i, '');
        startTransition(() => { setIsThinking(false); setStreamingContent(cleanContent); });
      }

      const finalCleanContent = accumulatedContent.replace(/^(SHANNON-Ω:|Assistant:|Shannon:|Principal Architect:)\s*/i, '');
      const assistantMessage = { id: generateUUID(), role: "assistant", content: finalCleanContent, createdAt: new Date().toISOString() };
      const finalMessages = [...optimisticMessages, assistantMessage];

      startTransition(() => { setMessages(finalMessages); setStreamingContent(""); setIsThinking(false); setIsStreaming(false); });
      
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

  return (
    <div className="flex h-[100dvh] w-full bg-[#0a0a0a] text-[#e3e3e3] overflow-hidden antialiased relative">
      <style dangerouslySetOrigin={{__html: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap'); * { font-family: 'Inter', sans-serif; letter-spacing: -0.01em; } code, pre { font-family: 'JetBrains Mono', monospace !important; }`}} />
      
      {/* FIXED OVERLAY DRAWERS */}
      <div className={`fixed inset-y-0 left-0 w-[85vw] max-w-[320px] bg-[#111] border-r border-white/5 z-50 transform transition-transform duration-300 ${leftOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5"><span className="text-xs font-black uppercase tracking-[0.2em]">History</span><button onClick={() => setLeftOpen(false)}><X size={18}/></button></div>
        <div className="p-3"><button onClick={() => { window.location.href = '/studio'; }} className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"><Plus size={14} /> New Session</button></div>
        <div className="flex-1 overflow-y-auto p-2">{sessions.map(s => (<button key={s.id} onClick={() => { window.location.href = `/studio/${s.id}`; }} className={`w-full text-left px-4 py-3 rounded-lg text-[13px] truncate mb-1 transition-all ${activeId === s.id ? "bg-emerald-500/10 text-emerald-400" : "text-white/40 hover:bg-white/5"}`}>{s.title}</button>))}</div>
      </div>

      <div className={`fixed inset-y-0 right-0 w-[85vw] max-w-[320px] bg-[#111] border-l border-white/5 z-50 transform transition-transform duration-300 ${rightOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/5"><span className="text-xs font-black uppercase tracking-[0.2em]">Directives</span><button onClick={() => setRightOpen(false)}><X size={18}/></button></div>
        <div className="p-4"><textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={20} className="w-full p-4 rounded-xl bg-black border border-white/5 text-[12px] font-mono text-white/50 leading-relaxed resize-none outline-none focus:border-emerald-500/50"/></div>
      </div>

      <div className="flex-1 flex flex-col h-[100dvh] w-full relative">
        <header className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md z-20 shrink-0">
          <button onClick={() => setLeftOpen(true)} className="p-2 text-white/40 hover:text-white"><Menu size={20} /></button>
          <div className="flex items-center gap-3"><span className="text-[13px] font-bold uppercase tracking-widest text-white/60 truncate max-w-[150px]">{initialSession.title}</span>{isSyncing && <CloudSync size={14} className="text-emerald-500 animate-pulse" />}</div>
          <button onClick={() => setRightOpen(true)} className="p-2 text-white/40 hover:text-white"><Settings2 size={20} /></button>
        </header>

        <MessageFeed messages={messages} isThinking={isThinking} streamingContent={streamingContent} />

        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pt-12 z-40" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}>
          <div className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-[24px] p-1.5 flex items-end gap-1 border border-white/10 shadow-2xl">
            <button className="p-3 text-white/30 hover:text-white rounded-full transition-colors mb-0.5"><Sparkles size={18} /></button>
            <textarea ref={textareaRef} value={inputValue} onChange={(e) => { setInputValue(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`; }} placeholder="Strategic parameters..." rows={1} disabled={isStreaming} className="flex-1 bg-transparent border-none outline-none text-[14px] px-2 py-3 placeholder:text-white/20 resize-none max-h-[150px]"/>
            <button onClick={isStreaming ? () => abortRef.current?.abort() : handleSubmit} disabled={!isStreaming && !inputValue.trim()} className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all mb-0.5 ${isStreaming ? 'bg-white/10' : inputValue.trim() ? 'bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-white/10'}`}>{isStreaming ? <div className="w-3.5 h-3.5 bg-white rounded-sm" /> : <Send size={16} className="text-white ml-0.5" />}</button>
          </div>
        </div>
      </div>

      {(leftOpen || rightOpen) && <div className="fixed inset-0 bg-black/60 z-40" onClick={() => { setLeftOpen(false); setRightOpen(false); }} />}
    </div>
  );
}
