"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, Sparkles, User } from "lucide-react";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: "init",
      role: "assistant",
      content: "Hello. I'm Bolu's Digital Twin. Ask me about my projects, stack, or experience."
    }]);
  }, []);

  useEffect(() => {
    if (mounted) scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mounted]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMsg = { id: Date.now(), role: "user", content: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: blogContext
        }),
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply || "No response."
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "Connection interrupted.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <div className="h-[600px] w-full bg-slate-900/50 rounded-3xl animate-pulse"></div>;

  return (
    <div className="flex flex-col h-[600px] w-full bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">Digital Twin</h3>
            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Sparkles size={8} className="text-amber-400" /> AI Powered
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ id: Date.now(), role: "assistant", content: "Memory cleared." }])}
          className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-full transition-all"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-indigo-400" />
              </div>
            )}
            
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/10'
                : msg.isError
                  ? 'bg-red-900/20 text-red-200 border border-red-500/20'
                  : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none'
            }`}>
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                <User size={14} className="text-slate-400" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-indigo-400" />
            </div>
            <div className="bg-slate-800/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-md">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900/50 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 focus-within:bg-slate-900/80 transition-all shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
