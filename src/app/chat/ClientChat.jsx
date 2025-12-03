'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Mail, Send, Bot, User, Sparkles } from "lucide-react";

const MODES = [
  { key: "inquiry", label: "Project Inquiry" },
  { key: "advice", label: "Tech Advice" },
  { key: "troubleshoot", label: "Debug" },
  { key: "writing", label: "Writing" },
];

const SUGGESTS = [
  "I want a website — where do we start?",
  "Can you review a simple API design?",
  "Help me debug a 500 error.",
  "Outline a one‑page landing for my idea.",
];

function useDurableHistory(key) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return [];
    try { const raw = localStorage.getItem(key); const v = raw ? JSON.parse(raw) : []; return Array.isArray(v) ? v : []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value.slice(-60))); } catch {} }, [key, value]);
  useEffect(() => {
    const fn = (e) => { if (e.key === key && e.newValue) try { setValue(JSON.parse(e.newValue)); } catch {} };
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, [key]);
  return [value, setValue];
}

export default function ClientChat() {
  const [messages, setMessages] = useDurableHistory("bolu_chat_history_v2");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("inquiry");
  const endRef = useRef(null);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "boluadeoye97@gmail.com";

  const greeting = useMemo(() => `Hi, I’m Boluwatife’s AI Assistant. How can I help you today?`, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  // Reset/Clear history if it gets too long or stuck
  const clearHistory = () => {
    if(confirm("Clear chat history?")) setMessages([]);
  };

  async function fallbackComplete(history) {
    const r = await fetch("/api/chat/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, mode })
    });
    const raw = await r.text();
    let j = {};
    try { j = JSON.parse(raw); } catch { j = { error: raw }; }
    if (!r.ok || !j?.reply) throw new Error(j?.error || "Fallback failed");
    return j.reply;
  }

  async function streamAsk(prompt) {
    if (busy) return;
    const userMsg = { role: "user", content: prompt.trim() };
    if (!userMsg.content) return;

    const history = messages.length ? [...messages, userMsg] : [{ role: "assistant", content: greeting }, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);

    // Add placeholder for AI response
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    let appended = false;
    try {
      const r = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "text/event-stream" },
        body: JSON.stringify({ messages: history, mode })
      });
      if (!r.ok || !r.body) throw new Error("stream request failed");

      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let gotAny = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split(/\n\n/);
        buffer = parts.pop() || "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const json = line.slice(5).trim();
          if (!json) continue;
          try {
            const evt = JSON.parse(json);
            if (evt.error) throw new Error(evt.error);
            if (evt.delta) {
              gotAny = true;
              appended = true;
              setMessages(prev => {
                const copy = prev.slice();
                const last = copy[copy.length - 1];
                if (last?.role === "assistant") last.content += evt.delta;
                return copy;
              });
            }
          } catch (e) { throw e; }
        }
      }

      if (!gotAny) {
        const reply = await fallbackComplete(history);
        appended = true;
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") last.content = reply;
          return copy;
        });
      }
    } catch (e) {
      try {
        const reply = await fallbackComplete(history);
        appended = true;
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") last.content = reply;
          return copy;
        });
      } catch (e2) {
        const msg = String(e2?.message || e?.message || "Network issue");
        setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") last.content = `Error: ${msg}`;
          return copy;
        });
      }
    } finally {
      setBusy(false);
    }
  }

  const onSubmit = (e) => { e.preventDefault(); streamAsk(input); };

  return (
    <main className="flex flex-col h-dvh bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="flex-none p-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Bot size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 leading-tight">Assistant</h1>
              <p className="text-xs text-slate-400 font-medium">Powered by Gemini 2.0</p>
            </div>
          </div>
          <button onClick={clearHistory} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Clear Chat
          </button>
        </div>
      </header>

      {/* Mode Selector */}
      <div className="flex-none p-2 bg-slate-950/50 border-b border-white/5 overflow-x-auto">
        <div className="max-w-3xl mx-auto flex gap-2 px-2">
          {MODES.map(m => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                mode === m.key 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.2)]" 
                  : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        <div className="max-w-3xl mx-auto pb-20">
          {/* Welcome Empty State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-4">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                How can I assist you?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => streamAsk(s)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-left text-slate-300 transition-all hover:-translate-y-0.5 hover:border-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Bubbles */}
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {!isUser && (
                  <div className="flex-none w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                    <Bot size={14} className="text-indigo-300" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-md ${
                    isUser
                      ? "bg-indigo-600 text-white rounded-tr-sm"
                      : "bg-slate-900 border border-white/10 text-slate-300 rounded-tl-sm"
                  }`}
                >
                  <div className={`prose prose-invert prose-sm max-w-none ${isUser ? "prose-p:text-white" : "prose-a:text-indigo-400"}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {isUser && (
                  <div className="flex-none w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mt-1">
                    <User size={14} className="text-indigo-300" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {busy && (
            <div className="flex gap-4 justify-start animate-in fade-in duration-300">
              <div className="flex-none w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mt-1">
                <Bot size={14} className="text-indigo-300" />
              </div>
              <div className="bg-slate-900 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="flex-none p-4 bg-slate-950 border-t border-white/5 z-20">
        <form 
          onSubmit={onSubmit} 
          className="max-w-3xl mx-auto relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all"
        >
          <textarea
            className="flex-1 bg-transparent border-0 text-slate-200 placeholder-slate-500 focus:ring-0 resize-none py-3 px-3 max-h-32 min-h-[48px]"
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if(input.trim()) onSubmit(e);
              }
            }}
            placeholder="Ask anything..."
          />
          <button
            disabled={busy || !input.trim()}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all mb-0.5"
            type="submit"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-600">AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </main>
  );
}
