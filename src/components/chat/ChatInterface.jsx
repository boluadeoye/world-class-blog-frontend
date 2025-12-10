"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, Sparkles, MessageCircle, Code, Briefcase } from "lucide-react";

const SUGGESTIONS = [
  { label: "Contact Me", icon: MessageCircle, prompt: "How can I contact you?" },
  { label: "Tech Stack", icon: Code, prompt: "What is your preferred tech stack?" },
  { label: "Recent Projects", icon: Briefcase, prompt: "Tell me about your recent projects." },
];

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bolu_chat_history_v3");
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) { initChat(); }
    } else {
      initChat();
    }
  }, []);

  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("bolu_chat_history_v3", JSON.stringify(messages));
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mounted]);

  const initChat = () => {
    setMessages([{
      id: "init",
      role: "assistant",
      content: "Hi! I'm Bolu's Digital Twin (v3.0). I can help you navigate my portfolio or get in touch directly. What do you need?"
    }]);
  };

  const clearChat = () => {
    localStorage.removeItem("bolu_chat_history_v3");
    initChat();
  };

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    setInput("");
    const userMsg = { id: Date.now(), role: "user", content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], context: blogContext }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: data.reply || "I'm thinking..." }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "assistant", content: "Connection unstable.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text) => {
    if (!text) return "";
    const urlRegex = /((https?:\/\/[^\s]+)|([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+))/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part?.match(/^https?:\/\//)) return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline font-medium hover:text-amber-300 break-all">{part}</a>;
      if (part?.match(/@[a-zA-Z0-9._-]+\./)) return <a key={i} href={`mailto:${part}`} className="text-amber-400 underline font-medium hover:text-amber-300 break-all">{part}</a>;
      return <span key={i}>{part}</span>;
    });
  };

  if (!mounted) return <div className="h-[75vh] w-full bg-slate-900/50 rounded-3xl animate-pulse"></div>;

  return (
    <div className="flex flex-col h-[75vh] w-full bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative font-sans">
      <div className="flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/5 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">Bolu AI <span className="text-xs opacity-50">v3.0</span></h3>
            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1"><Sparkles size={8} className="text-amber-400" /> Online</p>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"><Trash2 size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-1"><Bot size={14} className="text-indigo-400" /></div>}
            <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/10' : msg.isError ? 'bg-red-900/20 text-red-200 border border-red-500/20' : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'}`}>{renderMessage(msg.content)}</div>
          </div>
        ))}
        {isLoading && <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0"><Bot size={14} className="text-indigo-400" /></div><div className="bg-slate-800/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]"></span><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span></div></div>}
        <div ref={scrollRef} />
      </div>
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
        {SUGGESTIONS.map((s) => (
          <button key={s.label} onClick={() => handleSend(s.prompt)} disabled={isLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 rounded-full text-xs text-slate-300 hover:text-white transition-all whitespace-nowrap"><s.icon size={12} />{s.label}</button>
        ))}
      </div>
      <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center gap-2 bg-slate-900/50 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 focus-within:bg-slate-900/80 transition-all shadow-lg">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none text-sm" />
          <button type="submit" disabled={!input.trim() || isLoading} className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"><Send size={16} /></button>
        </form>
      </div>
    </div>
  );
}
