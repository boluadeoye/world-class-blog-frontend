"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages([{
      id: "init",
      role: "assistant",
      content: "Hello. I am Bolu's Digital Consciousness. I can discuss high-level engineering, system architecture, or how I can automate your business. What is on your mind?"
    }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const newHistory = [...messages, { id: Date.now(), role: "user", content: userText }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, context: blogContext }),
      });

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
        action: data.action,
        data: data.data
      }]);

    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content: "Connection interrupted.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 relative font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot size={20} className="text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">Bolu AI</h3>
            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Sparkles size={8} className="text-amber-400" /> Digital Consciousness
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={14} className="text-indigo-400" />
                </div>
              )}
              
              <div className="max-w-[85%] space-y-2">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>

                {/* PAYMENT CARD */}
                {msg.action === "show_payment" && msg.data && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{msg.data.title}</div>
                        <div className="text-emerald-400 text-xs">{msg.data.amount}</div>
                      </div>
                    </div>
                    <a 
                      href={msg.data.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-bold rounded-lg transition-colors"
                    >
                      Pay Now
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Bot size={14} className="text-indigo-400" />
            </div>
            <div className="flex gap-1 items-center h-10 px-4 bg-slate-900 rounded-2xl rounded-tl-none border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 border-t border-white/5">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-all shadow-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Bolu..."
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
