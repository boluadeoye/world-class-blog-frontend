"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Zap, Shield, Activity, ChevronRight, Command } from "lucide-react";

export default function OnyxTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([
    { type: "sys", msg: "ONYX SOVEREIGN V1.0 INITIALIZED" },
    { type: "sys", msg: "HARDWARE ENCLAVE: SECURE" },
    { type: "sys", msg: "READY FOR OPERATOR INTENT..." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg = input.toUpperCase();
    setLogs(prev => [...prev, { type: "user", msg: `> ${userMsg}` }]);
    setInput("");
    setIsProcessing(true);

    // SIMULATING THE INTENT ENGINE LOGIC
    setTimeout(() => {
      setLogs(prev => [...prev, { type: "ai", msg: "PARSING INTENT..." }]);
      
      setTimeout(() => {
        if (userMsg.includes("HEDGE") || userMsg.includes("SELL") || userMsg.includes("BUY")) {
          setLogs(prev => [...prev, 
            { type: "ai", msg: "INTENT VALIDATED: CROSS-CHAIN ROUTE FOUND" },
            { type: "ai", msg: "AI SHIELD: CONTRACT AUDIT PASSED (RISK: 0.02%)" },
            { type: "sys", msg: "AWAITING OPERATOR SIGNATURE..." }
          ]);
        } else {
          setLogs(prev => [...prev, { type: "err", msg: "ERROR: UNKNOWN INTENT. USE COMMANDS: BUY, SELL, HEDGE, DRAIN." }]);
        }
        setIsProcessing(false);
      }, 800);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-8 flex flex-col">
      
      {/* === HEADER STATUS === */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-xs font-black tracking-[0.3em]">ONYX.TERMINAL</span>
        </div>
        <div className="flex gap-6 text-[10px] text-gray-500 font-bold">
          <span className="flex items-center gap-1"><Activity size={12}/> LATENCY: 142MS</span>
          <span className="flex items-center gap-1 text-emerald-500"><Shield size={12}/> SHIELD: ACTIVE</span>
        </div>
      </div>

      {/* === MAIN LOG AREA === */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-6 scrollbar-hide"
      >
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-xs md:text-sm leading-relaxed ${
              log.type === "sys" ? "text-gray-500" : 
              log.type === "ai" ? "text-blue-400" : 
              log.type === "err" ? "text-red-500" : "text-white font-bold"
            }`}
          >
            {log.msg}
          </motion.div>
        ))}
        {isProcessing && (
          <div className="text-xs text-gray-600 animate-pulse">_PROCESSING_INTENT...</div>
        )}
      </div>

      {/* === COMMAND INPUT === */}
      <form onSubmit={handleCommand} className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Command size={18} />
        </div>
        <input 
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER INTENT (E.G. 'HEDGE 50% SOL TO USDC')"
          className="w-full bg-white/5 border border-white/10 rounded-none py-5 pl-12 pr-4 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-700 uppercase"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Zap size={18} className={input ? "text-yellow-500" : "text-gray-800"} />
        </div>
      </form>

      {/* === FOOTER STATS === */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-white/5 p-3 bg-white/[0.02]">
          <p className="text-[8px] text-gray-500 uppercase mb-1">Operator Balance</p>
          <p className="text-sm font-bold">$142,000.00</p>
        </div>
        <div className="border border-white/5 p-3 bg-white/[0.02]">
          <p className="text-[8px] text-gray-500 uppercase mb-1">Active Intents</p>
          <p className="text-sm font-bold">0</p>
        </div>
        <div className="border border-white/5 p-3 bg-white/[0.02]">
          <p className="text-[8px] text-gray-500 uppercase mb-1">AI Shield Audits</p>
          <p className="text-sm font-bold">1,242</p>
        </div>
        <div className="border border-white/5 p-3 bg-white/[0.02]">
          <p className="text-[8px] text-gray-500 uppercase mb-1">Profit Share (2%)</p>
          <p className="text-sm font-bold text-emerald-500">+$2,840.00</p>
        </div>
      </div>
    </div>
  );
}
