"use client";

import React, { useState, useRef, useCallback, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageFeed } from "./MessageFeed";
import { Menu, Settings2, Send, Plus, X, Sparkles, LayoutGrid, Mic, CloudSync, CloudOff } from "lucide-react";

function nanoid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`; }

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
      buffer = lines.pop() ?? ""; // STRICT BUFFER GUARD
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) yield parsed.text;
        } catch {}
      }
    }
  } finally { reader.releaseLock(); }
}

export default function StudioIDE({ initialSession }: any) {
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>(initialSession.messages ??[]);
  const [systemPrompt, setSystemPrompt] = useState(initialSession.systemPrompt ?? "");
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const[leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [, startTransition] = useTransition();
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch('/api/shannon/history').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setSessions(data);
    });
  },[]);

  const handleSubmit = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isStreaming) return;

    const userMessage = { id: nanoid(), role: "user", content: text, createdAt: new Date().toISOString() };
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

    let currentId = initialSession.id;

    try {
      if (!currentId) {
        const res = await fetch('/api/shannon/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: text.substring(0, 30), system_prompt: systemPrompt, messages: optimisticMessages })
        });
        const data = await res.json();
        currentId = data.id;
        setSessions(prev => [data, ...prev]);
        router.replace(`/studio/${currentId}`);
      }

      abortRef.current = new AbortController();
      let accumulatedContent = "";

      const response = await fetch("/api/shannon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentId, messages: optimisticMessages, systemPrompt }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `API error ${response.status}`);
      }

      for await (const chunk of readSSEStream(response)) {
        accumulatedContent += chunk;
        startTransition(() => { setIsThinking(false); setStreamingContent(accumulatedContent); });
      }

      const assistantMessage = { id: nanoid(), role: "assistant", content: accumulatedContent, createdAt: new Date().toISOString() };
      const finalMessages =[...optimisticMessages, assistantMessage];

      startTransition(() => {
        setMessages(finalMessages);
        setStreamingContent("");
        setIsThinking(false);
        setIsStreaming(false);
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
          setMessages([...optimisticMessages, { id: nanoid(), role: "system_error", content: `**SYSTEM ALERT:** ${err.message}`, createdAt: new Date().toISOString() }]);
          setIsThinking(false);
          setIsStreaming(false);
          setStreamingContent("");
          setIsSyncing(false);
        });
      }
    }
  }, [inputValue, isStreaming, messages, initialSession.id, systemPrompt, router]);

  return (
    <>
      <style dangerouslySetOrigin={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        code, pre { font-family: 'JetBrains Mono', monospace !important; }
      `}} />

      {/* DRAWERS */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] border-r border-white/[0.06] z-50 transition-transform duration-300 ${leftOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <span className="text-sm font-semibold text-white/90 tracking-wide">Sessions</span>
          <button onClick={() => setLeftOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"><X size={16}/></button>
        </div>
        <div className="p-3 border-b border-white/[0.04]">
          <button onClick={() => { router.push('/studio'); setLeftOpen(false); }} className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-xl text-[13px] font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] transition-all shadow-sm">
            <Plus size={16} /> New Session
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-4 py-2 text-[10px] text-white/30 uppercase tracking-widest">Recent</p>
          {sessions.map(s => (
            <button key={s.id} onClick={() => { router.push(`/studio/${s.id}`); setLeftOpen(false); }} className={`w-full text-left px-4 py-3 text-[13px] truncate transition-all ${initialSession.id === s.id ? "bg-white/[0.07] text-emerald-400 border-l-2 border-emerald-500" : "text-white/60 hover:text-white/90 hover:bg-white/[0.04]"}`}>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className={`fixed inset-y-0 right-0 w-80 bg-[#0a0a0a] border-l border-white/[0.06] z-50 transition-transform duration-300 ${rightOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <span className="text-sm font-semibold text-white/90 tracking-wide">Run Settings</span>
          <button onClick={() => setRightOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"><X size={16}/></button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <label className="block text-[11px] font-medium text-white/40 uppercase tracking-widest mb-2">System Prompt</label>
          <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={15} className="w-full px-3 py-3 rounded-xl text-[12px] leading-relaxed bg-[#111] border border-white/[0.08] text-white/80 resize-none outline-none focus:border-emerald-500/50 font-mono shadow-inner"/>
        </div>
      </div>

      {/* SHELL */}
      <div className="grid overflow-hidden bg-[#0a0a0a]" style={{ height: "100dvh", gridTemplateRows: "56px 1fr" }}>
        <header className="flex items-center justify-between px-4 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md z-20">
          <button onClick={() => setLeftOpen(true)} className="p-2 text-white/40 hover:text-white transition-colors"><Menu size={20} /></button>
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-medium text-white/80 truncate max-w-[150px] tracking-tight">{initialSession.title}</span>
            {isSyncing ? <CloudSync size={14} className="text-emerald-500 animate-pulse" /> : <CloudOff size={14} className="text-white/20" />}
          </div>
          <button onClick={() => setRightOpen(true)} className="p-2 text-white/40 hover:text-white transition-colors"><Settings2 size={20} /></button>
        </header>

        <div className="flex flex-col overflow-hidden relative">
          <MessageFeed messages={messages} isThinking={isThinking} streamingContent={streamingContent} />
          <div className="flex-shrink-0" style={{ height: "calc(80px + env(safe-area-inset-bottom, 12px))" }} />
        </div>
      </div>

      {/* COMMAND PILL */}
      <div className="fixed left-0 right-0 z-30 px-4 pb-3 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pt-12" style={{ bottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="flex items-end gap-2 px-3 py-2.5 rounded-[28px] bg-[#151515]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-w-3xl mx-auto">
          <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0 mb-0.5"><Sparkles size={20} /></button>
          <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0 hidden sm:block mb-0.5"><LayoutGrid size={20} /></button>

          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`; }}
            placeholder="Message Shannon Architect..."
            rows={1}
            disabled={isStreaming}
            enterKeyHint="enter"
            className="flex-1 bg-transparent text-[15px] leading-relaxed text-white/90 placeholder:text-white/30 resize-none outline-none disabled:opacity-50 min-h-[24px] py-2.5 scrollbar-hide"
            style={{ maxHeight: 150, overflowY: "auto" }}
          />

          <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0 mb-0.5"><Mic size={20} /></button>
          <button onClick={isStreaming ? () => abortRef.current?.abort() : handleSubmit} disabled={!isStreaming && !inputValue.trim()} className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-0.5 ${isStreaming ? 'bg-white/10 hover:bg-white/20' : inputValue.trim() ? 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/[0.05] text-white/20'}`}>
            {isStreaming ? <div className="w-3.5 h-3.5 bg-white rounded-sm" /> : <Send size={16} className={inputValue.trim() ? 'text-white ml-0.5' : 'text-white/20 ml-0.5'} />}
          </button>
        </div>
      </div>

      {(leftOpen || rightOpen) && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => { setLeftOpen(false); setRightOpen(false); }} />}
    </>
  );
}
