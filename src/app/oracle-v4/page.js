"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Send, Terminal, Layers, Loader2, ArrowLeft, Printer, Hexagon, Shield, Zap } from "lucide-react";

export default function RelationalGeometryEngine() {
  const [view, setView] = useState("COMMAND");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [graph, setGraph] = useState(null);
  const [cryptoHash, setCryptoHash] = useState("");

  useEffect(() => {
    const generateHash = async () => {
      const data = `ORACLE_V5_ELITE_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      setCryptoHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32));
    };
    generateHash();
  }, []);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // SIMULATING THE "ART DIRECTOR" AI OUTPUT
    setTimeout(() => {
      setGraph({
        doc_identity: { title: "Sovereign Spec", protocol: "MONOLITH" },
        elements: [
          // PAGE 1: THE BRUTALIST COVER
          { id: "bg_1", type: "SHAPE", style: { color: "#050505" }, geometry: { page: 1, y: 0, x: 0, w: 100, h: 297, z: 0 } },
          { id: "grid_1", type: "PROCEDURAL", content: "TECH_GRID", style: { color: "#10B981" }, geometry: { page: 1, y: 0, x: 0, w: 100, h: 297, z: 1 } },
          { id: "hero_img", type: "IMAGE", content: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774358327/blog_assets/dp93jwtbmt04u0kdr3hb.png", style: { filter: "contrast(150%) grayscale(1)" }, geometry: { page: 1, y: 0, x: 40, w: 60, h: 297, z: 2 } },
          { id: "big_title", type: "TEXT", content: "ORACLE", style: { font: "Inter", size: 180, color: "#FFFFFF", weight: 900, tracking: -15, leading: 0.8 }, geometry: { page: 1, y: 40, x: -10, w: 100, h: "auto", z: 10, blend: "difference" } },
          { id: "sub_title", type: "TEXT", content: "V5 // ARCHITECTURAL MASTER SPECIFICATION", style: { font: "JetBrains Mono", size: 10, color: "#10B981", tracking: 8, uppercase: true }, geometry: { page: 1, y: 180, x: 15, w: 80, h: "auto", z: 10 } },
          { id: "line_1", type: "SHAPE", style: { color: "#10B981" }, geometry: { page: 1, y: 195, x: 15, w: 20, h: 1, z: 10 } },
          
          // PAGE 2: THE DATA WATERFALL
          { id: "bg_2", type: "SHAPE", style: { color: "#FDFCFB" }, geometry: { page: 2, y: 0, x: 0, w: 100, h: 297, z: 0 } },
          { id: "grid_2", type: "PROCEDURAL", content: "BLUEPRINT_LINES", style: { color: "#E2E8F0" }, geometry: { page: 2, y: 0, x: 0, w: 100, h: 297, z: 1 } },
          { id: "p2_header", type: "TEXT", content: "01 // THE AUDIT", style: { font: "Playfair Display", size: 45, color: "#0A0A0A", weight: 900, tracking: -2 }, geometry: { page: 2, y: 20, x: 15, w: 80, h: "auto", z: 5 } },
          { id: "p2_metric_label", type: "TEXT", content: "COMPLEXITY_RATING", style: { font: "JetBrains Mono", size: 8, color: "#64748B", tracking: 4, uppercase: true }, geometry: { page: 2, y: 80, x: 15, w: 40, h: "auto", z: 5 } },
          { id: "p2_metric_value", type: "TEXT", content: "9.1/10", style: { font: "Inter", size: 80, color: "#0A0A0A", weight: 900, tracking: -5 }, geometry: { page: 2, y: 85, x: 12, w: 80, h: "auto", z: 5 } },
          { id: "p2_desc", type: "TEXT", content: "The system operates on a deterministic logic gate, ensuring that every data mutation is cryptographically bound to the physical ephemeris of the capture event.", style: { font: "Newsreader", size: 18, color: "#1E293B", italic: true, leading: 1.6 }, geometry: { page: 2, y: 180, x: 15, w: 70, h: "auto", z: 5 } },
          { id: "seal_box", type: "SHAPE", style: { color: "#0A0A0A" }, geometry: { page: 2, y: 240, x: 15, w: 70, h: 40, z: 2 } },
          { id: "seal_text", type: "TEXT", content: "APPROVED", style: { font: "Inter", size: 30, color: "#FFFFFF", weight: 900, tracking: 10 }, geometry: { page: 2, y: 252, x: 20, w: 60, h: "auto", z: 10 } }
        ]
      });
      setView("CANVAS");
      setIsGenerating(false);
    }, 1500);
  };

  const Procedural = ({ type, color }) => {
    if (type === "TECH_GRID") return (
      <svg width="100%" height="100%" className="opacity-20">
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    );
    if (type === "BLUEPRINT_LINES") return (
      <svg width="100%" height="100%" className="opacity-50">
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke={color} strokeWidth="0.5" />
        <line x1="85%" y1="0" x2="85%" y2="100%" stroke={color} strokeWidth="0.5" />
        <path d="M 0 20 L 100 20" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    );
    return null;
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-slate-400 font-sans overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@400;900&family=JetBrains+Mono:wght@400;700&family=Newsreader:ital,wght@1,400;1,500&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #canvas-engine, #canvas-engine * { visibility: visible; }
          #canvas-engine { position: absolute; left: 0; top: 0; width: 210mm; display: block !important; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; overflow: hidden; background: white; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* COMMAND CENTER */}
      <div className={`no-print max-w-lg mx-auto px-8 py-16 flex flex-col min-h-[100dvh] ${view === 'CANVAS' ? 'hidden' : 'flex'}`}>
        <header className="flex items-center gap-4 mb-20">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center rounded-full">
            <Cpu size={24} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-white font-black uppercase tracking-[0.4em] text-sm">Titanium Oracle</h1>
            <p className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest">Relational Geometry Engine v5.0</p>
          </div>
        </header>

        <div className="bg-[#0A0A0A] border border-white/5 p-8 shadow-2xl rounded-2xl">
          <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter System Intent..."
            className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:border-emerald-500 outline-none resize-none h-40 text-white"
          />
          <button onClick={handleGenerate} disabled={isGenerating} className="w-full mt-8 bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
            {isGenerating ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
            Compile Sovereign Spec
          </button>
        </div>
      </div>

      {/* CANVAS PREVIEW */}
      {view === "CANVAS" && (
        <div className="no-print fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          <button onClick={() => setView("COMMAND")} className="bg-black/80 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-white/10 shadow-2xl flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => window.print()} className="bg-emerald-500 text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2">
            <Printer size={16} /> Print PDF
          </button>
        </div>
      )}

      {/* THE ENGINE */}
      <div id="canvas-engine" className={`${view === 'CANVAS' ? 'block' : 'hidden'} print:block`}>
        {[1, 2].map(pageNum => (
          <div key={pageNum} className="a4-page">
            {graph?.elements.filter(el => el.geometry.page === pageNum).map(el => {
              const style = {
                position: "absolute",
                top: `${el.geometry.y}mm`,
                left: `${el.geometry.x}%`,
                width: `${el.geometry.w}%`,
                height: el.geometry.h === "auto" ? "auto" : `${el.geometry.h}mm`,
                zIndex: el.geometry.z,
                mixBlendMode: el.geometry.blend || "normal"
              };

              if (el.type === "TEXT") {
                return (
                  <div key={el.id} style={{
                    ...style,
                    fontFamily: el.style.font,
                    fontSize: `${el.style.size}pt`,
                    color: el.style.color,
                    fontWeight: el.style.weight || 400,
                    letterSpacing: `${el.style.tracking}px`,
                    lineHeight: el.style.leading || 1.2,
                    textTransform: el.style.uppercase ? "uppercase" : "none",
                    fontStyle: el.style.italic ? "italic" : "normal",
                    whiteSpace: "pre-wrap"
                  }}>{el.content}</div>
                );
              }

              if (el.type === "IMAGE") {
                return (
                  <div key={el.id} style={style}>
                    <img src={el.content} className="w-full h-full object-cover" style={{ filter: el.style.filter }} />
                  </div>
                );
              }

              if (el.type === "SHAPE") {
                return <div key={el.id} style={{ ...style, backgroundColor: el.style.color }}></div>;
              }

              if (el.type === "PROCEDURAL") {
                return <div key={el.id} style={style}><Procedural type={el.content} color={el.style.color} /></div>;
              }

              return null;
            })}
            
            {/* FOOTER HASH */}
            <div className="absolute bottom-[10mm] right-[15mm] font-mono text-[6px] text-slate-400 uppercase tracking-widest">
              VERIFIED_HASH: {cryptoHash} // PAGE 0{pageNum}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
