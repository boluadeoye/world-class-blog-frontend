"use client";

import React, { useState, useRef, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageFeed } from "./MessageFeed";
import { Menu, Settings2, Send, Plus, MessageSquare, X } from "lucide-react";

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
      buffer = lines.pop() ?? "";
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
  const[messages, setMessages] = useState<any[]>(initialSession.messages ?? []);
  const [systemPrompt, setSystemPrompt] = useState(initialSession.systemPrompt ?? "");
  const [inputValue, setInputValue] = useState("");
  const[isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const[leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [, startTransition] = useTransition();
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        window.history.replaceState(null, '', `/studio/${currentId}`);
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
      const finalMessages = [...optimisticMessages, assistantMessage];

      startTransition(() => {
        setMessages(finalMessages);
        setStreamingContent("");
        setIsThinking(false);
        setIsStreaming(false);
      });

      fetch("/api/shannon", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentId, messages: finalMessages }),
      });

    } catch (err: any) {
      if (err.name !== "AbortError") {
        startTransition(() => {
          setMessages([...optimisticMessages, { id: nanoid(), role: "system_error", content: `**SYSTEM ALERT:** ${err.message}`, createdAt: new Date().toISOString() }]);
          setIsThinking(false);
          setIsStreaming(false);
          setStreamingContent("");
        });
      }
    }
  }, [inputValue, isStreaming, messages, initialSession.id, systemPrompt]);

  return (
    <>
      {/* DRAWERS */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-[#111318] border-r border-white/[0.06] z-50 transition-transform duration-300 ${leftOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <span className="text-sm font-semibold text-white/90">Sessions</span>
          <button onClick={() => setLeftOpen(false)} className="text-white/40 hover:text-white"><X size={16}/></button>
        </div>
        <div className="p-3">
          <button onClick={() => { router.push('/studio'); setLeftOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-[13px] text-white/70 hover:text-white bg-white/[0.03] border border-white/[0.06]">
            <Plus size={14} /> New Session
          </button>
        </div>
      </div>

      <div className={`fixed inset-y-0 right-0 w-80 bg-[#111318] border-l border-white/[0.06] z-50 transition-transform duration-300 ${rightOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <span className="text-sm font-semibold text-white/90">Run Settings</span>
          <button onClick={() => setRightOpen(false)} className="text-white/40 hover:text-white"><X size={16}/></button>
        </div>
        <div className="p-4">
          <label className="block text-[11px] font-medium text-white/40 uppercase tracking-widest mb-2">System Prompt</label>
          <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} rows={10} className="w-full px-3 py-2.5 rounded-xl text-[12px] leading-relaxed bg-[#0d0f14] border border-white/[0.08] text-white/80 resize-none outline-none focus:border-emerald-500/50 font-mono"/>
        </div>
      </div>

      {/* SHELL */}
      <div className="grid overflow-hidden bg-[#0d0d0f]" style={{ height: "100dvh", gridTemplateRows: "48px 1fr" }}>
        <header className="flex items-center justify-between px-4 border-b border-white/[0.06] bg-[#0d0d0f]/80 backdrop-blur-md">
          <button onClick={() => setLeftOpen(true)} className="p-2 text-white/40 hover:text-white"><Menu size={18} /></button>
          <span className="text-[14px] font-medium text-white/70 truncate">{initialSession.title}</span>
          <button onClick={() => setRightOpen(true)} className="p-2 text-white/40 hover:text-white"><Settings2 size={18} /></button>
        </header>

        <div className="flex flex-col overflow-hidden relative">
          <MessageFeed messages={messages} isThinking={isThinking} streamingContent={streamingContent} />
          <div className="flex-shrink-0" style={{ height: "calc(68px + env(safe-area-inset-bottom, 12px))" }} />
        </div>
      </div>

      {/* COMMAND PILL */}
      <div className="fixed left-0 right-0 z-30 px-3 pb-2" style={{ bottom: "env(safe-area-inset-bottom, 12px)" }}>
        <div className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-[#151820]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-3xl mx-auto">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder="Message Shannon Architect..."
            rows={1}
            disabled={isStreaming}
            enterKeyHint="enter"
            className="flex-1 bg-transparent text-[15px] leading-relaxed text-white/90 placeholder:text-white/25 resize-none outline-none disabled:opacity-50 min-h-[24px]"
            style={{ maxHeight: 120, overflowY: "auto" }}
          />
          <button onClick={isStreaming ? () => abortRef.current?.abort() : handleSubmit} disabled={!isStreaming && !inputValue.trim()} className="flex-shrink-0 w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/[0.08] flex items-center justify-center transition-all">
            {isStreaming ? <div className="w-3 h-3 bg-white rounded-sm" /> : <Send size={16} className="text-white ml-0.5" />}
          </button>
        </div>
      </div>

      {(leftOpen || rightOpen) && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => { setLeftOpen(false); setRightOpen(false); }} />}
    </>
  );
}
