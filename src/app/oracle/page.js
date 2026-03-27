"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Send, Terminal, ChevronRight, 
  FileText, Shield, Loader2, Printer, ArrowLeft,
  QrCode, CheckCircle2, Hexagon, BarChart3, Table2, Type
} from "lucide-react";

export default function TitaniumOracle() {
  const [step, setStep] = useState("input"); // input, forging, editor, preview
  const [prompt, setPrompt] = useState("");
  const[docData, setDocData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [cryptoHash, setCryptoHash] = useState("");
  const [activeTheme, setActiveTheme] = useState("OBSIDIAN"); // OBSIDIAN or ALABASTER

  const addLog = (msg) => setLogs(prev =>[...prev.slice(-4), `> ${msg}`]);

  useEffect(() => {
    const generateHash = async () => {
      const data = `ORACLE_V3_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      setCryptoHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    };
    generateHash();
  },[]);

  const handleGenerate = () => {
    if (!prompt) return;
    setStep("forging");
    addLog("INITIALIZING DYNAMIC BLOCK ENGINE...");
    
    // SIMULATING AI JSON RESPONSE FOR A COMPLEX DOCUMENT
    setTimeout(() => {
      addLog("SCHEMA COMPILED. LOADING BLOCKS...");
      setDocData({
        meta: { title: "System Architecture Spec", version: "2026.3" },
        pages: [
          {
            page_number: 1,
            blocks:[
              { id: "b1", type: "HEADER", content: "The Sovereign Stack", subtitle: "High-Performance Infrastructure Blueprint" },
              { id: "b2", type: "PARAGRAPH", content: "This document outlines the transition from legacy monolithic architectures to deterministic, edge-native sovereign systems. By leveraging Groq LPUs and Neon RLS, we achieve mathematical finality in both performance and security." },
              { id: "b3", type: "BAR_CHART", title: "Latency Benchmarks (TTFT)", data:[
                { label: "Standard GPU (A100)", value: 3000, color: "danger" },
                { label: "Titanium LPU (Groq)", value: 180, color: "success" }
              ]},
              { id: "b4", type: "PARAGRAPH", content: "As demonstrated above, the LPU architecture delivers a 16.6x reduction in latency, fundamentally altering the user retention metrics for agentic AI applications." }
            ]
          },
          {
            page_number: 2,
            blocks:[
              { id: "b5", type: "HEADER", content: "Data Sovereignty", subtitle: "Zero-Trust Implementation" },
              { id: "b6", type: "TABLE", title: "Security Matrix", headers: ["Vector", "Legacy Approach", "Sovereign Standard"], rows:[
                ["Data Isolation", "Application Logic", "Database RLS"],["Threat Mitigation", "Internal Firewall", "Edge WAF (Cloudflare)"],
                ["Identity", "Session Cookies", "Cryptographic JWT"]
              ]},
              { id: "b7", type: "PARAGRAPH", content: "Row-Level Security (RLS) ensures that even in the event of an API compromise, tenant data remains cryptographically isolated at the lowest possible level." },
              { id: "b8", type: "SEAL", name: "Bolu Adeoye", role: "Lead Systems Architect" }
            ]
          }
        ]
      });
      setTimeout(() => setStep("editor"), 800);
    }, 2000);
  };

  const handlePrint = () => {
    document.title = `${docData?.meta?.title.replace(/\s+/g, '_')}_V3`;
    window.print();
  };

  // === THEME DICTIONARY ===
  const themes = {
    OBSIDIAN: {
      bg: "bg-[#050505]", text: "text-white", accent: "text-[#10B981]", 
      border: "border-[#10B981]", bgAccent: "bg-[#10B981]", 
      cardBg: "bg-white/5", cardBorder: "border-white/10",
      danger: "bg-red-500", success: "bg-[#10B981]"
    },
    ALABASTER: {
      bg: "bg-[#FDFCFB]", text: "text-[#0A0A0A]", accent: "text-[#C5A059]", 
      border: "border-[#C5A059]", bgAccent: "bg-[#C5A059]", 
      cardBg: "bg-slate-50", cardBorder: "border-slate-200",
      danger: "bg-slate-800", success: "bg-[#C5A059]"
    }
  };
  const t = themes[activeTheme];

  return (
    <div className={`min-h-[100dvh] ${themes.OBSIDIAN.bg} text-slate-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden`}>
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: ${activeTheme === 'OBSIDIAN' ? '#050505' : '#FDFCFB'} !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #print-engine, #print-engine * { visibility: visible; }
          #print-engine { position: absolute; left: 0; top: 0; width: 210mm; display: block !important; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; box-sizing: border-box; overflow: hidden; padding: 25mm; }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-newsreader { font-family: 'Newsreader', serif; }
      `}</style>

      {/* === VIEW 1: THE COMMAND CENTER (UI) === */}
      <div className={`no-print max-w-lg mx-auto px-6 py-8 flex flex-col min-h-[100dvh] ${step === 'preview' ? 'hidden' : 'flex'}`}>
        
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/50 rounded flex items-center justify-center">
              <Cpu size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">Titanium Oracle</h1>
              <p className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Dynamic Block Engine v3.0</p>
            </div>
          </div>
        </header>

        <main className="grow flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP: INPUT */}
            {step === "input" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="relative">
                  <textarea 
                    value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the document architecture..."
                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:border-emerald-500 outline-none transition-all resize-none h-32"
                  />
                  <div className="absolute bottom-4 right-0">
                    <button onClick={handleGenerate} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><Send size={20} /></button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP: FORGING */}
            {step === "forging" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center grow">
                <Loader2 size={48} className="text-emerald-500 animate-spin mb-6" />
                <div className="font-mono text-[10px] text-emerald-400 space-y-2 text-center">
                  {logs.map((log, i) => <p key={i} className="opacity-80">{log}</p>)}
                </div>
              </motion.div>
            )}

            {/* STEP: EDITOR (BLOCK CANVAS) */}
            {step === "editor" && docData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-24">
                
                {/* Theme Selector */}
                <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/10 mb-6">
                  <button onClick={() => setActiveTheme("OBSIDIAN")} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded ${activeTheme === 'OBSIDIAN' ? 'bg-emerald-500 text-black' : 'text-slate-400'}`}>Obsidian</button>
                  <button onClick={() => setActiveTheme("ALABASTER")} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded ${activeTheme === 'ALABASTER' ? 'bg-[#C5A059] text-black' : 'text-slate-400'}`}>Alabaster</button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-emerald-500">Block Canvas</h2>
                  <button onClick={() => setStep("preview")} className="flex items-center gap-2 text-[10px] font-black uppercase bg-emerald-500 text-black px-4 py-2 rounded">
                    Render PDF <ChevronRight size={14} />
                  </button>
                </div>

                {/* Render Editable Blocks */}
                {docData.pages.map((page, pIdx) => (
                  <div key={pIdx} className="space-y-4">
                    <div className="flex items-center gap-4 my-8">
                      <div className="h-px bg-white/10 grow"></div>
                      <span className="font-mono text-[10px] text-slate-500">PAGE 0{page.page_number}</span>
                      <div className="h-px bg-white/10 grow"></div>
                    </div>
                    
                    {page.blocks.map((block, bIdx) => (
                      <div key={block.id} className="p-4 border border-white/10 bg-white/5 rounded-lg flex gap-4 items-start">
                        <div className="mt-1 text-slate-500">
                          {block.type === 'HEADER' && <Type size={16} />}
                          {block.type === 'PARAGRAPH' && <FileText size={16} />}
                          {block.type === 'BAR_CHART' && <BarChart3 size={16} />}
                          {block.type === 'TABLE' && <Table2 size={16} />}
                          {block.type === 'SEAL' && <Shield size={16} />}
                        </div>
                        <div className="grow">
                          <p className="text-[8px] font-black uppercase text-emerald-500/50 mb-2">{block.type}</p>
                          {block.type === 'PARAGRAPH' ? (
                            <p className="text-xs text-slate-300 line-clamp-2">{block.content}</p>
                          ) : block.type === 'BAR_CHART' || block.type === 'TABLE' ? (
                            <p className="text-xs font-bold text-white">{block.title}</p>
                          ) : (
                            <p className="text-sm font-bold text-white">{block.content || block.name}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* === VIEW 2: PREVIEW CONTROLS (Screen Only) === */}
      {step === "preview" && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          <button onClick={() => setStep("editor")} className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl border border-white/10">
            <ArrowLeft size={16} /> Edit
          </button>
          <button onClick={handlePrint} className={`flex items-center gap-2 ${t.bgAccent} ${activeTheme === 'OBSIDIAN' ? 'text-black' : 'text-white'} px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl`}>
            <Printer size={16} /> Print PDF
          </button>
        </div>
      )}

      {/* === VIEW 3: THE PRINT ENGINE (Dynamic Block Renderer) === */}
      <div id="print-engine" className={`hidden print:block ${t.bg}`}>
        {docData?.pages.map((page, i) => (
          <div key={i} className={`a4-page ${t.bg} flex flex-col`}>
            
            {/* Header */}
            <header className={`flex justify-between items-end border-b ${t.cardBorder} pb-4 mb-12`}>
              <span className={`font-mono text-[8px] font-bold uppercase tracking-[0.4em] ${t.accent}`}>{docData.meta.title}</span>
              <span className={`font-mono text-[10px] font-black ${t.text}`}>PAGE 0{page.page_number}</span>
            </header>

            {/* Dynamic Blocks */}
            <main className="grow flex flex-col gap-8">
              {page.blocks.map((block) => {
                
                // BLOCK: HEADER
                if (block.type === "HEADER") return (
                  <div key={block.id} className="mb-4">
                    <h2 className={`font-playfair text-5xl font-black ${t.text} uppercase tracking-tighter leading-none mb-4`}>{block.content}</h2>
                    {block.subtitle && <p className={`font-inter text-sm font-bold ${t.accent} uppercase tracking-[0.3em]`}>{block.subtitle}</p>}
                  </div>
                );

                // BLOCK: PARAGRAPH
                if (block.type === "PARAGRAPH") return (
                  <p key={block.id} className={`font-newsreader text-xl ${activeTheme === 'OBSIDIAN' ? 'text-slate-400' : 'text-slate-700'} leading-relaxed text-justify`}>
                    {block.content}
                  </p>
                );

                // BLOCK: BAR CHART (Pure CSS Math)
                if (block.type === "BAR_CHART") {
                  const maxVal = Math.max(...block.data.map(d => d.value));
                  return (
                    <div key={block.id} className={`my-8 p-8 ${t.cardBg} border ${t.cardBorder}`}>
                      <h3 className={`font-inter text-lg font-black ${t.text} uppercase tracking-widest mb-8`}>{block.title}</h3>
                      <div className="space-y-6">
                        {block.data.map((d, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-end mb-2">
                              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${activeTheme === 'OBSIDIAN' ? 'text-slate-400' : 'text-slate-500'}`}>{d.label}</span>
                              <span className={`font-mono text-lg font-black ${t.text}`}>{d.value}</span>
                            </div>
                            <div className={`w-full h-6 ${activeTheme === 'OBSIDIAN' ? 'bg-black' : 'bg-white'} border ${t.cardBorder} overflow-hidden`}>
                              <div className={`h-full ${t[d.color]}`} style={{ width: `${(d.value / maxVal) * 100}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // BLOCK: TABLE
                if (block.type === "TABLE") return (
                  <div key={block.id} className={`my-8 border ${t.cardBorder}`}>
                    <div className={`grid grid-cols-${block.headers.length} ${activeTheme === 'OBSIDIAN' ? 'bg-black' : 'bg-slate-100'} p-4 border-b ${t.cardBorder}`}>
                      {block.headers.map((h, idx) => (
                        <div key={idx} className={`font-inter text-[8px] font-black uppercase tracking-widest ${t.accent}`}>{h}</div>
                      ))}
                    </div>
                    {block.rows.map((row, rIdx) => (
                      <div key={rIdx} className={`grid grid-cols-${block.headers.length} p-6 border-b ${t.cardBorder} ${t.cardBg} items-center`}>
                        {row.map((cell, cIdx) => (
                          <div key={cIdx} className={`font-newsreader text-sm ${cIdx === 0 ? `font-bold ${t.text} font-inter uppercase text-[10px] tracking-widest` : activeTheme === 'OBSIDIAN' ? 'text-slate-400' : 'text-slate-600'}`}>{cell}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                );

                // BLOCK: SEAL
                if (block.type === "SEAL") return (
                  <div key={block.id} className="mt-auto pt-12 flex flex-col items-center text-center">
                    <div className={`w-24 h-24 bg-white p-2 mb-6 border-4 ${t.border}`}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/oracle`} className="w-full h-full" />
                    </div>
                    <div className={`border-4 ${t.border} ${t.accent} font-inter font-black text-3xl tracking-[0.4em] px-8 py-3 mb-12 transform -rotate-6 opacity-90`}>
                      APPROVED
                    </div>
                    <div className={`w-48 border-b-2 ${t.border} mb-4`}></div>
                    <h2 className={`font-playfair text-2xl font-black ${t.text} uppercase tracking-[0.2em]`}>{block.name}</h2>
                    <p className={`font-inter text-[8px] font-bold ${t.accent} tracking-[0.4em] uppercase mt-2`}>{block.role}</p>
                    <p className="font-mono text-[6px] text-slate-500 uppercase tracking-widest mt-6">Hash: {cryptoHash}</p>
                  </div>
                );

                return null;
              })}
            </main>
          </div>
        ))}
      </div>
    </div>
  );
}
