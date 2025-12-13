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

  // 1. AGGRESSIVE LOAD (Hydration Safe)
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bolu_neural_history");
    if (saved) {
      try { 
        setMessages(JSON.parse(saved)); 
      } catch (e) { 
        // Corrupt data? Reset.
        localStorage.removeItem("bolu_neural_history");
      }
    } else {
      // Initial Welcome
      setMessages([{ 
        id: "init", 
        role: "assistant", 
        content: "Neural Link Established. I am ready to assist." 
      }]);
    }
  }, []);

  // 2. AGGRESSIVE SAVE
  useEffect(() => {
    if (mounted && messages.length > 0) {
      localStorage.setItem("bolu_neural_history", JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages, mounted]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  // 3. TYPING SIMULATION ENGINE
  const simulateTyping = async (fullText) => {
    setIsTyping(true);
    const tempId = Date.now();
    
    // Add empty bot message placeholder
    setMessages(prev => [...prev, { id: tempId, role: "assistant", content: "" }]);

    let currentText = "";
    const chars = fullText.split("");

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      
      // Update the last message with new character
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, content: currentText } : msg
      ));

      // Typing speed variation for realism (10ms - 30ms)
      await new Promise(r => setTimeout(r, Math.random() * 20 + 10));
    }
    setIsTyping(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    
    // Add User Message
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
      
      // Remove typing state temporarily to start simulation
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
    setMessages([{ id: Date.now(), role: "assistant", content: "Memory purged. Systems rebooted." }]);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full relative z-20">
      
      {/* === HEADER === */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Bot size={20} className="text-indigo-400" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-wide">Neural Core</h3>
              <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
                <Zap size={10} fill="currentColor" /> Online
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={clearMemory} 
          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
          title="Purge Memory"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* === CHAT STREAM === */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles size={14} className="text-amber-400" />
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg backdrop-blur-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-900/20' 
                  : msg.isError
                    ? 'bg-red-900/20 text-red-200 border border-red-500/20 rounded-tl-none'
                    : 'bg-slate-900/80 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                {msg.content}
                {/* Cursor for typing effect */}
                {msg.role === 'assistant' && isTyping && msg.id === messages[messages.length-1].id && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle"></span>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loading State (Thinking) */}
        {isTyping && messages[messages.length-1]?.role === 'user' && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-900/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* === INPUT DECK === */}
      <div className="p-4 md:p-6 bg-slate-950 border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900 rounded-2xl p-2 border border-white/10 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Transmit query to neural core..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 px-4 py-2 outline-none text-sm font-medium"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            Powered by Gemini 2.0 Flash • Boluwatife Adeoye
          </p>
        </div>
      </div>

    </div>
  );
}
