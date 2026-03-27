"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Send, Terminal, ChevronRight, 
  FileText, Shield, Loader2, Printer, ArrowLeft,
  QrCode, CheckCircle2, Hexagon
} from "lucide-react";

export default function TitaniumOracle() {
  const [step, setStep] = useState("input"); // input, forging, editor, preview
  const [prompt, setPrompt] = useState("");
  const [docData, setDocData] = useState(null);
  const [logs, setLogs] = useState([]);
  const[cryptoHash, setCryptoHash] = useState("");

  const addLog = (msg) => setLogs(prev =>[...prev.slice(-4), `> ${msg}`]);

  useEffect(() => {
    const generateHash = async () => {
      const data = `ORACLE_DOC_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      setCryptoHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    };
    generateHash();
  },[]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setStep("forging");
    addLog("INITIALIZING NEURAL LINK...");
    
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        body: JSON.stringify({ prompt, docType: "STRATEGIC_DOCUMENT", theme: "DYNAMIC" }),
      });
      
      const result = await res.json();
      if (result.success) {
        setDocData(result.data);
        addLog("SCHEMA COMPILED SUCCESSFULLY.");
        setTimeout(() => setStep("editor"), 1000);
      } else {
        throw new Error("API Failed");
      }
    } catch (err) {
      // FALLBACK MOCK DATA FOR TESTING IF API FAILS OR KEYS ARE MISSING
      addLog("API ERROR. LOADING FALLBACK SCHEMA...");
      setTimeout(() => {
        setDocData({
          document_meta: { title: "Sovereign Architecture", theme: "OBSIDIAN_EMERALD", version: "2026.1" },
          pages:[
            {
              page_number: 1, layout: "HERO_COVER",
              blocks:[
                { type: "TITLE", content: "The Reality Oracle" },
                { type: "SUBTITLE", content: "A deterministic cryptographic blueprint." },
                { type: "IMAGE_URL", content: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774358327/blog_assets/dp93jwtbmt04u0kdr3hb.png" }
              ]
            },
            {
              page_number: 2, layout: "EDITORIAL_GRID",
              blocks:[
                { type: "SECTION_HEADER", content: "The Architecture" },
                { type: "PARAGRAPH", content: "We replace probabilistic AI vision with a multi-plane evidence chain, ensuring mathematical finality in data verification." },
                { type: "KILL_SHOT_METRIC", label: "End-to-End Latency", value: "180ms" }
              ]
            },
            {
              page_number: 3, layout: "FINAL_SEAL",
              blocks:[
                { type: "SIGNATURE_NAME", content: "Bolu Adeoye" },
                { type: "SIGNATURE_TITLE", content: "Lead Systems Architect" }
              ]
            }
          ]
        });
        setStep("editor");
      }, 1500);
    }
  };

  const handleBlockChange = (pageIndex, blockIndex, newValue) => {
    const newData = { ...docData };
    newData.pages[pageIndex].blocks[blockIndex].content = newValue;
    setDocData(newData);
  };

  const handlePrint = () => {
    document.title = `${docData?.document_meta?.title.replace(/\s+/g, '_')}_2026`;
    window.print();
  };

  // Theme Variables
  const isObsidian = docData?.document_meta?.theme === "OBSIDIAN_EMERALD";
  const bgClass = isObsidian ? "bg-[#050505]" : "bg-[#FDFCFB]";
  const textClass = isObsidian ? "text-white" : "text-[#0A0A0A]";
  const accentClass = isObsidian ? "text-[#10B981]" : "text-[#AF9164]";
  const borderClass = isObsidian ? "border-[#10B981]" : "border-[#AF9164]";
  const bgAccentClass = isObsidian ? "bg-[#10B981]" : "bg-[#AF9164]";

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: ${isObsidian ? '#050505' : '#FDFCFB'} !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #print-engine, #print-engine * { visibility: visible; }
          #print-engine { position: absolute; left: 0; top: 0; width: 210mm; display: block !important; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; box-sizing: border-box; overflow: hidden; }
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
              <p className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest">Sovereign Engine v2.0</p>
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

            {/* STEP: EDITOR */}
            {step === "editor" && docData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-black uppercase tracking-widest text-emerald-500">Skeleton Forge</h2>
                  <button onClick={() => setStep("preview")} className="flex items-center gap-2 text-[10px] font-black uppercase bg-emerald-500 text-black px-4 py-2 rounded">
                    Preview Render <ChevronRight size={14} />
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
                        {block.type === 'PARAGRAPH' ? (
                          <textarea 
                            value={block.content || block.value || ""}
                            onChange={(e) => handleBlockChange(pIdx, bIdx, e.target.value)}
                            className="w-full bg-transparent border-b border-white/5 py-1 text-sm focus:border-emerald-500 outline-none h-20 resize-none"
                          />
                        ) : (
                          <input 
                            type="text"
                            value={block.content || block.value || ""}
                            onChange={(e) => handleBlockChange(pIdx, bIdx, e.target.value)}
                            className="w-full bg-transparent border-b border-white/5 py-1 text-sm focus:border-emerald-500 outline-none"
                          />
                        )}
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
          <button onClick={handlePrint} className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Printer size={16} /> Print PDF
          </button>
        </div>
      )}

      {/* === VIEW 3: THE PRINT ENGINE (A4 Millimeter Grid) === */}
      <div id="print-engine" className={`${step === 'preview' ? 'block' : 'hidden'} print:block ${bgClass}`}>
        {docData?.pages.map((page, i) => {
          
          // Extract blocks for easy access
          const getBlock = (type) => page.blocks.find(b => b.type === type)?.content || "";
          const getMetric = () => page.blocks.find(b => b.type === "KILL_SHOT_METRIC");

          return (
            <div key={i} className={`a4-page ${bgClass} ${textClass}`}>
              
              {/* LAYOUT 1: HERO COVER */}
              {page.layout === "HERO_COVER" && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[160mm] overflow-hidden bg-black">
                    {getBlock("IMAGE_URL") && (
                      <img src={getBlock("IMAGE_URL")} className={`w-full h-full object-cover ${isObsidian ? 'opacity-80' : 'grayscale contrast-125'}`} />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${isObsidian ? 'from-[#050505]' : 'from-[#FDFCFB]'} via-transparent to-transparent`}></div>
                  </div>
                  
                  <div className="absolute top-[150mm] left-0 w-full h-[147mm] p-[20mm] flex flex-col justify-between">
                    <div>
                      <p className={`font-mono text-[10px] font-black ${accentClass} uppercase tracking-[0.4em] mb-4`}>Architectural Specification</p>
                      <h1 className={`font-playfair text-[65px] font-black ${textClass} uppercase tracking-tight leading-[0.9] mb-6`}>
                        {getBlock("TITLE").split(' ').map((word, idx) => <span key={idx}>{word}<br/></span>)}
                      </h1>
                      <div className={`h-[2px] w-24 ${bgAccentClass} mb-6`}></div>
                      <p className="font-newsreader text-2xl italic text-slate-500 leading-relaxed max-w-md">
                        {getBlock("SUBTITLE")}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className={`font-inter text-2xl font-black ${textClass} uppercase tracking-[0.2em]`}>Bolu Adeoye</h2>
                        <p className={`font-mono text-[8px] font-bold ${accentClass} uppercase tracking-[0.4em] mt-1`}>Lead Systems Architect</p>
                      </div>
                      <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">REF: {docData.document_meta.version}</div>
                    </div>
                  </div>
                </>
              )}

              {/* LAYOUT 2: EDITORIAL GRID */}
              {page.layout === "EDITORIAL_GRID" && (
                <>
                  <div className={`absolute top-[15mm] left-[20mm] w-[170mm] border-b-[0.5px] ${isObsidian ? 'border-white/20' : 'border-slate-300'} pb-4 flex justify-between items-end`}>
                    <span className={`font-mono text-[8px] font-bold uppercase tracking-[0.4em] ${accentClass}`}>Section 0{page.page_number - 1}</span>
                    <span className="font-mono text-[10px] font-black text-slate-500">PAGE 0{page.page_number}</span>
                  </div>

                  <div className="absolute top-[45mm] left-[20mm] w-[170mm]">
                    <h2 className={`font-playfair text-[42px] font-black ${textClass} uppercase tracking-wide mb-10`}>{getBlock("SECTION_HEADER")}</h2>
                    
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-7">
                        <p className="font-newsreader text-xl text-slate-500 leading-relaxed text-justify">
                          {getBlock("PARAGRAPH")}
                        </p>
                      </div>
                      
                      {getMetric() && (
                        <div className="col-span-5">
                          <div className={`p-8 border-[0.5px] ${isObsidian ? 'border-white/20 bg-white/5' : 'border-slate-300 bg-slate-50'}`}>
                            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">{getMetric().label}</p>
                            <p className={`font-inter text-4xl font-black ${accentClass}`}>{getMetric().value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* LAYOUT 3: FINAL SEAL */}
              {page.layout === "FINAL_SEAL" && (
                <>
                  <div className={`absolute top-[60mm] left-[75mm] w-[60mm] h-[60mm] bg-white p-[2mm] border-[0.5px] ${isObsidian ? 'border-white/20' : 'border-slate-300'}`}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://boluadeoye.com.ng/oracle`} className="w-full h-full" />
                  </div>
                  <div className="absolute top-[125mm] left-[55mm] w-[100mm] text-center">
                    <p className={`font-mono text-[8px] font-bold ${accentClass} uppercase tracking-[0.3em]`}>Scan to Verify Live Architecture</p>
                  </div>

                  <div className={`absolute top-[160mm] left-[45mm] w-[120mm] border-4 ${borderClass} ${accentClass} font-inter font-black text-4xl tracking-[0.3em] py-4 text-center transform -rotate-6 opacity-90`}>
                    APPROVED
                  </div>

                  <div className={`absolute top-[220mm] left-[20mm] w-[170mm] border-t-[0.5px] ${isObsidian ? 'border-white/20' : 'border-slate-300'} pt-[5mm] flex justify-between items-end`}>
                    <div>
                      <h2 className={`font-inter text-2xl font-black ${textClass} uppercase tracking-[0.2em]`}>{getBlock("SIGNATURE_NAME")}</h2>
                      <p className={`font-mono text-[8px] font-bold ${accentClass} uppercase tracking-[0.4em] mt-1`}>{getBlock("SIGNATURE_TITLE")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[6px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Hash</p>
                      <p className="font-mono text-[8px] text-slate-500 font-bold">{cryptoHash}</p>
                    </div>
                  </div>
                </>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
