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

function useDurableHistory(key) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return [];
    try { const raw = localStorage.getItem(key); const v = raw ? JSON.parse(raw) : []; return Array.isArray(v) ? v : []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value.slice(-60))); } catch {} }, [key, value]);
  return [value, setValue];
}

export default function ClientChat() {
  const [messages, setMessages] = useDurableHistory("bolu_chat_history_v2");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("inquiry");
  const endRef = useRef(null);

  // Greeting only used for internal logic context
  const greeting = useMemo(() => "Hi", []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  const clearHistory = () => {
    if(confirm("Clear chat history?")) setMessages([]);
  };

  async function streamAsk(prompt) {
    if (busy) return;
    const userMsg = { role: "user", content: prompt.trim() };
    if (!userMsg.content) return;

    const history = messages.length ? [...messages, userMsg] : [{ role: "assistant", content: greeting }, userMsg];
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
          if (last?.role === "assistant") last.content += "\n\n(Connection interrupted)";
          return copy;
        });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex flex-col h-[calc(100dvh-64px)] bg-slate-950 text-slate-200">
      {/* Clean Mode Bar (No Header) */}
      <div className="flex-none py-3 px-4 border-b border-white/5 flex items-center justify-between bg-slate-950/80 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {MODES.map(m => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                mode === m.key 
                  ? "bg-indigo-600 text-white" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {messages.length > 0 && (
          <button onClick={clearHistory} className="text-slate-500 hover:text-red-400 p-2">
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-2xl mx-auto pb-4">
          
          {/* Empty State - Clean Studio Look */}
          {messages.length === 0 && (
            <div className="mt-12 flex flex-col items-center text-center space-y-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-2">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-xl font-medium text-white">Boluwatife’s Assistant</h2>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                Tailored to help you navigate my work, services, and code.
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            if (!m.content.trim()) return null; // Skip empty
            return (
              <div key={i} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {!isUser && (
                  <div className="flex-none w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center mt-1">
                    <Bot size={16} className="text-indigo-400" />
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isUser 
                      ? "bg-indigo-600 text-white rounded-tr-sm" 
                      : "bg-slate-900 border border-white/5 text-slate-300 rounded-tl-sm"
                  }`}>
                  <div className={`prose prose-invert prose-sm max-w-none ${isUser ? "prose-p:text-white" : "prose-a:text-indigo-400"}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
          
          {busy && (
             <div className="flex gap-3 justify-start animate-pulse">
               <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
               <div className="bg-slate-900 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm w-24 h-10" />
             </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-none p-4 bg-slate-950 border-t border-white/5">
        <form onSubmit={(e)=>{e.preventDefault(); streamAsk(input)}} className="max-w-2xl mx-auto relative">
          <input
            className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            disabled={busy || !input.trim()}
            className="absolute right-2 top-2 p-1.5 rounded-full bg-indigo-600 text-white disabled:opacity-0 transition-all hover:bg-indigo-500"
            type="submit"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
