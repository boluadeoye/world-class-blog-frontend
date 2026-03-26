"use client";
import { useState, useEffect } from "react";
import { Eye, Grid, ShieldCheck, CheckCircle2, BrainCircuit, Activity } from "lucide-react";

export default function CognitiveArchitecture() {
  const [isReady, setIsReady] = useState(false);
  const [cryptoHash, setCryptoHash] = useState("");

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
    const generateHash = async () => {
      const data = `COG_ARCH_FINAL_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setCryptoHash(hashHex);
    };
    generateHash();
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "COGNITIVE_ARCHITECTURE_MASTER_SPEC";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#0A0A0A] selection:bg-[#991B1B]/30">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;700;900&family=Newsreader:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FDFCFB !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #FDFCFB; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FDFCFB; box-sizing: border-box; overflow: hidden; }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A]">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-t-8 border-[#991B1B]">
          <BrainCircuit size={48} className="text-[#0A0A0A] mx-auto mb-6" />
          <h1 className="font-inter text-3xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tighter">Cognitive Arch</h1>
          <p className="font-mono text-[#991B1B] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">First-Class Specification</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#991B1B]">HARDCODING ASSETS...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#0A0A0A] text-white font-inter font-black uppercase tracking-widest transition-all hover:bg-[#991B1B]">Extract Master Spec</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page">
          <div className="absolute top-0 left-0 w-full h-[170mm] overflow-hidden">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774360591/blog_assets/zbszehgkonozbe6jqkpm.png" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute top-[160mm] left-[25mm] z-10">
            <p className="font-mono text-[10px] font-black text-[#991B1B] uppercase tracking-[0.5em] mb-6">Behavioral Design Specification</p>
            <h1 className="font-playfair text-[75px] font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.85] mb-8">
              Cognitive<br/>Architecture
            </h1>
            <div className="h-[1px] w-32 bg-[#991B1B] mb-8"></div>
            <p className="font-newsreader text-2xl italic text-slate-600 leading-relaxed max-w-md">
              The science of visual authority. Engineering high-status perception and frictionless data processing.
            </p>
          </div>

          <div className="absolute bottom-[20mm] left-[25mm] flex items-end gap-6">
            <div className="h-24 w-[2px] bg-[#991B1B]"></div>
            <div>
              <h2 className="font-inter text-2xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE EYE-TRACKING AUDIT (HEATMAP) */}
        <div className="a4-page">
          {/* Vertical Anchor Line */}
          <div className="absolute top-0 left-[15mm] w-[0.5px] h-full bg-slate-200"></div>
          
          {/* Header */}
          <div className="absolute top-[15mm] left-[25mm] w-[165mm] flex justify-between items-end border-b border-slate-200 pb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#991B1B]">01 // The Problem</span>
            <span className="font-mono text-[10px] font-black text-slate-400">PAGE 02</span>
          </div>

          {/* IMAGE: HEATMAP (HARDCODED) */}
          <div className="absolute top-[40mm] left-[25mm] w-[165mm] h-[110mm] border-[0.5px] border-black overflow-hidden bg-black">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774541523/blog_assets/qeqdz5z8hjekyi6ou5ht.png" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-[160mm] left-[25mm] w-[165mm]">
            <h2 className="font-playfair text-[48px] font-black text-[#0A0A0A] uppercase tracking-wide mb-6">The Eye-Tracking Audit</h2>
            <p className="font-newsreader text-2xl italic text-slate-500 mb-12 border-l-4 border-[#991B1B] pl-8 py-2">"Visual noise kills trust in under 2.4 seconds."</p>
            
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="font-inter text-[11px] font-black uppercase tracking-[0.3em] mb-4 text-[#991B1B] flex items-center gap-2"><Eye size={14}/> Cognitive Load</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed text-justify">
                  Most documents fail because they overwhelm the brain with "Wall of Text" syndrome. When a recruiter opens a standard PDF, their eyes dart chaotically. If they don't find an anchor instantly, cognitive fatigue sets in.
                </p>
              </div>
              <div>
                <h3 className="font-inter text-[11px] font-black uppercase tracking-[0.3em] mb-4 text-[#0A0A0A] flex items-center gap-2"><Activity size={14}/> F-Pattern Hijack</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed text-justify">
                  Humans scan digital documents in an "F" shape. We engineer a surgical layout that forces the reader's eye to hit the "Kill-Shot" metrics exactly where the horizontal bars of the "F" occur.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3: THE SWISS GRID (GRID BLUEPRINT) */}
        <div className="a4-page">
          {/* Vertical Anchor Line */}
          <div className="absolute top-0 left-[15mm] w-[0.5px] h-full bg-slate-200"></div>

          <div className="absolute top-[15mm] left-[25mm] w-[165mm] flex justify-between items-end border-b border-slate-200 pb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#991B1B]">02 // The Solution</span>
            <span className="font-mono text-[10px] font-black text-slate-400">PAGE 03</span>
          </div>

          {/* IMAGE: GRID BLUEPRINT (HARDCODED) */}
          <div className="absolute top-[40mm] left-[25mm] w-[165mm] h-[110mm] border-[0.5px] border-black overflow-hidden bg-[#0A0A0A]">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774541506/blog_assets/wdtuayasmjozanpi2aai.png" className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-[160mm] left-[25mm] w-[165mm]">
            <h2 className="font-playfair text-[48px] font-black text-[#0A0A0A] uppercase tracking-wide mb-8">Swiss Grid Geometry</h2>
            
            <div className="bg-slate-50 border-[0.5px] border-slate-200 p-10 mb-12">
              <p className="font-newsreader text-xl text-slate-800 leading-relaxed italic text-center">
                We do not use whitespace because it is "pretty." We use it as a <strong className="text-[#991B1B] font-black not-italic">silencer</strong>. By leaving massive negative space, we create a visual vacuum where the data becomes the loudest thing in the room.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="border-t border-black pt-4">
                <Grid size={20} className="text-[#991B1B] mb-4" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2">12-Column System</h4>
                <p className="font-newsreader text-sm text-slate-500">Mathematical alignment of all elements.</p>
              </div>
              <div className="border-t border-black pt-4">
                <ShieldCheck size={20} className="text-black mb-4" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2">Asymmetry</h4>
                <p className="font-newsreader text-sm text-slate-500">Dynamic tension and modern editorial feel.</p>
              </div>
              <div className="border-t border-black pt-4">
                <CheckCircle2 size={20} className="text-slate-400 mb-4" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2">Absolute Lock</h4>
                <p className="font-newsreader text-sm text-slate-500">100% print-safe rendering across devices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4: TYPOGRAPHIC ANCHORING */}
        <div className="a4-page">
          <div className="absolute top-0 left-[15mm] w-[0.5px] h-full bg-slate-200"></div>
          <div className="absolute top-[15mm] left-[25mm] w-[165mm] flex justify-between items-end border-b border-slate-200 pb-4">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#991B1B]">03 // The Authority</span>
            <span className="font-mono text-[10px] font-black text-slate-400">PAGE 04</span>
          </div>

          <div className="absolute top-[45mm] left-[25mm] w-[165mm]">
            <h2 className="font-playfair text-[48px] font-black text-[#0A0A0A] uppercase tracking-wide mb-6">Typographic Anchoring</h2>
            <p className="font-newsreader text-2xl italic text-slate-500 mb-20">"Fonts do not just display words; they dictate status."</p>
            
            <div className="space-y-16">
              <div className="flex gap-12 items-center">
                <div className="w-40 h-40 bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 border border-black shadow-2xl">
                  <span className="font-playfair text-[100px] font-black">Aa</span>
                </div>
                <div>
                  <h3 className="font-inter text-xl font-black uppercase tracking-widest mb-2 text-[#0A0A0A]">Playfair Display</h3>
                  <p className="font-mono text-[11px] text-[#991B1B] uppercase tracking-[0.3em] mb-4 font-bold">The Voice of Luxury & Status</p>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Used for massive, high-contrast headers. The sharp serifs trigger a subconscious association with high-end editorial magazines and elite consulting firms.</p>
                </div>
              </div>

              <div className="flex gap-12 items-center">
                <div className="w-40 h-40 bg-white border border-slate-300 text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-sm">
                  <span className="font-mono text-[80px] font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-inter text-xl font-black uppercase tracking-widest mb-2 text-[#0A0A0A]">JetBrains Mono</h3>
                  <p className="font-mono text-[11px] text-[#991B1B] uppercase tracking-[0.3em] mb-4 font-bold">The Voice of Technical Truth</p>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Used for data points and metrics. Monospace fonts are associated with raw data, making numbers feel mathematically verified and undeniable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 5: THE FINAL SEAL */}
        <div className="a4-page">
          <div className="absolute top-[60mm] left-[75mm] w-[60mm] h-[60mm] bg-white p-[2mm] border border-slate-200 shadow-2xl">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://boluadeoye.com.ng/portfolio/cognitive-arch`} className="w-full h-full" />
          </div>
          <div className="absolute top-[125mm] left-[55mm] w-[100mm] text-center">
            <p className="font-mono text-[9px] font-bold text-[#991B1B] uppercase tracking-[0.3em]">Scan to Verify Live Architecture</p>
          </div>

          <div className="absolute top-[160mm] left-[45mm] w-[120mm] border-[6px] border-[#0A0A0A] text-[#0A0A0A] font-inter font-black text-[50px] tracking-[0.4em] py-6 text-center transform -rotate-6 opacity-90">
            APPROVED
          </div>

          <div className="absolute top-[230mm] left-[25mm] w-[160mm] border-t border-black pt-6 flex justify-between items-end">
            <div>
              <h2 className="font-inter text-3xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-mono text-[10px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[7px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Hash</p>
              <p className="font-mono text-[9px] text-slate-800 font-bold">{cryptoHash}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
