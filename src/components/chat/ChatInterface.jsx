"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Bot, User, ArrowLeft, Sparkles, Zap } from "lucide-react";
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
      try { setMessages(JSON.parse(saved)); } catch (e) { localStorage.removeItem("bolu_neural_history"); }
    } else {
      setMessages([{ 
        id: "init", 
        role: "assistant", 
        content: "Neural Link Established. I am ready to discuss your project." 
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
      await new Promise(r => setTimeout(r, 10));
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

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#0a0a0a] relative z-20">
      
      {/* === HEADER (Solid & Visible) === */}
      <div className="flex items-center justify-between px-4 py-4 bg-slate-900 border-b border-white/10 shadow-md pt-8 md:pt-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                <Bot size={20} className="text-indigo-400" />
              </div>
              {/* Status Light */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-white text-sm leading-tight">Boluwatife's<br/>Digital Consciousness</h3>
              <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider mt-0.5">Online</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { localStorage.removeItem("bolu_neural_history"); setMessages([]); }} 
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          title="Reset Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* === CHAT STREAM === */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={14} className="text-amber-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : msg.isError
                    ? 'bg-red-900/20 text-red-200 border border-red-500/20 rounded-tl-sm'
                    : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-sm'
              }`}>
                {msg.content}
                {msg.role === 'assistant' && isTyping && msg.id === messages[messages.length-1].id && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle"></span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* === INPUT DECK (Solid Bottom) === */}
      <div className="p-4 bg-slate-900 border-t border-white/10">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-950 text-white placeholder-slate-500 px-5 py-3.5 rounded-full border border-white/10 focus:border-indigo-500 focus:outline-none text-sm transition-all"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

    </div>
  );
}
