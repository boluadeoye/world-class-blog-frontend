"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Sparkles, Bot, User, Circle, AlertCircle, ArrowLeft } from "lucide-react";
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
      try { 
        const parsed = JSON.parse(saved);
        // FIX: Filter out empty/broken messages on load
        const cleanMessages = parsed.filter(m => m.content && typeof m.content === 'string' && m.content.trim() !== "");
        setMessages(cleanMessages.length > 0 ? cleanMessages : [{
          id: "init",
          role: "assistant",
          content: "Hello! I’m Bolu's digital twin. I'm online and ready to chat."
        }]);
      } catch (e) {
        setMessages([{
          id: "init",
          role: "assistant",
          content: "Hello! I’m Bolu's digital twin. I'm online and ready to chat."
        }]);
      }
    } else {
      setMessages([{
        id: "init",
        role: "assistant",
        content: "Hello! I’m Bolu's digital twin. I'm online and ready to chat."
      }]);
    }
  }, []);

  useEffect(() => {
    if (mounted && messages.length > 0) {
      // Only save valid messages
      const validToSave = messages.filter(m => m.content && m.content.trim() !== "");
      localStorage.setItem("bolu_chat_history", JSON.stringify(validToSave));
      scrollToBottom();
    }
  }, [messages, mounted]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const simulateTyping = async (text) => {
    if (!text) return;
    const tempId = Date.now();
    setMessages(prev => [...prev, { id: tempId, role: "assistant", content: "" }]);
    
    const words = text.split(" ");
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setMessages(prev => prev.map(msg => msg.id === tempId ? { ...msg, content: currentText } : msg));
      await new Promise(r => setTimeout(r, 20));
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
          messages: [...messages, userMsg], // Send full history
          context: blogContext 
        }),
      });

      const data = await res.json();
      setIsTyping(false);
      
      if (res.ok && data.reply) {
        await simulateTyping(data.reply);
      } else {
        const errorMsg = typeof data.error === 'string' ? data.error : "Unknown error occurred.";
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          role: "assistant", 
          content: errorMsg,
          isError: true
        }]);
      }

    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content: "Network Error. Please check your connection.", isError: true }]);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("bolu_chat_history");
    setMessages([{ id: Date.now(), role: "assistant", content: "Memory cleared. Ready to chat." }]);
  };

  if (!mounted) return <div className="h-[70vh] w-full bg-slate-900/50 rounded-3xl animate-pulse border border-white/5"></div>;

  return (
    <div className="flex flex-col h-[75vh] w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-indigo-400" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Digital Twin</h3>
              <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
                <Circle size={6} fill="currentColor" /> Online
              </p>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
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
                  {msg.isError ? <AlertCircle size={14} className="text-red-500" /> : <Sparkles size={14} className="text-amber-400" />}
                </div>
              )}
              
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-900/20 text-red-200 border border-red-500/20 rounded-tl-none'
                    : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {String(msg.content)}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center border border-white/5">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-950 border-t border-white/5">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-colors shadow-lg">
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
