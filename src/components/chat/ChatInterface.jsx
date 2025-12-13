"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, User, Sparkles, Zap, ArrowLeft } from "lucide-react";
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
    const saved = localStorage.getItem("bolu_neural_history");
    if (saved) {
      try { 
        setMessages(JSON.parse(saved)); 
      } catch (e) { 
        localStorage.removeItem("bolu_neural_history");
      }
    } else {
      setMessages([{ 
        id: "init", 
        role: "assistant", 
        content: "Neural Link Established. Ready." 
      }]);
    }
  }, []);

  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("bolu_neural_history", JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, mounted]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const simulateTyping = async (fullText) => {
    setIsTyping(true);
    const tempId = Date.now();
    setMessages(prev => [...prev, { id: tempId, role: "assistant", content: "" }]);

    let currentText = "";
    const chars = fullText.split("");

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, content: currentText } : msg
      ));
      await new Promise(r => setTimeout(r, 15)); // Faster typing
    }
    setIsTyping(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    
    const userMsg = { id: Date.now(), role: "user", content: userText };
    setMessages(prev => [...prev, userMsg]);
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

      if (res.ok && data.reply) {
        await simulateTyping(data.reply);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          role: "assistant", 
          content: data.error || "Connection severed.",
          isError: true 
        }]);
      }

    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: "assistant", 
        content: "Network unreachable.",
        isError: true 
      }]);
    }
  };

  const clearMemory = () => {
    localStorage.removeItem("bolu_neural_history");
    setMessages([{ id: Date.now(), role: "assistant", content: "Memory purged." }]);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full relative z-20 bg-slate-950/50 backdrop-blur-sm rounded-t-3xl border-t border-x border-white/10 shadow-2xl overflow-hidden">
      
      {/* === HEADER (Compact) === */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1.5 -ml-1 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
                <Bot size={16} className="text-indigo-400" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-xs tracking-wide">Neural Core</h3>
              <p className="text-[9px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
                <Zap size={8} fill="currentColor" /> Online
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={clearMemory} 
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          title="Purge Memory"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* === CHAT STREAM (Tightened) === */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={12} className="text-amber-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.isError
                    ? 'bg-red-900/20 text-red-200 border border-red-500/20 rounded-tl-none'
                    : 'bg-slate-900/80 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                {msg.content}
                {msg.role === 'assistant' && isTyping && msg.id === messages[messages.length-1].id && (
                  <span className="inline-block w-1 h-3 ml-1 bg-indigo-400 animate-pulse align-middle"></span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* === INPUT DECK (Compact & Integrated) === */}
      <div className="p-3 bg-slate-950 border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900 rounded-xl p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Transmit query..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 px-3 py-2 outline-none text-sm font-medium"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
}
