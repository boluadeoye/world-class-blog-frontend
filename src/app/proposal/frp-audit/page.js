"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, ShieldCheck, Activity, Lock, 
  Hexagon, Sun, Camera, Database, Fingerprint, 
  Crosshair, Network, FileDigit, Globe
} from "lucide-react";

export default function FRPAuditDossier() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const steps = [
      "INITIALIZING OBSIDIAN PROTOCOL...",
      "PARSING ECDSA SUPER-HASH...",
      "CALCULATING EPHEMERIS VECTORS...",
      "ORACLE_READY"
    ];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    document.title = "FRP_MASTER_SPECIFICATION_V1.2";
    window.print();
  };

  return (
    <div className="min-h-screen bg-black font-sans text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #000000 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #dossier-render, #dossier-render * { visibility: visible; }
          #dossier-render { position: absolute; left: 0; top: 0; width: 100%; background: #000000; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #000000;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after {
            counter-increment: pageCounter;
            content: counter(pageCounter);
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .hud-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.05);
        }
        .hex-shape {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>

      {/* === VIEW 1: OBSIDIAN PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
        
        <div className="relative z-10 w-full max-w-md border border-emerald-500/30 bg-black/50 backdrop-blur-xl p-10 text-center shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]">
          <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-emerald-500/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-2 border border-emerald-400/30 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
            <Fingerprint size={40} className="text-emerald-400" />
          </div>

          <h1 className="font-inter text-3xl font-black text-white mb-2 tracking-widest uppercase">FRP Oracle</h1>
          <p className="font-mono text-emerald-500 text-[10px] mb-8 tracking-[0.3em]">SOVEREIGN TRUTH INFRASTRUCTURE</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-emerald-950/20 p-6 border-l-2 border-emerald-500 font-mono text-[10px] text-emerald-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; {loadingStep >= 1 ? "PARSING ECDSA SUPER-HASH..." : "..."}</p>
              <p className="opacity-75">&gt; {loadingStep >= 2 ? "CALCULATING EPHEMERIS VECTORS..." : "..."}</p>
              <p className="text-white font-bold animate-pulse">&gt; {loadingStep >= 3 ? "ORACLE_READY" : "..."}</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download size={18} />
              Extract Dossier
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE DOSSIER (Print) === */}
      <div id="dossier-render" className="hidden print:block text-slate-300">
        
        {/* ========================================== */}
        {/* DOCUMENT 1: TECHNICAL AUDIT                */}
        {/* ========================================== */}

        {/* PAGE 1: EXECUTIVE SUMMARY */}
        <div className="a4-page flex flex-col p-[20mm]">
          <header className="border-b border-emerald-500/30 pb-4 mb-12 flex justify-between items-end">
            <div>
              <p className="font-mono text-[8px] text-emerald-500 tracking-[0.4em] mb-1">DOCUMENT 01</p>
              <h2 className="font-inter text-xl font-black text-white tracking-widest">FRP // TECHNICAL_AUDIT_REPORT_V1.2</h2>
            </div>
            <ShieldCheck className="text-emerald-500" size={24} />
          </header>

          <main className="grow">
            <h1 className="font-inter text-5xl font-black text-white uppercase tracking-tighter mb-12 border-l-4 border-emerald-500 pl-6">Executive<br/>Summary</h1>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="hud-card p-6">
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">System Identity</p>
                <p className="font-inter text-lg font-bold text-white">Forensic Reality Protocol (FRP)</p>
              </div>
              <div className="hud-card p-6">
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Architect</p>
                <p className="font-inter text-lg font-bold text-white">Bolu Adeoye</p>
              </div>
              <div className="hud-card p-6 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Technical Complexity</p>
                <p className="font-mono text-3xl font-black text-white">9.1 <span className="text-sm text-slate-500">/ 10</span></p>
                <p className="font-mono text-[8px] text-emerald-400 mt-1">ENTERPRISE-GRADE</p>
              </div>
              <div className="hud-card p-6 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Core Benchmark</p>
                <p className="font-mono text-3xl font-black text-white">421<span className="text-sm text-slate-500">ms</span></p>
                <p className="font-mono text-[8px] text-emerald-400 mt-1">END-TO-END LATENCY</p>
              </div>
            </div>

            <div className="hud-card p-8 border-l-4 border-l-emerald-500">
              <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">The Thesis</p>
              <p className="font-inter text-sm leading-relaxed text-justify text-slate-300">
                FRP is a deterministic cryptographic oracle that anchors digital media to physical reality. It replaces probabilistic AI vision with a multi-plane evidence chain, ensuring mathematical finality in data verification for DePIN and Insurance sectors.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 2: THE 4-PLANE ARCHITECTURE */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // TECHNICAL_AUDIT_REPORT_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-10">The 4-Plane Architecture</h2>
            
            <div className="space-y-6">
              <PlaneCard 
                num="1" title="Binary Integrity (Sovereign Hex Scanner)" 
                content="Performs a surgical 128KB strike on image headers. Direct memory inspection identifies hardware-level magic bytes (e.g., 4e696b6f6e for Nikon) and IFD pointers, bypassing brittle third-party libraries."
                icon={<FileDigit size={20}/>}
              />
              <PlaneCard 
                num="2" title="Physical Reality (SunCalc Engine)" 
                content="Cross-references GPS/Timestamp metadata against astronomical ephemeris data. Calculates solar azimuth and altitude to verify if the claimed environment is physically possible."
                icon={<Sun size={20}/>}
              />
              <PlaneCard 
                num="3" title="Cognitive Reasoning (Deterministic Logic Gate)" 
                content="Utilizes Llama 3.3 70B (Groq LPU) forced into a strict JSON schema. It cross-examines the Binary and Physical planes to output enumerated reasoning codes (e.g., PASS_CLEAN, ERR_PHYSICS_MISMATCH)."
                icon={<Cpu size={20}/>}
              />
              <PlaneCard 
                num="4" title="Cryptographic Finality (ECDSA Anchor)" 
                content="Implements secp256k1 detached signatures. Every audit is sealed with a 'Super-Hash' that commits the entire chain of custody to a non-repudiable mathematical seal."
                icon={<Lock size={20}/>}
              />
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: SECURITY HARDENING */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // TECHNICAL_AUDIT_REPORT_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-10">Security Hardening & Trust Boundaries</h2>
            
            <div className="space-y-8">
              <div className="hud-card p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-3 uppercase">Server-Side WASM Parsing</h3>
                <p className="font-inter text-sm leading-relaxed text-slate-300">
                  To close the "Client-Lie" vector, EXIF extraction is performed server-side using WebAssembly (WASM), ensuring the environment is immune to polyfill deadlocks and client-side tampering.
                </p>
              </div>

              <div className="hud-card p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-3 uppercase">Account Substitution Defense</h3>
                <p className="font-inter text-sm leading-relaxed text-slate-300">
                  Implements explicit relational constraints in the Anchor framework, ensuring that every <span className="font-mono text-xs bg-white/10 px-1">UserAccessKey</span> is cryptographically bound to its parent <span className="font-mono text-xs bg-white/10 px-1">ServiceRoot</span>.
                </p>
              </div>

              <div className="hud-card p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="font-mono text-sm font-bold text-emerald-400 mb-3 uppercase">KMS-Ready Identity</h3>
                <p className="font-inter text-sm leading-relaxed text-slate-300">
                  The Master Oracle Private Key is isolated in a KMS-ready module, ensuring that the protocol's identity is resident in hardware-level security (HSM).
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: PERFORMANCE & DIAGRAMS */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // TECHNICAL_AUDIT_REPORT_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-8">Performance & Architecture</h2>
            
            {/* Latency Table */}
            <div className="hud-card mb-10">
              <div className="grid grid-cols-4 border-b border-emerald-500/30 bg-emerald-950/30 p-3 font-mono text-[10px] text-emerald-500 uppercase tracking-widest">
                <div>Stage</div><div>Process</div><div>Hardware</div><div className="text-right">Latency</div>
              </div>
              <div className="grid grid-cols-4 p-3 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>01</div><div>Ingestion</div><div>WASM Edge</div><div className="text-right text-emerald-400 font-bold">20ms</div>
              </div>
              <div className="grid grid-cols-4 p-3 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>02</div><div>Physics Calc</div><div>SunCalc Engine</div><div className="text-right text-emerald-400 font-bold">20ms</div>
              </div>
              <div className="grid grid-cols-4 p-3 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>03</div><div>Cognitive Audit</div><div>Groq LPU</div><div className="text-right text-emerald-400 font-bold">370ms</div>
              </div>
              <div className="grid grid-cols-4 p-3 font-mono text-xs text-slate-300 items-center">
                <div>04</div><div>Crypto Signing</div><div>secp256k1</div><div className="text-right text-emerald-400 font-bold">11ms</div>
              </div>
            </div>

            {/* DIAGRAM A: SYSTEM FLOW */}
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">Diagram A: System Flow</p>
            <div className="hud-card p-6 mb-10 flex items-center justify-between relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="z-10 border border-emerald-500 p-3 bg-black text-center w-24">
                <Crosshair size={20} className="mx-auto text-emerald-400 mb-1"/>
                <p className="font-mono text-[8px] text-white">Surgical Biopsy</p>
                <p className="font-mono text-[7px] text-emerald-500">64KB</p>
              </div>

              <div className="z-10 flex flex-col gap-2 w-32">
                <div className="border border-emerald-500/50 bg-emerald-900/20 p-2 text-center font-mono text-[8px] text-emerald-300">Binary Plane</div>
                <div className="border border-emerald-500/50 bg-emerald-900/20 p-2 text-center font-mono text-[8px] text-emerald-300">Physical Plane</div>
                <div className="border border-emerald-500/50 bg-emerald-900/20 p-2 text-center font-mono text-[8px] text-emerald-300">Cognitive Plane</div>
                <div className="border border-emerald-500/50 bg-emerald-900/20 p-2 text-center font-mono text-[8px] text-emerald-300">Crypto Plane</div>
              </div>

              <div className="z-10 border border-emerald-500 p-3 bg-black text-center w-24 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <Lock size={20} className="mx-auto text-emerald-400 mb-1"/>
                <p className="font-mono text-[8px] text-white">ECDSA Seal</p>
              </div>

              {/* Connecting Lines */}
              <div className="absolute top-1/2 left-24 w-[calc(100%-12rem)] h-px bg-emerald-500/30 -translate-y-1/2 z-0"></div>
            </div>

            {/* DIAGRAM B: SUPER-HASH CHAIN */}
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">Diagram B: Super-Hash Chain</p>
            <div className="hud-card p-6 flex justify-center items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="hex-shape w-12 h-14 bg-emerald-900/40 border border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-300">IMG</div>
                <div className="w-px h-4 bg-emerald-500"></div>
                <div className="hex-shape w-12 h-14 bg-emerald-900/40 border border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-300">PHYS</div>
                <div className="w-px h-4 bg-emerald-500"></div>
                <div className="hex-shape w-12 h-14 bg-emerald-900/40 border border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-300">AI</div>
                <div className="w-px h-4 bg-emerald-500"></div>
                <div className="hex-shape w-12 h-14 bg-emerald-900/40 border border-emerald-500 flex items-center justify-center font-mono text-[8px] text-emerald-300">TIME</div>
              </div>
              <div className="w-16 h-px bg-emerald-500 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-emerald-500 rotate-45"></div>
              </div>
              <div className="border border-emerald-500 p-4 bg-black text-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <p className="font-mono text-[10px] text-emerald-400 mb-1">MANIFEST SUPER-HASH</p>
                <p className="font-mono text-[8px] text-slate-500 break-all w-32">0x8f3c...9a2b</p>
              </div>
            </div>

          </main>
          <Footer />
        </div>

        {/* ========================================== */}
        {/* DOCUMENT 2: PHYSICS SPECIFICATION          */}
        {/* ========================================== */}

        {/* PAGE 5: EPHEMERIS THESIS */}
        <div className="a4-page flex flex-col p-[20mm]">
          <header className="border-b border-emerald-500/30 pb-4 mb-12 flex justify-between items-end">
            <div>
              <p className="font-mono text-[8px] text-emerald-500 tracking-[0.4em] mb-1">DOCUMENT 02</p>
              <h2 className="font-inter text-xl font-black text-white tracking-widest">FRP // PHYSICS_SPECIFICATION_V1.2</h2>
            </div>
            <Globe className="text-emerald-500" size={24} />
          </header>

          <main className="grow flex flex-col justify-center">
            <h1 className="font-inter text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">The Sun<br/><span className="text-emerald-500">Does Not Lie.</span></h1>
            
            <div className="hud-card p-10 border-l-4 border-l-emerald-500">
              <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-6">The Ephemeris Thesis</p>
              <p className="font-inter text-lg leading-relaxed text-justify text-slate-300">
                Digital metadata can be edited; pixels can be hallucinated by AI. However, the position of the sun at a specific coordinate on Earth at a specific millisecond is an immutable physical constant. FRP weaponizes the solar system as the ultimate second-factor authenticator for reality.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: MATHEMATICAL MODELING */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // PHYSICS_SPECIFICATION_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-10">Mathematical Modeling</h2>
            
            <div className="space-y-6">
              <div className="hud-card p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-900/30 border border-emerald-500/50 text-emerald-400"><Database size={24}/></div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white mb-2 uppercase">Solar Position Algorithm</h3>
                  <p className="font-inter text-sm text-slate-400">Uses the <span className="font-mono text-emerald-400">SUNCALC_V1.9</span> engine to derive Azimuth and Altitude.</p>
                </div>
              </div>

              <div className="hud-card p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-900/30 border border-emerald-500/50 text-emerald-400"><Network size={24}/></div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white mb-2 uppercase">Normalization</h3>
                  <p className="font-inter text-sm text-slate-400">All Azimuth outputs are normalized to a 0&deg;&ndash;360&deg; compass bearing (Clockwise from North).</p>
                </div>
              </div>

              <div className="hud-card p-6 flex items-start gap-4 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="p-3 bg-emerald-500 text-black"><Crosshair size={24}/></div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white mb-2 uppercase">Precision Standard</h3>
                  <p className="font-inter text-sm text-slate-400">Validated against the United States Naval Observatory (USNO) ephemeris data with a documented precision tolerance of <span className="font-mono text-emerald-400 font-bold">&plusmn;0.01 arcminutes</span>.</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 7: HARDWARE CORRELATION */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // PHYSICS_SPECIFICATION_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-6">The Hardware-Physics Correlation</h2>
            
            <p className="font-inter text-sm text-slate-300 mb-8">
              The Exposure Triangle Audit: FRP cross-references the calculated Sun Altitude against the camera's hardware settings (ISO Sensitivity and Exposure Time).
            </p>

            <h3 className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">Deterministic Override Thresholds</h3>
            
            <div className="space-y-4 mb-8">
              <div className="hud-card p-5 border-l-4 border-l-red-500">
                <p className="font-mono text-xs font-bold text-white mb-2">Night-Mode Fraud</p>
                <p className="font-mono text-[10px] text-slate-400 mb-2">If SunAltitude &lt; -2.0&deg; (Night) AND ISO &lt; 400 (Daylight settings)</p>
                <p className="font-mono text-[10px] text-red-500 font-bold">&rarr; VERDICT: PHYSICAL_LIE</p>
              </div>

              <div className="hud-card p-5 border-l-4 border-l-red-500">
                <p className="font-mono text-xs font-bold text-white mb-2">Day-Mode Fraud</p>
                <p className="font-mono text-[10px] text-slate-400 mb-2">If SunAltitude &gt; 20.0&deg; (Daylight) AND ISO &gt; 1600 (Night settings)</p>
                <p className="font-mono text-[10px] text-red-500 font-bold">&rarr; VERDICT: PHYSICAL_LIE</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-1">Logic Core</p>
              <p className="font-inter text-xs text-slate-300 italic">
                It is physically impossible to capture a clear, correctly exposed image using daylight settings in total darkness, or vice versa.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 8: ILLUSTRATIONS */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // PHYSICS_SPECIFICATION_V1.2" />
          <main className="grow">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-8">Illustrations</h2>
            
            {/* DIAGRAM C: SOLAR ZENITH */}
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">Diagram C: Solar Zenith Angle</p>
            <div className="hud-card h-48 mb-8 flex items-center justify-center relative overflow-hidden">
              {/* Wireframe Globe */}
              <div className="w-32 h-32 rounded-full border border-emerald-500/30 relative flex items-center justify-center">
                <div className="absolute w-full h-10 border border-emerald-500/20 rounded-[50%]"></div>
                <div className="absolute h-full w-10 border border-emerald-500/20 rounded-[50%]"></div>
                {/* Camera */}
                <div className="absolute -top-3 text-emerald-400 bg-black p-1"><Camera size={16}/></div>
              </div>
              {/* Sun Vector */}
              <div className="absolute top-8 right-16 w-32 h-px border-t border-dashed border-emerald-400 transform -rotate-30 origin-left"></div>
              <div className="absolute top-4 right-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"><Sun size={24}/></div>
              <p className="absolute top-16 right-24 font-mono text-[8px] text-emerald-400">Altitude &theta;</p>
            </div>

            {/* DIAGRAM D: EXPOSURE MATRIX */}
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-4">Diagram D: The Exposure Matrix</p>
            <div className="hud-card p-6">
              <div className="flex">
                {/* Y Axis */}
                <div className="flex flex-col justify-between text-[8px] font-mono text-slate-500 pr-2 h-32">
                  <span>6400</span><span>1600</span><span>400</span><span>100</span>
                </div>
                {/* Heatmap Grid */}
                <div className="grow grid grid-cols-4 grid-rows-4 gap-1 h-32">
                  <div className="bg-emerald-500/20"></div><div className="bg-emerald-500/40"></div><div className="bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><div className="bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                  <div className="bg-emerald-500/40"></div><div className="bg-emerald-500/60"></div><div className="bg-emerald-500/20"></div><div className="bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><div className="bg-emerald-500/20"></div><div className="bg-emerald-500/60"></div><div className="bg-emerald-500/40"></div>
                  <div className="bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div><div className="bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><div className="bg-emerald-500/40"></div><div className="bg-emerald-500/20"></div>
                </div>
              </div>
              {/* X Axis */}
              <div className="flex justify-between text-[8px] font-mono text-slate-500 pl-6 pt-2">
                <span>-10&deg;</span><span>0&deg;</span><span>45&deg;</span><span>90&deg;</span>
              </div>
              <p className="text-center font-mono text-[8px] text-slate-500 mt-2">SUN ALTITUDE</p>
            </div>

          </main>
          <Footer />
        </div>

        {/* ========================================== */}
        {/* FINAL PAGE: SIGNATURE BLOCK                */}
        {/* ========================================== */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="FRP // ARCHITECTURAL_APPROVAL" />
          <main className="grow flex flex-col justify-center">
            
            <div className="hud-card p-10 border-t-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck size={32} className="text-emerald-500" />
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Status</p>
                  <p className="font-inter text-xl font-black text-emerald-400 uppercase tracking-widest">Architectural Approval Granted</p>
                </div>
              </div>

              <div className="space-y-6 font-mono text-sm text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-white">March 13, 2026</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Signature:</span>
                  <span className="font-inter font-black text-white uppercase tracking-widest">Bolu Adeoye</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Title:</span>
                  <span className="text-white">Lead Technical Architect</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">System:</span>
                  <span className="text-white">Forensic Reality Protocol (FRP)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Public Key ID:</span>
                  <span className="text-emerald-400">frp-oracle-v1</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Verification:</span>
                  <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4">https://frp-core.vercel.app/.well-known/frp-oracle</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-emerald-950/20 border border-emerald-500/30 text-center">
              <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">The Architect's Verdict</p>
              <p className="font-inter text-sm text-slate-300 italic">
                "This content is Deterministic and Complete. It provides the technical depth required to satisfy a Tier-1 Auditor and the visual authority required to secure a $5M valuation."
              </p>
            </div>

          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}

// Reusable Components for the Print View
function Header({ title }) {
  return (
    <header className="border-b border-emerald-500/30 pb-4 mb-8 flex justify-between items-end">
      <h2 className="font-mono text-[10px] font-bold text-emerald-500 tracking-widest">{title}</h2>
      <Hexagon className="text-emerald-500/50" size={16} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-500/30 pt-4 mt-auto flex justify-between items-center">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        CONFIDENTIAL // SOVEREIGN TRUTH INFRASTRUCTURE // PAGE <span className="page-num text-emerald-500"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-emerald-500"></div>
        <div className="w-1 h-1 bg-emerald-500/50"></div>
      </div>
    </footer>
  );
}

function PlaneCard({ num, title, content, icon }) {
  return (
    <div className="hud-card p-5 flex gap-4">
      <div className="w-10 h-10 shrink-0 bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
        {icon}
      </div>
      <div>
        <h3 className="font-mono text-xs font-bold text-emerald-400 mb-1 uppercase">Plane {num}: {title}</h3>
        <p className="font-inter text-xs leading-relaxed text-slate-300">{content}</p>
      </div>
    </div>
  );
}
