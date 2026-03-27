"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Send, Terminal, Eye, Edit3, 
  Download, ChevronRight, Layers, Box, 
  CheckCircle2, Loader2, Shield
} from "lucide-react";

export default function TitaniumOracle() {
  const [step, setStep] = useState("input"); // input, forging, editor, preview
  const [prompt, setPrompt] = useState("");
  const [docData, setDocData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setStep("forging");
    addLog("INITIALIZING NEURAL LINK...");
    
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        body: JSON.stringify({ 
          prompt, 
          docType: "TECHNICAL_SPEC", 
          theme: "OBSIDIAN_EMERALD" 
        }),
      });
      
      const result = await res.json();
      if (result.success) {
        setDocData(result.data);
        addLog("SCHEMA COMPILED SUCCESSFULLY.");
        setTimeout(() => setStep("editor"), 1000);
      }
    } catch (err) {
      addLog("CRITICAL_ERROR: LINK_SEVERED");
      setStep("input");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* === DUAL-VIEW PRINT RESET === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; }
          body * { visibility: hidden; }
          #print-engine, #print-engine * { visibility: visible; }
          #print-engine { 
            position: absolute; left: 0; top: 0; width: 210mm; 
            background: white; display: block !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* === VIEW 1: THE COMMAND CENTER (UI) === */}
      <div className="no-print max-w-lg mx-auto px-6 py-12 flex flex-col h-[100dvh]">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/50 rounded flex items-center justify-center">
              <Cpu size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">Titanium Oracle</h1>
              <p className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Sovereign Engine v1.2</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-emerald-500/50 rounded-full"></div>
          </div>
        </header>

        <main className="grow flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP: INPUT */}
            {step === "input" && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="relative">
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the document architecture..."
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:border-emerald-500 outline-none transition-all resize-none h-32"
                  />
                  <div className="absolute bottom-4 right-0">
                    <button 
                      onClick={handleGenerate}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                    <FileText size={14} className="mb-2 text-emerald-500" />
                    Executive Resume
                  </button>
                  <button className="p-4 border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-left hover:bg-white/10 transition-colors">
                    <Shield size={14} className="mb-2 text-emerald-500" />
                    Technical Audit
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP: FORGING */}
            {step === "forging" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center grow"
              >
                <Loader2 size={48} className="text-emerald-500 animate-spin mb-6" />
                <div className="font-mono text-[10px] text-emerald-400 space-y-2 text-center">
                  {logs.map((log, i) => (
                    <p key={i} className="opacity-80">{log}</p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP: EDITOR */}
            {step === "editor" && docData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 pb-24"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-emerald-500">Skeleton Forge</h2>
                  <button 
                    onClick={() => setStep("preview")}
                    className="flex items-center gap-2 text-[10px] font-black uppercase bg-emerald-500 text-black px-4 py-2 rounded"
                  >
                    Compile <ChevronRight size={14} />
                  </button>
                </div>

                {docData.pages.map((page, pIdx) => (
                  <div key={pIdx} className="p-6 border border-white/10 bg-white/5 rounded-xl space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] font-mono text-slate-500">PAGE_0{page.page_number}</span>
                      <span className="text-[10px] font-black uppercase text-white">{page.layout}</span>
                    </div>
                    {page.blocks.map((block, bIdx) => (
                      <div key={bIdx} className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-emerald-500/50">{block.type}</label>
                        <input 
                          type="text"
                          defaultValue={block.content || block.value}
                          className="w-full bg-transparent border-b border-white/5 py-1 text-sm focus:border-emerald-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* System Logs Footer */}
        {step !== "forging" && (
          <footer className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 font-mono text-[8px] text-slate-500 uppercase tracking-widest">
              <Terminal size={10} />
              <span>System Status: Optimal</span>
              <span className="ml-auto">Keys: 3/3 Active</span>
            </div>
          </footer>
        )}
      </div>

      {/* === VIEW 2: THE PRINT ENGINE (Hidden on Screen) === */}
      <div id="print-engine" className="hidden">
        {docData?.pages.map((page, i) => (
          <div key={i} className="w-[210mm] h-[297mm] relative bg-white text-black overflow-hidden page-break">
            {/* This is where Phase 3 will map the JSON to Millimeter Components */}
            <div className="p-[20mm]">
              <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">{docData.document_meta.title}</h1>
              <p className="text-sm text-slate-500 mb-12">Page {page.page_number} // {page.layout}</p>
              <div className="space-y-6">
                {page.blocks.map((block, bIdx) => (
                  <div key={bIdx} className="border-l-4 border-black pl-6 py-2">
                    <p className="text-xs font-black uppercase mb-1">{block.type}</p>
                    <p className="text-lg">{block.content || block.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function FileText({ className, size }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
