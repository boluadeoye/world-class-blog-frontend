"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, Circle } from "lucide-react";

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
      content: "System Online. I am Bolu's Digital Twin. Ask me anything."
    }]);
  }, []);

  useEffect(() => {
    if (mounted) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, mounted]);

  // --- CRASH FIX: BULLETPROOF RENDERER ---
  const renderContent = (content) => {
    try {
      if (!content) return "";
      if (typeof content === 'string') return content;
      if (typeof content === 'object') {
        // If it's an object, try to find text, otherwise stringify it
        if (content.text) return String(content.text);
        if (content.message) return String(content.message);
        return JSON.stringify(content); 
      }
      return String(content);
    } catch (e) {
      return "Message format error.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    // Create user message
    const userMsg = { id: Date.now(), role: "user", content: userText };
    
    // Optimistic update
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prepare payload with current history + new message
      const payloadMessages = [...messages, userMsg];
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
          context: blogContext || "General Tech Context"
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      // Validate response strictly
      const replyText = typeof data.reply === 'string' ? data.reply : JSON.stringify(data.reply);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: replyText
      }]);

    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: "Connection interrupted. Please try again.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return <div className="h-[70vh] w-full bg-slate-900/50 rounded-3xl animate-pulse"></div>;
  }

  return (
    <div className="flex flex-col h-[75vh] w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Digital Twin</h3>
            <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
              <Circle size={6} fill="currentColor" /> Online
            </p>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ id: Date.now(), role: "assistant", content: "Memory cleared. How can I help?" }])}
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          aria-label="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                <Bot size={14} className="text-amber-400" />
              </div>
            )}
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : msg.isError
                  ? 'bg-red-900/20 text-red-200 border border-red-500/20'
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
            }`}>
              {renderContent(msg.content)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/5">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-800/50 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-colors shadow-lg">
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
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
