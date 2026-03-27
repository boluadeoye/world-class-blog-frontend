"use client";
import { useState, useEffect } from "react";
import { 
  Cpu, Send, Terminal, Layers, 
  Printer, ArrowLeft, Settings2, 
  Database, Box, Image as ImageIcon, Type
} from "lucide-react";

export default function RelationalGeometryEngine() {
  const [view, setView] = useState("COMMAND"); // COMMAND, NODES, CANVAS
  const [prompt, setPrompt] = useState("");
  const[isGenerating, setIsGenerating] = useState(false);
  const [graph, setGraph] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => setLogs(prev => [...prev.slice(-4), `[SYS]: ${msg}`]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    addLog("COMPILING RELATIONAL GRAPH...");
    
    try {
      const res = await fetch("/api/oracle-v4", {
        method: "POST",
        body: JSON.stringify({ prompt, docType: "EXECUTIVE_SPEC" }),
      });
      
      const result = await res.json();
      if (result.success) {
        setGraph(result.graph);
        addLog("GRAPH RESOLVED. MAPPING COORDINATES...");
        setTimeout(() => setView("NODES"), 800);
      } else {
        throw new Error("API_FAULT");
      }
    } catch (err) {
      addLog("API_FAULT. INJECTING DETERMINISTIC FALLBACK GRAPH...");
      // FALLBACK GRAPH: Demonstrates overlapping, z-index, and absolute millimeter positioning
      setTimeout(() => {
        setGraph({
          doc_identity: { title: "The Matrix", protocol: "ALABASTER" },
          elements:[
            {
              id: "bg_image", type: "IMAGE",
              content: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png",
              style: { filter: "grayscale(100%) contrast(120%)" },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 0, margin_left_mm: 0, width_pct: 100, height_mm: 160, z_index: 0, overlap_mode: "normal" }
            },
            {
              id: "hero_title", type: "TEXT",
              content: "THE\nMATRIX",
              style: { font: "Playfair Display", size_pt: 85, color: "#0A0A0A", tracking: -2, leading: 0.85 },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 110, margin_left_mm: 15, width_pct: 80, height_mm: "auto", z_index: 10, overlap_mode: "multiply" }
            },
            {
              id: "accent_line", type: "SHAPE",
              content: "",
              style: { color: "#AF9164" },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 165, margin_left_mm: 15, width_pct: 30, height_mm: 1, z_index: 10, overlap_mode: "normal" }
            },
            {
              id: "subtitle", type: "TEXT",
              content: "A Strategic Blueprint for High-Ticket Closing and Psychological Authority.",
              style: { font: "Newsreader", size_pt: 18, color: "#475569", tracking: 0, leading: 1.6, italic: true },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 175, margin_left_mm: 15, width_pct: 60, height_mm: "auto", z_index: 10, overlap_mode: "normal" }
            },
            {
              id: "signature_name", type: "TEXT",
              content: "Bolu Adeoye",
              style: { font: "Inter", size_pt: 24, color: "#0A0A0A", tracking: 4, leading: 1, weight: 900 },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 260, margin_left_mm: 15, width_pct: 50, height_mm: "auto", z_index: 10, overlap_mode: "normal" }
            },
            {
              id: "signature_title", type: "TEXT",
              content: "LEAD SYSTEMS ARCHITECT",
              style: { font: "JetBrains Mono", size_pt: 8, color: "#AF9164", tracking: 6, leading: 1, weight: 700 },
              geometry: { anchor: "PAGE_EDGE", margin_top_mm: 272, margin_left_mm: 15, width_pct: 50, height_mm: "auto", z_index: 10, overlap_mode: "normal" }
            }
          ]
        });
        setView("NODES");
      }, 1000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    document.title = `${graph?.doc_identity?.title.replace(/\s+/g, '_')}_SPEC`;
    window.print();
  };

  const updateElement = (id, field, value) => {
    setGraph(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, [field]: value } : el)
    }));
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-slate-300 font-sans selection:bg-[#AF9164]/30 overflow-x-hidden">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: #FDFCFB !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #canvas-engine, #canvas-engine * { visibility: visible; }
          #canvas-engine { position: absolute; left: 0; top: 0; width: 210mm; display: block !important; }
          .a4-canvas { height: 297mm; width: 210mm; page-break-after: always; position: relative; background: #FDFCFB; box-sizing: border-box; overflow: hidden; }
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
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Relational Geometry Engine v4.0</p>
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
                  {el.type === 'IMAGE' && <ImageIcon size={12} className="text-slate-400" />}
                  {el.type === 'SHAPE' && <Box size={12} className="text-slate-400" />}
                  <span className="font-mono text-[10px] font-bold text-white">{el.id}</span>
                  <span className="font-mono text-[8px] text-[#AF9164] ml-auto border border-[#AF9164]/30 px-1">Z:{el.geometry.z_index}</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="font-mono text-[8px] text-slate-500 uppercase block mb-1">Content / URL</label>
                    {el.type === 'TEXT' ? (
                      <textarea value={el.content} onChange={(e) => updateElement(el.id, 'content', e.target.value)} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white h-16 resize-none outline-none focus:border-[#AF9164]" />
                    ) : (
                      <input type="text" value={el.content} onChange={(e) => updateElement(el.id, 'content', e.target.value)} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-[#AF9164]" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[8px] text-slate-500 uppercase block mb-1">Y-Axis (mm)</label>
                      <input type="number" value={el.geometry.margin_top_mm} onChange={(e) => {
                        const newGeo = { ...el.geometry, margin_top_mm: Number(e.target.value) };
                        updateElement(el.id, 'geometry', newGeo);
                      }} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-[#AF9164]" />
                    </div>
                    <div>
                      <label className="font-mono text-[8px] text-slate-500 uppercase block mb-1">X-Axis (mm)</label>
                      <input type="number" value={el.geometry.margin_left_mm} onChange={(e) => {
                        const newGeo = { ...el.geometry, margin_left_mm: Number(e.target.value) };
                        updateElement(el.id, 'geometry', newGeo);
                      }} className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-[#AF9164]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}

      {/* === STATE: CANVAS PREVIEW (Screen Controls) === */}
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

      {/* === VIEW 3: THE MILLIMETER SOLVER (Print & Canvas) === */}
      <div id="canvas-engine" className={`${view === 'CANVAS' ? 'block' : 'hidden'} print:block bg-[#FDFCFB]`}>
        <div className="a4-page">
          {graph?.elements.map((el) => {
            
            // MATHEMATICAL SOLVER: Translates JSON Geometry to Absolute CSS
            const styleObj = {
              position: "absolute",
              top: `${el.geometry.margin_top_mm}mm`,
              left: `${el.geometry.margin_left_mm}mm`,
              width: el.geometry.width_pct ? `${el.geometry.width_pct}%` : "auto",
              height: el.geometry.height_mm ? `${el.geometry.height_mm}mm` : "auto",
              zIndex: el.geometry.z_index,
              mixBlendMode: el.geometry.overlap_mode || "normal",
            };

            // TYPOGRAPHY SOLVER
            if (el.type === "TEXT") {
              styleObj.fontFamily = el.style.font === "Playfair Display" ? "'Playfair Display', serif" : el.style.font === "Newsreader" ? "'Newsreader', serif" : el.style.font === "JetBrains Mono" ? "'JetBrains Mono', monospace" : "'Inter', sans-serif";
              styleObj.fontSize = `${el.style.size_pt}pt`;
              styleObj.color = el.style.color;
              styleObj.letterSpacing = `${el.style.tracking}px`;
              styleObj.lineHeight = el.style.leading;
              styleObj.fontWeight = el.style.weight || 400;
              styleObj.fontStyle = el.style.italic ? "italic" : "normal";
              styleObj.whiteSpace = "pre-wrap";
            }

            // SHAPE SOLVER
            if (el.type === "SHAPE") {
              styleObj.backgroundColor = el.style.color;
            }

            // RENDERER
            if (el.type === "IMAGE") {
              return (
                <div key={el.id} style={styleObj} className="overflow-hidden">
                  <img src={el.content} className="w-full h-full object-cover" style={{ filter: el.style.filter }} />
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
      </div>

    </div>
  );
}
