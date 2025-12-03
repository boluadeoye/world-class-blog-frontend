'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, Bot, User, Sparkles, Trash2 } from "lucide-react";

const MODES = [
  { key: "inquiry", label: "Project Inquiry" },
  { key: "advice", label: "Tech Advice" },
  { key: "troubleshoot", label: "Debug Code" },
];

const WELCOME_MSG = {
  role: "assistant",
  content: "Hello! I'm Boluwatife's personal AI assistant. Welcome to his digital studio.\n\nI can help you explore his portfolio, discuss technical architectures, or draft a message to him directly.\n\nHow can I assist you today?"
};

function useDurableHistory(key) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return [WELCOME_MSG];
    try { 
      const raw = localStorage.getItem(key); 
      const v = raw ? JSON.parse(raw) : []; 
      // If storage is empty or invalid, return the welcome message
      return Array.isArray(v) && v.length > 0 ? v : [WELCOME_MSG]; 
    } catch { 
      return [WELCOME_MSG]; 
    }
  });

  useEffect(() => { 
    try { localStorage.setItem(key, JSON.stringify(value.slice(-60))); } catch {} 
  }, [key, value]);

  return [value, setValue];
}

export default function ClientChat() {
  const [messages, setMessages] = useDurableHistory("bolu_chat_history_v3");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("inquiry");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  const clearHistory = () => {
    if(confirm("Clear conversation and restart?")) {
      setMessages([WELCOME_MSG]);
    }
  };

  async function streamAsk(prompt) {
    if (busy) return;
    const userMsg = { role: "user", content: prompt.trim() };
    if (!userMsg.content) return;

    const history = messages.length ? [...messages, userMsg] : [WELCOME_MSG, userMsg];
    setMessages(history);
    setInput("");
    setBusy(true);
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    let appended = false;
    try {
      const r = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "text/event-stream" },
        body: JSON.stringify({ messages: history, mode })
      });
      
      if (!r.ok) throw new Error("Network error");
      
      const reader = r.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

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
            if (evt.delta) {
              appended = true;
              setMessages(prev => {
                const copy = prev.slice();
                const last = copy[copy.length - 1];
                if (last?.role === "assistant") last.content += evt.delta;
                return copy;
              });
            }
          } catch (e) {}
        }
      }
    } catch (e) {
       setMessages(prev => {
          const copy = prev.slice();
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") last.content += "\n\n(Connection interrupted. Please try again.)";
          return copy;
        });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col h-[calc(100dvh-64px)] bg-slate-950 text-slate-200 font-sans">
      {/* Clean Mode Bar */}
      <div className="flex-none py-3 px-4 border-b border-white/5 flex items-center justify-between bg-slate-950/80 backdrop-blur z-10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {MODES.map(m => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                mode === m.key 
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                  : "bg-slate-900 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button onClick={clearHistory} className="text-slate-500 hover:text-red-400 p-2 transition-colors" title="Reset Chat">
          <Trash2 size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-2xl mx-auto pb-4 min-h-full flex flex-col justify-end">
          
          {/* Messages */}
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            if (!m.content && !busy) return null;
            return (
              <div key={i} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                {!isUser && (
                  <div className="flex-none w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center mt-1 shadow-lg shadow-black/50">
                    <Bot size={18} className="text-indigo-400" />
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-md leading-relaxed ${
                    isUser 
                      ? "bg-indigo-600 text-white rounded-tr-sm shadow-indigo-500/10" 
                      : "bg-slate-900 border border-white/5 text-slate-300 rounded-tl-sm shadow-black/20"
                  }`}>
                  <div className={`prose prose-invert prose-sm max-w-none ${isUser ? "prose-p:text-white" : "prose-a:text-indigo-400 prose-strong:text-indigo-300"}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
          
          {busy && (
             <div className="flex gap-3 justify-start animate-pulse">
               <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                 <Bot size={18} className="text-indigo-400/50" />
               </div>
               <div className="bg-slate-900 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
               </div>
             </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-none p-4 bg-slate-950 border-t border-white/5 z-20">
        <form onSubmit={(e)=>{e.preventDefault(); streamAsk(input)}} className="max-w-2xl mx-auto relative group">
          <input
            className="w-full bg-slate-900 border border-white/10 rounded-full pl-6 pr-14 py-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-lg shadow-black/20"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message to Boluwatife's Assistant..."
          />
          <button
            disabled={busy || !input.trim()}
            className="absolute right-2.5 top-2.5 p-2 rounded-full bg-indigo-600 text-white disabled:opacity-0 transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
            type="submit"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}
