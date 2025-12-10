"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, User, Circle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bolu_chat_history");
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) { localStorage.removeItem("bolu_chat_history"); }
    } else {
      setMessages([{ id: "init", role: "assistant", content: "Systems Online. How can I assist you?" }]);
    }
  }, []);

  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("bolu_chat_history", JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, mounted]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const simulateTyping = async (text) => {
    if (!text || typeof text !== 'string') return;
    
    const tempId = Date.now();
    setMessages(prev => [...prev, { id: tempId, role: "assistant", content: "" }]);
    
    const chars = text.split(""); // Split by char for smoother effect
    let currentText = "";

    // Faster typing loop
    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      // Update state every 3 chars to reduce render load
      if (i % 3 === 0 || i === chars.length - 1) {
        setMessages(prev => prev.map(msg => msg.id === tempId ? { ...msg, content: currentText } : msg));
        await new Promise(r => setTimeout(r, 10));
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

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
      setIsTyping(false);
      
      // Safe execution
      if (data && data.reply) {
        await simulateTyping(data.reply);
      } else {
        setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content: "Signal lost." }]);
      }

    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content: "Network error." }]);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Digital Twin</h3>
            <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
              <Circle size={6} fill="currentColor" /> Online
            </p>
          </div>
        </div>
        <button onClick={() => { localStorage.removeItem("bolu_chat_history"); setMessages([]); }} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={14} className="text-amber-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
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
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
}
