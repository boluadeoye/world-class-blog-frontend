"use client";
import { useState, useEffect } from "react";
import { 
  Download, Eye, Grid, ShieldCheck, 
  CheckCircle2, BrainCircuit, Activity 
} from "lucide-react";

export default function CognitiveArchitecture() {
  const [isReady, setIsReady] = useState(false);
  const[cryptoHash, setCryptoHash] = useState("");

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
    const generateHash = async () => {
      const data = `COGNITIVE_ARCH_${new Date().toISOString()}`;
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
    document.title = "COGNITIVE_ARCHITECTURE_SPEC_2026";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#0A0A0A] selection:bg-[#991B1B]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

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
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        
        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A]">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-t-8 border-[#991B1B]">
          <BrainCircuit size={48} className="text-[#0A0A0A] mx-auto mb-6" />
          <h1 className="font-inter text-3xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tighter">Cognitive Arch</h1>
          <p className="font-mono text-[#991B1B] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Behavioral Design Spec</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#991B1B]">COMPILING PSYCHOMETRICS...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#0A0A0A] text-white font-inter font-black uppercase tracking-widest transition-all hover:bg-[#991B1B]">Extract Blueprint</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE DOCUMENT (HARDCODED MILLIMETERS) === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page paper-grain">
          <div className="absolute top-0 left-0 w-full h-[160mm] overflow-hidden">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774360591/blog_assets/zbszehgkonozbe6jqkpm.png" alt="Foundation" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute top-[150mm] left-0 w-full h-[147mm] bg-[#FDFCFB] p-[20mm] flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] font-black text-[#991B1B] uppercase tracking-[0.4em] mb-4">Behavioral Design Specification</p>
              <h1 className="font-playfair text-[65px] font-black text-[#0A0A0A] uppercase tracking-tight leading-[0.9] mb-6">
                Cognitive<br/>Architecture
              </h1>
              <div className="h-[2px] w-24 bg-[#991B1B] mb-6"></div>
              <p className="font-newsreader text-2xl italic text-slate-600 leading-relaxed max-w-md">
                The science of visual authority. Engineering high-status perception and frictionless data processing.
              </p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-inter text-2xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
                <p className="font-mono text-[8px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
              </div>
              <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">
                REF: COG-ARCH-2026
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE EYE-TRACKING AUDIT (FULL BLEED IMAGE) */}
        <div className="a4-page paper-grain">
          {/* Full Bleed Header Image */}
          <div className="absolute top-0 left-0 w-[210mm] h-[120mm] bg-black overflow-hidden">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774541523/blog_assets/qeqdz5z8hjekyi6ou5ht.png" alt="Heatmap" className="w-full h-full object-cover opacity-90" />
          </div>
          {/* Crimson Accent Line */}
          <div className="absolute top-[120mm] left-0 w-[210mm] h-[2mm] bg-[#991B1B]"></div>

          <div className="absolute top-[135mm] left-[20mm] w-[170mm]">
            <p className="font-mono text-[10px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mb-4">Section 01 // The Problem</p>
            <h2 className="font-playfair text-[42px] font-black text-[#0A0A0A] uppercase tracking-tight leading-none mb-6">The Eye-Tracking Audit</h2>
            <p className="font-newsreader text-2xl italic text-slate-500 mb-10 border-l-2 border-[#991B1B] pl-6 py-2">"Visual noise kills trust in under 2.4 seconds."</p>
            
            <div className="grid grid-cols-2 gap-10">
              <div>
                <h3 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-[#991B1B] flex items-center gap-2"><Eye size={14}/> Cognitive Load</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed text-justify">
                  Most documents fail because they overwhelm the brain with "Wall of Text" syndrome. When a recruiter or investor opens a standard PDF, their eyes dart chaotically, searching for an anchor. If they don't find one instantly, cognitive fatigue sets in, and the document is discarded.
                </p>
              </div>
              <div>
                <h3 className="font-inter text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-[#0A0A0A] flex items-center gap-2"><Activity size={14}/> F-Pattern Hijack</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed text-justify">
                  Humans scan digital documents in an "F" shape. We engineer a surgical layout that forces the reader's eye to hit the "Kill-Shot" metrics (e.g., $250k revenue, 180ms latency) exactly where the horizontal bars of the "F" occur.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[15mm] left-[20mm] w-[170mm] flex justify-between border-t border-slate-300 pt-4">
            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Cognitive Architecture</span>
            <span className="font-mono text-[10px] font-black text-[#0A0A0A]">PAGE 02</span>
          </div>
        </div>

        {/* PAGE 3: THE SWISS GRID (FULL BLEED IMAGE) */}
        <div className="a4-page paper-grain">
          {/* Full Bleed Header Image */}
          <div className="absolute top-0 left-0 w-[210mm] h-[120mm] bg-black overflow-hidden">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1774541506/blog_assets/wdtuayasmjozanpi2aai.png" alt="Grid" className="w-full h-full object-cover opacity-90" />
          </div>
          {/* Black Accent Line */}
          <div className="absolute top-[120mm] left-0 w-[210mm] h-[2mm] bg-[#0A0A0A]"></div>

          <div className="absolute top-[135mm] left-[20mm] w-[170mm]">
            <p className="font-mono text-[10px] font-bold text-[#0A0A0A] uppercase tracking-[0.4em] mb-4">Section 02 // The Solution</p>
            <h2 className="font-playfair text-[42px] font-black text-[#0A0A0A] uppercase tracking-tight leading-none mb-8">Swiss Grid & Visual Silencing</h2>
            
            <div className="bg-slate-50 border border-slate-200 p-8 mb-10 shadow-sm">
              <p className="font-newsreader text-xl text-slate-800 leading-relaxed italic text-center">
                We do not use whitespace because it is "pretty." We use it as a <strong className="text-[#991B1B] font-black not-italic">silencer</strong>. By leaving massive negative space on one side of the grid and high-density data on the other, we create a visual vacuum. When the grid is mathematically perfect, the data becomes the loudest thing in the room.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="border-t-2 border-[#991B1B] pt-4">
                <Grid size={20} className="text-[#991B1B] mb-3" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2 text-[#0A0A0A]">12-Column System</h4>
                <p className="font-newsreader text-sm text-slate-600 leading-relaxed">Ensures mathematical alignment of all elements.</p>
              </div>
              <div className="border-t-2 border-[#0A0A0A] pt-4">
                <ShieldCheck size={20} className="text-[#0A0A0A] mb-3" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2 text-[#0A0A0A]">Asymmetry</h4>
                <p className="font-newsreader text-sm text-slate-600 leading-relaxed">Creates dynamic tension and modern editorial feel.</p>
              </div>
              <div className="border-t-2 border-slate-300 pt-4">
                <CheckCircle2 size={20} className="text-slate-400 mb-3" />
                <h4 className="font-inter text-[10px] font-black uppercase tracking-widest mb-2 text-[#0A0A0A]">Absolute Positioning</h4>
                <p className="font-newsreader text-sm text-slate-600 leading-relaxed">Guarantees 100% print-safe rendering across devices.</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[15mm] left-[20mm] w-[170mm] flex justify-between border-t border-slate-300 pt-4">
            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Cognitive Architecture</span>
            <span className="font-mono text-[10px] font-black text-[#0A0A0A]">PAGE 03</span>
          </div>
        </div>

        {/* PAGE 4: TYPOGRAPHIC ANCHORING */}
        <div className="a4-page paper-grain">
          <div className="absolute top-[20mm] left-[20mm] w-[170mm]">
            <p className="font-mono text-[10px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mb-4">Section 03 // The Authority</p>
            <h2 className="font-playfair text-[42px] font-black text-[#0A0A0A] uppercase tracking-tight leading-none mb-6">Typographic Anchoring</h2>
            <p className="font-newsreader text-2xl italic text-slate-500 mb-16">"Fonts do not just display words; they dictate status."</p>
            
            <div className="space-y-12">
              {/* Font 1 */}
              <div className="flex gap-10 items-center">
                <div className="w-32 h-32 bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 shadow-xl">
                  <span className="font-playfair text-7xl font-black">Aa</span>
                </div>
                <div>
                  <h3 className="font-inter text-lg font-black uppercase tracking-widest mb-1 text-[#0A0A0A]">Playfair Display</h3>
                  <p className="font-mono text-[10px] text-[#991B1B] uppercase tracking-[0.3em] mb-4">The Voice of Luxury & Status</p>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Used for massive, high-contrast headers. The sharp serifs and thick/thin strokes trigger a subconscious association with high-end editorial magazines and elite consulting firms.</p>
                </div>
              </div>

              {/* Font 2 */}
              <div className="flex gap-10 items-center">
                <div className="w-32 h-32 bg-white border border-slate-300 text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-sm">
                  <span className="font-mono text-6xl font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-inter text-lg font-black uppercase tracking-widest mb-1 text-[#0A0A0A]">JetBrains Mono</h3>
                  <p className="font-mono text-[10px] text-[#991B1B] uppercase tracking-[0.3em] mb-4">The Voice of Technical Truth</p>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Used for data points, metrics, and code snippets. Monospace fonts are inherently associated with programming and raw data, making the numbers feel mathematically verified and undeniable.</p>
                </div>
              </div>
            </div>

            <div className="mt-20 border-t-2 border-[#0A0A0A] pt-8">
              <p className="font-newsreader text-xl text-slate-800 leading-relaxed">
                The contrast between a luxury serif and a technical monospace creates <strong className="text-[#991B1B] font-black">Typographic Tension</strong>. It forces the reader's brain to conclude: "This is expensive, and this is true."
              </p>
            </div>
          </div>

          <div className="absolute bottom-[15mm] left-[20mm] w-[170mm] flex justify-between border-t border-slate-300 pt-4">
            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Cognitive Architecture</span>
            <span className="font-mono text-[10px] font-black text-[#0A0A0A]">PAGE 04</span>
          </div>
        </div>

        {/* PAGE 5: THE FINAL SEAL */}
        <div className="a4-page paper-grain">
          <div className="absolute top-[60mm] left-[75mm] w-[60mm] h-[60mm] bg-white p-[2mm] border border-slate-200 shadow-2xl">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://boluadeoye.com.ng/portfolio/cognitive-arch" className="w-full h-full" />
          </div>
          <div className="absolute top-[125mm] left-[55mm] w-[100mm] text-center">
            <p className="font-mono text-[8px] font-bold text-[#991B1B] uppercase tracking-[0.3em]">Scan to Verify Live Architecture</p>
          </div>

          <div className="absolute top-[160mm] left-[45mm] w-[120mm] border-4 border-[#0A0A0A] text-[#0A0A0A] font-inter font-black text-4xl tracking-[0.3em] py-4 text-center transform -rotate-6 opacity-90">
            APPROVED
          </div>

          <div className="absolute top-[220mm] left-[20mm] w-[170mm] border-t-2 border-[#0A0A0A] pt-[5mm] flex justify-between items-end">
            <div>
              <h2 className="font-inter text-2xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-mono text-[8px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[6px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Hash</p>
              <p className="font-mono text-[8px] text-slate-800 font-bold">{cryptoHash}</p>
            </div>
          </div>
          
          <div className="absolute bottom-[15mm] left-[20mm] w-[170mm] flex justify-between border-t border-slate-300 pt-4">
            <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.4em]">Cognitive Architecture</span>
            <span className="font-mono text-[10px] font-black text-[#0A0A0A]">PAGE 05</span>
          </div>
        </div>

      </div>
    </div>
  );
}
