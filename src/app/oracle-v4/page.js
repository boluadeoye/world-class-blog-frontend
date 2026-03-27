"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Send, Terminal, ChevronRight, 
  Database, Box, Image as ImageIcon, Type,
  Loader2, ArrowLeft, Printer, Hexagon
} from "lucide-react";

export default function RelationalGeometryEngine() {
  const[view, setView] = useState("COMMAND");
  const [prompt, setPrompt] = useState("");
  const[isGenerating, setIsGenerating] = useState(false);
  const [graph, setGraph] = useState(null);
  const [logs, setLogs] = useState([]);
  const [cryptoHash, setCryptoHash] = useState("");

  const addLog = (msg) => setLogs(prev =>[...prev.slice(-4), `[SYS]: ${msg}`]);

  useEffect(() => {
    const generateHash = async () => {
      const data = `ORACLE_V4_PROCEDURAL_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      setCryptoHash(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
    };
    generateHash();
  },[]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    addLog("COMPILING RELATIONAL GRAPH...");
    
    setTimeout(() => {
      addLog("INJECTING PROCEDURAL ASSETS...");
      setGraph({
        doc_identity: { title: "Procedural Architecture", protocol: "OBSIDIAN" },
        elements:[
          // PAGE 1: PROCEDURAL HUD & TYPOGRAPHY
          {
            id: "bg_base", type: "SHAPE", content: "",
            style: { color: "#050505" },
            geometry: { page: 1, margin_top_mm: 0, margin_left_mm: 0, width_pct: 100, height_mm: 297, z_index: 0 }
          },
          {
            id: "procedural_hud", type: "PROCEDURAL", content: "RADAR_HUD",
            style: { color: "#10B981" },
            geometry: { page: 1, margin_top_mm: 20, margin_left_mm: 20, width_pct: 80, height_mm: 150, z_index: 1 }
          },
          {
            id: "hero_title", type: "TEXT", content: "SYSTEM\nORACLE",
            style: { font: "Playfair Display", size_pt: 85, color: "#FFFFFF", tracking: -2, leading: 0.85 },
            geometry: { page: 1, margin_top_mm: 180, margin_left_mm: 20, width_pct: 80, height_mm: "auto", z_index: 10 }
          },
          {
            id: "hero_sub", type: "TEXT", content: "Procedural Asset Generation Pipeline.",
            style: { font: "JetBrains Mono", size_pt: 10, color: "#10B981", tracking: 4, leading: 1.5, uppercase: true },
            geometry: { page: 1, margin_top_mm: 220, margin_left_mm: 20, width_pct: 80, height_mm: "auto", z_index: 10 }
          },
          
          // PAGE 2: PROCEDURAL 3D GOLD CROWN & EDITORIAL
          {
            id: "bg_base_2", type: "SHAPE", content: "",
            style: { color: "#FDFCFB" },
            geometry: { page: 2, margin_top_mm: 0, margin_left_mm: 0, width_pct: 100, height_mm: 297, z_index: 0 }
          },
          {
            id: "procedural_crown", type: "PROCEDURAL", content: "GOLDEN_CROWN",
            style: { color: "url(#goldFoil)" },
            geometry: { page: 2, margin_top_mm: 40, margin_left_mm: 65, width_pct: 40, height_mm: 80, z_index: 5 }
          },
          {
            id: "page2_title", type: "TEXT", content: "The Authority",
            style: { font: "Playfair Display", size_pt: 45, color: "#0A0A0A", tracking: 0, leading: 1 },
            geometry: { page: 2, margin_top_mm: 140, margin_left_mm: 20, width_pct: 80, height_mm: "auto", z_index: 10 }
          },
          {
            id: "page2_text", type: "TEXT", content: "By generating assets procedurally via SVG mathematics, we eliminate external dependencies. The crown above is not an image; it is a mathematical construct rendered at the exact moment of compilation, ensuring infinite resolution and zero latency.",
            style: { font: "Newsreader", size_pt: 16, color: "#475569", tracking: 0, leading: 1.8, italic: true },
            geometry: { page: 2, margin_top_mm: 160, margin_left_mm: 20, width_pct: 80, height_mm: "auto", z_index: 10 }
          },
          {
            id: "hash_display", type: "TEXT", content: `HASH: ${cryptoHash}`,
            style: { font: "JetBrains Mono", size_pt: 6, color: "#94A3B8", tracking: 2, leading: 1 },
            geometry: { page: 2, margin_top_mm: 270, margin_left_mm: 20, width_pct: 80, height_mm: "auto", z_index: 10 }
          }
        ]
      });
      setView("NODES");
      setIsGenerating(false);
    }, 1500);
  };

  const handlePrint = () => {
    document.title = `${graph?.doc_identity?.title.replace(/\s+/g, '_')}_PROCEDURAL`;
    window.print();
  };

  const updateGeometry = (id, field, value) => {
    setGraph(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, geometry: { ...el.geometry, [field]: value } } : el)
    }));
  };

  // PROCEDURAL RENDERER COMPONENT
  const ProceduralAsset = ({ type, color }) => {
    if (type === "RADAR_HUD") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
          <line x1="100" y1="0" x2="100" y2="200" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <line x1="0" y1="100" x2="200" y2="100" stroke={color} strokeWidth="0.5" opacity="0.5" />
          <path d="M100,100 L160,40" stroke={color} strokeWidth="1" opacity="0.8" />
          <circle cx="160" cy="40" r="3" fill={color} />
          <text x="165" y="38" fill={color} fontSize="6" fontFamily="monospace" opacity="0.8">OBJ_DETECTED</text>
          <text x="10" y="15" fill={color} fontSize="6" fontFamily="monospace" opacity="0.5">SYS.OP: NOMINAL</text>
          <text x="10" y="25" fill={color} fontSize="6" fontFamily="monospace" opacity="0.5">LAT: 6.5244</text>
        </svg>
      );
    }
    if (type === "GOLDEN_CROWN") {
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 15px 20px rgba(212,175,55,0.2))" }}>
          <path d="M10,80 L20,30 L40,60 L50,15 L60,60 L80,30 L90,80 Z" fill={color} stroke="#8B6508" strokeWidth="0.5" />
          <polygon points="10,80 90,80 85,90 15,90" fill="#8B6508" />
          <polygon points="40,60 50,15 60,60 50,65" fill="#FCF6BA" opacity="0.4" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-slate-300 font-sans selection:bg-[#AF9164]/30 overflow-x-hidden">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      {/* GLOBAL SVG DEFINITIONS (Gradients & Filters) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #canvas-engine, #canvas-engine * { visibility: visible; }
          #canvas-engine { position: absolute; left: 0; top: 0; width: 210mm; display: block !important; }
          .a4-canvas { height: 297mm; width: 210mm; page-break-after: always; position: relative; box-sizing: border-box; overflow: hidden; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* === STATE: COMMAND CENTER === */}
      {view === "COMMAND" && (
        <div className="max-w-lg mx-auto px-6 py-12 flex flex-col min-h-[100dvh]">
          <header className="flex items-center gap-4 mb-16 border-b border-white/10 pb-6">
            <Cpu size={24} className="text-[#AF9164]" />
            <div>
              <h1 className="text-lg font-black uppercase tracking-[0.3em] text-white">RGE Compiler</h1>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Procedural Asset Pipeline v4.1</p>
            </div>
          </header>

          <main className="grow flex flex-col justify-center">
            <div className="bg-[#0A0A0A] border border-white/5 p-6 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AF9164] to-transparent"></div>
              <label className="font-mono text-[10px] text-[#AF9164] uppercase tracking-widest mb-4 block">System Intent</label>
              <textarea 
                value={prompt} onChange={(e) => setPrompt(e.target.value)}
                placeholder="Define architectural parameters..."
                className="w-full bg-transparent border-b border-white/10 py-2 text-sm font-mono focus:border-[#AF9164] outline-none resize-none h-32 text-white"
                disabled={isGenerating}
              />
              <div className="mt-6 flex justify-end">
                <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-2 bg-white text-black px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-[#AF9164] transition-colors disabled:opacity-50">
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  Execute
                </button>
              </div>
            </div>
            <div className="mt-12 font-mono text-[9px] text-slate-500 space-y-2">
              {logs.map((log, i) => <p key={i}>{log}</p>)}
            </div>
          </main>
        </div>
      )}

      {/* === STATE: NODE INSPECTOR === */}
      {view === "NODES" && graph && (
        <div className="max-w-lg mx-auto px-6 py-8 flex flex-col min-h-[100dvh]">
          <header className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Database size={16} className="text-[#AF9164]" />
              <h1 className="text-xs font-black uppercase tracking-[0.2em] text-white">Node Inspector</h1>
            </div>
            <button onClick={() => setView("CANVAS")} className="flex items-center gap-2 bg-[#AF9164] text-black px-4 py-2 font-black text-[10px] uppercase tracking-widest">
              Render Canvas <ChevronRight size={12} />
            </button>
          </header>

          <main className="grow overflow-y-auto space-y-4 pb-24">
            {graph.elements.map((el) => (
              <div key={el.id} className="bg-[#0A0A0A] border border-white/5 p-4 relative">
                <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-2">
                  {el.type === 'TEXT' && <Type size={12} className="text-slate-400" />}
                  {el.type === 'PROCEDURAL' && <Hexagon size={12} className="text-[#AF9164]" />}
                  {el.type === 'SHAPE' && <Box size={12} className="text-slate-400" />}
                  <span className="font-mono text-[10px] font-bold text-white">{el.id}</span>
                  <span className="font-mono text-[8px] text-[#AF9164] ml-auto border border-[#AF9164]/30 px-1">PG:{el.geometry.page}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[8px] text-slate-500 uppercase block mb-1">Y-Axis (mm)</label>
                    <input type="number" value={el.geometry.margin_top_mm} onChange={(e) => updateGeometry(el.id, 'margin_top_mm', Number(e.target.value))} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-[#AF9164]" />
                  </div>
                  <div>
                    <label className="font-mono text-[8px] text-slate-500 uppercase block mb-1">X-Axis (mm)</label>
                    <input type="number" value={el.geometry.margin_left_mm} onChange={(e) => updateGeometry(el.id, 'margin_left_mm', Number(e.target.value))} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-[#AF9164]" />
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}

      {/* === STATE: CANVAS PREVIEW === */}
      {view === "CANVAS" && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-50">
          <button onClick={() => setView("NODES")} className="flex items-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 font-bold text-[10px] uppercase tracking-widest border border-white/20 shadow-2xl">
            <ArrowLeft size={14} /> Inspect Nodes
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-[#AF9164] text-black px-6 py-3 font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(175,145,100,0.4)]">
            <Printer size={14} /> Execute Print
          </button>
        </div>
      )}

      {/* === VIEW 3: THE MILLIMETER SOLVER === */}
      <div id="canvas-engine" className={`${view === 'CANVAS' ? 'block' : 'hidden'} print:block bg-[#050505]`}>
        {[1, 2].map((pageNum) => (
          <div key={pageNum} className="a4-canvas">
            {graph?.elements.filter(el => el.geometry.page === pageNum).map((el) => {
              
              const styleObj = {
                position: "absolute",
                top: `${el.geometry.margin_top_mm}mm`,
                left: `${el.geometry.margin_left_mm}mm`,
                width: el.geometry.width_pct ? `${el.geometry.width_pct}%` : "auto",
                height: el.geometry.height_mm ? (typeof el.geometry.height_mm === 'number' ? `${el.geometry.height_mm}mm` : el.geometry.height_mm) : "auto",
                zIndex: el.geometry.z_index,
                mixBlendMode: el.geometry.overlap_mode || "normal",
              };

              if (el.type === "TEXT") {
                styleObj.fontFamily = el.style.font === "Playfair Display" ? "'Playfair Display', serif" : el.style.font === "Newsreader" ? "'Newsreader', serif" : el.style.font === "JetBrains Mono" ? "'JetBrains Mono', monospace" : "'Inter', sans-serif";
                styleObj.fontSize = `${el.style.size_pt}pt`;
                styleObj.color = el.style.color;
                styleObj.letterSpacing = `${el.style.tracking}px`;
                styleObj.lineHeight = el.style.leading;
                styleObj.textTransform = el.style.uppercase ? "uppercase" : "none";
                styleObj.fontWeight = el.style.weight || 400;
                styleObj.fontStyle = el.style.italic ? "italic" : "normal";
                styleObj.whiteSpace = "pre-wrap";
              }

              if (el.type === "SHAPE") {
                styleObj.backgroundColor = el.style.color;
              }

              if (el.type === "PROCEDURAL") {
                return (
                  <div key={el.id} style={styleObj}>
                    <ProceduralAsset type={el.content} color={el.style.color} />
                  </div>
                );
              }

              if (el.type === "TEXT") {
                return <div key={el.id} style={styleObj}>{el.content}</div>;
              }

              if (el.type === "SHAPE") {
                return <div key={el.id} style={styleObj}></div>;
              }

              return null;
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
