"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Sparkles, Bot, User, Circle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatInterface({ blogContext }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("bolu_chat_history");
    if (saved) {
      try { setMessages(JSON.parse(saved)); } catch (e) {}
    } else {
      setMessages([{
        id: "init",
        role: "assistant",
        content: "Hello! I’m Bolu's digital twin. I'm online and ready to chat."
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("bolu_chat_history", JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const simulateTyping = async (text) => {
    // Add the message placeholder
    const tempId = Date.now();
    setMessages(prev => [...prev, { id: tempId, role: "assistant", content: "" }]);
    
    const words = text.split(" ");
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setMessages(prev => prev.map(msg => msg.id === tempId ? { ...msg, content: currentText } : msg));
      await new Promise(r => setTimeout(r, 30));
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
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
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
          content: data.error || "Connection failed.",
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
    setMessages([{ id: Date.now(), role: "assistant", content: "Memory cleared." }]);
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/5">
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
            <h3 className="font-bold text-white text-sm">Bolu's Digital Twin</h3>
            <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1">
              <Circle size={6} fill="currentColor" /> Systems Online
            </p>
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
              
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-900/20 text-red-200 border border-red-500/20 rounded-tl-none'
                    : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <User size={14} className="text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator (Separate from messages) */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <div className="bg-slate-800/50 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
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
        <form onSubmit={handleSend} className="relative flex items-center gap-2 bg-slate-900 rounded-full p-1.5 border border-white/10 focus-within:border-indigo-500/50 transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about Bolu's work..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 px-4 py-2 outline-none text-sm"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
}
