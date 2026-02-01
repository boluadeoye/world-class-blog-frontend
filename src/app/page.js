"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Shield, Zap, ArrowUpRight, Activity } from "lucide-react";

const Card = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    className={`glass rounded-none p-6 relative group ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 text-neutral-400 hover:text-white hover:border-white/20 transition-all cursor-default">
    <Icon size={12} />
    <span className="text-[10px] uppercase tracking-wider">{label}</span>
  </div>
);

const NeuralInterface = () => {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([
    { role: "sys", content: "Neural Link v2.1 // Ready." }
  ]);
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [log]);

  const send = async () => {
    if (!input.trim() || busy) return;
    const userMsg = { role: "usr", content: input };
    setLog(prev => [...prev, userMsg]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: userMsg.content }] })
      });
      const data = await res.json();
      setLog(prev => [...prev, { role: "sys", content: data.reply || "Connection severed." }]);
    } catch {
      setLog(prev => [...prev, { role: "err", content: "Latency spike detected." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between font-mono text-xs">
      <div className="flex items-center gap-2 mb-4 text-neutral-500 border-b border-white/5 pb-2">
        <Activity size={14} />
        <span className="uppercase tracking-widest">Live Interaction</span>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-2 mb-3 max-h-[240px] scrollbar-none">
        {log.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'usr' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-2 ${m.role === 'usr' ? 'text-white bg-white/10' : 'text-neutral-400'}`}>
              <span className="opacity-30 mr-2">[{m.role === 'usr' ? 'TX' : 'RX'}]</span>
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="text-neutral-600 animate-pulse">[PROCESSING]</div>}
        <div ref={endRef} />
      </div>

      <div className="relative group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Execute command..."
          className="w-full bg-black/50 border border-white/10 p-3 text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-700"
        />
        <div className="absolute right-3 top-3 opacity-30 group-focus-within:opacity-100 transition-opacity">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-12 relative">
      <div className="absolute inset-0 infinite-grid z-0 opacity-30" />
      
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5">
        
        {/* Identity */}
        <Card className="md:col-span-8 min-h-[240px] flex flex-col justify-center border-r border-white/5">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
            Boluwatife
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-neutral-400 font-mono tracking-tight">
              STAFF SYSTEMS ARCHITECT
            </span>
            <span className="h-px w-8 bg-neutral-700" />
            <span className="text-sm text-[#f55036] font-mono">
              SOVEREIGN INFRASTRUCTURE
            </span>
          </div>
        </Card>

        {/* Metrics */}
        <Card className="md:col-span-4 flex flex-col justify-between" delay={0.1}>
          <div className="flex justify-between text-neutral-500">
            <Zap size={18} />
            <span className="text-[10px] uppercase">P95 Latency</span>
          </div>
          <div>
            <div className="text-6xl font-bold text-white tracking-tighter">178<span className="text-lg text-neutral-600 ml-1">ms</span></div>
            <div className="text-[10px] text-neutral-500 mt-2 font-mono">GROQ LPU // OPTIMIZED</div>
          </div>
        </Card>

        {/* Stack */}
        <Card className="md:col-span-4 flex flex-col gap-4 border-t border-white/5" delay={0.2}>
          <div className="flex items-center gap-2 text-neutral-500 mb-2">
            <Cpu size={16} />
            <span className="text-[10px] uppercase tracking-widest">Core Stack</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge icon={Terminal} label="Next.js 15" />
            <Badge icon={Zap} label="Groq LPU" />
            <Badge icon={Shield} label="Neon RLS" />
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="md:col-span-8 row-span-2 bg-black/20 border-l border-t border-white/5" delay={0.3}>
          <NeuralInterface />
        </Card>

        {/* Case Study Link */}
        <Card className="md:col-span-4 border-t border-white/5 hover:bg-white/5 cursor-pointer transition-colors" delay={0.4}>
          <div className="h-full flex flex-col justify-between">
            <div className="text-neutral-500 text-[10px] uppercase tracking-widest">Case Study</div>
            <div className="flex items-end justify-between">
              <span className="text-lg text-white font-medium leading-tight">Scholars Edge<br/>Audit 2026</span>
              <ArrowUpRight className="text-neutral-400" />
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
