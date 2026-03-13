"use client";
import { useState, useEffect } from "react";
import { 
  Download, FileCode2, ShieldAlert, Sun, 
  Database, Lock, Fingerprint, Hexagon, Activity
} from "lucide-react";

export default function SEASpecification() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const steps = [
      "INITIALIZING ISO/IEC FORMATTER...",
      "INJECTING JSON-LD SCHEMA...",
      "CALCULATING BENNETT REFRACTION...",
      "DRAFT_READY"
    ];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep(prev => prev + 1), 600);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    document.title = "FRP_RFC_2026_001_SEA_SPEC";
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
          #rfc-render, #rfc-render * { visibility: visible; }
          #rfc-render { position: absolute; left: 0; top: 0; width: 100%; background: #000000; }
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
          
          /* HEAVY WATERMARK */
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-family: 'Inter', sans-serif;
            font-size: 120px;
            font-weight: 900;
            color: rgba(255, 255, 255, 0.03);
            white-space: nowrap;
            pointer-events: none;
            z-index: 0;
          }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .iso-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-left: 4px solid #10B981;
        }
      `}</style>

      {/* === VIEW 1: OBSIDIAN PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
        
        <div className="relative z-10 w-full max-w-md border border-emerald-500/30 bg-black/50 backdrop-blur-xl p-10 text-center shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]">
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-950/50 border border-emerald-500 flex items-center justify-center transform rotate-45">
            <FileCode2 size={32} className="text-emerald-400 -rotate-45" />
          </div>

          <h1 className="font-inter text-2xl font-black text-white mb-2 tracking-widest uppercase">SEA-v1.0 Spec</h1>
          <p className="font-mono text-emerald-500 text-[10px] mb-8 tracking-[0.2em]">FRP-RFC-2026-001</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-emerald-950/20 p-6 border-l-2 border-emerald-500 font-mono text-[10px] text-emerald-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; {loadingStep >= 1 ? "INJECTING JSON-LD SCHEMA..." : "..."}</p>
              <p className="opacity-75">&gt; {loadingStep >= 2 ? "CALCULATING BENNETT REFRACTION..." : "..."}</p>
              <p className="text-white font-bold animate-pulse">&gt; {loadingStep >= 3 ? "DRAFT_READY" : "..."}</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download size={18} />
              Extract RFC Draft
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE RFC DOCUMENT (Print) === */}
      <div id="rfc-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: TITLE & ABSTRACT */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001" />
          
          <main className="grow flex flex-col justify-center relative z-10">
            <div className="mb-12">
              <p className="font-mono text-xs text-emerald-500 tracking-[0.3em] mb-4">ISO/IEC FORMATTED SPECIFICATION</p>
              <h1 className="font-inter text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                SEA-v1.0: Solar Ephemeris Assertion
              </h1>
              <div className="h-1 w-32 bg-emerald-500 mb-8"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12 font-mono text-xs">
              <div className="iso-card p-4">
                <span className="text-slate-500 block mb-1">Document ID:</span>
                <span className="text-white font-bold">FRP-RFC-2026-001</span>
              </div>
              <div className="iso-card p-4">
                <span className="text-slate-500 block mb-1">Author:</span>
                <span className="text-white font-bold">Bolu Adeoye, FRP</span>
              </div>
              <div className="col-span-2 iso-card p-4 border-l-red-500">
                <span className="text-slate-500 block mb-1">Status:</span>
                <span className="text-red-400 font-bold">Draft for C2PA Technical Working Group Evaluation</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-inter text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Hexagon size={20} className="text-emerald-500"/> Abstract
              </h2>
              <p className="font-inter text-sm leading-relaxed text-justify text-slate-300">
                This document defines the Solar Ephemeris Assertion (SEA), a deterministic metadata standard for anchoring digital media to physical reality. SEA provides a non-repudiable link between a content capture event and the immutable state of the solar system. By cross-referencing astronomical ephemeris data with hardware-level sensor telemetry, SEA enables the detection of spatial-temporal spoofing and synthetic media generation with mathematical finality.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 2: THE DATA SCHEMA */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001 // SECTION 1.0" />
          
          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-6">1.0 The Data Schema (JSON-LD)</h2>
            
            <p className="font-inter text-sm text-slate-300 mb-6">
              Namespace: <span className="font-mono text-emerald-400 bg-emerald-950/30 px-2 py-1">c2pa.assertion.solar_ephemeris</span>
            </p>
            <p className="font-inter text-sm text-slate-300 mb-6">
              The SEA manifest must be encoded as a JSON-LD object within the C2PA JUMBF structure.
            </p>

            <div className="bg-[#0a0a0a] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                <Database size={14} className="text-emerald-500"/>
                <span className="font-mono text-[10px] text-slate-400">sea-manifest.json</span>
              </div>
              <pre className="p-6 font-mono text-[11px] leading-relaxed text-emerald-300 overflow-x-auto">
{`{
  "@context": "https://frp-protocol.org/contexts/sea-v1.jsonld",
  "@type": "SolarEphemerisAssertion",
  "version": "1.0",
  "observation": {
    "timestamp": "ISO-8601-UTC",
    "geo": {
      "latitude": "decimal",
      "longitude": "decimal",
      "altitude_meters": "float"
    }
  },
  "ephemeris_data": {
    "sun_altitude": "degrees",
    "sun_azimuth": "degrees_normalized_0_360",
    "source": "SUNCALC_V1.9_STABLE"
  },
  "hardware_telemetry": {
    "iso_sensitivity": "integer",
    "exposure_time": "string_fraction",
    "aperture": "f_stop_decimal"
  },
  "integrity": {
    "header_hash_sha256": "hex_string",
    "manifest_super_hash": "hex_string"
  }
}`}
              </pre>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE VALIDATION ALGORITHM */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001 // SECTION 2.0" />
          
          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-6">2.0 The Validation Algorithm</h2>
            
            <div className="iso-card p-4 mb-8 font-mono text-xs">
              <span className="text-slate-500">Algorithm ID: </span>
              <span className="text-emerald-400 font-bold">FRP-SEA-VAL-01</span>
            </div>

            <p className="font-inter text-sm text-slate-300 mb-8">
              The validation process requires a three-stage deterministic cross-check:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono">2.1</span> Ephemeris Derivation
                </h3>
                <p className="font-inter text-sm text-slate-400 pl-7">
                  Given <span className="font-mono text-xs text-emerald-300">observation.geo</span> and <span className="font-mono text-xs text-emerald-300">observation.timestamp</span>, the validator must derive the solar position vectors (Altitude &theta; and Azimuth &phi;).
                </p>
              </div>

              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono">2.2</span> Hardware Correlation
                </h3>
                <p className="font-inter text-sm text-slate-400 pl-7 mb-4">
                  The validator applies the Exposure-Physics Matrix.
                </p>
                <div className="pl-7 space-y-3">
                  <div className="bg-red-950/20 border border-red-500/30 p-3 font-mono text-xs">
                    <span className="text-red-400 font-bold">Rule A (Night-Day Conflict):</span> If &theta; &lt; -2.0&deg; and iso_sensitivity &lt; 400, the assertion is invalidated.
                  </div>
                  <div className="bg-yellow-950/20 border border-yellow-500/30 p-3 font-mono text-xs">
                    <span className="text-yellow-400 font-bold">Rule B (Day-Night Conflict):</span> If &theta; &gt; 20.0&deg; and iso_sensitivity &gt; 1600, the assertion is flagged for high-entropy review.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                  <span className="text-emerald-500 font-mono">2.3</span> Binary Consistency
                </h3>
                <p className="font-inter text-sm text-slate-400 pl-7">
                  The <span className="font-mono text-xs text-emerald-300">header_hash_sha256</span> must match the first 128KB of the target file to ensure the metadata has not been re-injected into a different binary.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: UNCERTAINTY & PRECISION MOAT */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001 // SECTION 3.0" />
          
          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-8">3.0 Uncertainty & Precision Moat</h2>
            
            <h3 className="font-inter text-sm font-bold text-emerald-400 uppercase mb-4">3.4 Uncertainty Propagation Model</h3>
            <p className="font-inter text-sm text-slate-300 mb-6 leading-relaxed">
              To prevent "Boundary Spoofing" (where an attacker claims a time/location just at the edge of a lighting shift), SEA implements a Gaussian Uncertainty Buffer:
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="iso-card p-5 text-center">
                <Activity size={24} className="mx-auto text-emerald-500 mb-2"/>
                <p className="font-mono text-[10px] text-slate-400 uppercase mb-1">Temporal Tolerance</p>
                <p className="font-mono text-lg font-bold text-white">&plusmn;2 seconds</p>
              </div>
              <div className="iso-card p-5 text-center">
                <Crosshair size={24} className="mx-auto text-emerald-500 mb-2"/>
                <p className="font-mono text-[10px] text-slate-400 uppercase mb-1">Spatial Tolerance</p>
                <p className="font-mono text-lg font-bold text-white">&plusmn;10 meters</p>
              </div>
            </div>

            <h3 className="font-inter text-sm font-bold text-emerald-400 uppercase mb-4">Atmospheric Refraction Correction</h3>
            <p className="font-inter text-sm text-slate-300 mb-8 leading-relaxed">
              The algorithm must account for low-altitude refraction (&lt;5&deg;) using the Bennett Formula to ensure <span className="font-mono text-emerald-400">&plusmn;0.01</span> arcminute precision.
            </p>

            <div className="bg-emerald-950/20 border border-emerald-500/50 p-6 relative">
              <div className="absolute -top-3 left-4 bg-black px-2 font-mono text-[10px] text-emerald-500 font-bold">MOAT LOGIC</div>
              <p className="font-inter text-sm text-slate-300 leading-relaxed italic">
                Any implementation failing to account for the Bennett Formula or the IERS (International Earth Rotation and Reference Systems Service) polar motion data will produce a signature mismatch against the FRP Reference Oracle.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: CRYPTOGRAPHIC BINDING */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001 // SECTION 4.0" />
          
          <main className="grow relative z-10">
            <h2 className="font-inter text-2xl font-black text-white uppercase tracking-widest mb-8">4.0 Cryptographic Binding</h2>
            
            <div className="iso-card p-4 mb-8 font-mono text-xs">
              <span className="text-slate-500">Signature Scheme: </span>
              <span className="text-emerald-400 font-bold">ECDSA over secp256k1</span>
            </div>

            <p className="font-inter text-sm text-slate-300 mb-8 border-l-2 border-emerald-500 pl-4">
              The SEA manifest is not a standalone claim; it is a Cryptographic Commitment.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2">The Super-Hash</h3>
                <div className="bg-black border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
                  H = SHA256( JSON(SEA_Manifest) + Binary_Header_Hash )
                </div>
              </div>

              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2">The Seal</h3>
                <p className="font-inter text-sm text-slate-400">
                  The Oracle signs <span className="font-mono text-emerald-400">H</span> using the private key.
                </p>
              </div>

              <div>
                <h3 className="font-inter text-sm font-bold text-white uppercase mb-2">The Verification</h3>
                <p className="font-inter text-sm text-slate-400">
                  Any third-party validator (C2PA-compliant) verifies the signature against the FRP Public Key published at <span className="font-mono text-emerald-400">/.well-known/frp-oracle</span>.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: ARCHITECTURAL APPROVAL */}
        <div className="a4-page flex flex-col p-[20mm]">
          <div className="watermark">DRAFT FOR EVALUATION</div>
          <Header title="FRP-RFC-2026-001 // APPROVAL" />
          
          <main className="grow flex flex-col justify-center relative z-10">
            
            <div className="iso-card p-10 border-t-4 border-emerald-500">
              <div className="flex items-center gap-3 mb-10">
                <ShieldAlert size={32} className="text-red-500" />
                <div>
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Status</p>
                  <p className="font-inter text-xl font-black text-red-400 uppercase tracking-widest">FINAL DRAFT RELEASED FOR EXTERNAL AUDIT</p>
                </div>
              </div>

              <div className="space-y-6 font-mono text-sm text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Date:</span>
                  <span className="text-white">March 13, 2026</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Architect:</span>
                  <span className="font-inter font-black text-white uppercase tracking-widest">Bolu Adeoye</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Organization:</span>
                  <span className="text-white">Forensic Reality Protocol (FRP)</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-500">Reference Implementation:</span>
                  <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4">https://frp-core.vercel.app</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Public Key ID:</span>
                  <span className="text-emerald-400">frp-oracle-v1</span>
                </div>
              </div>
            </div>

          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Header({ title }) {
  return (
    <header className="border-b border-emerald-500/30 pb-4 mb-8 flex justify-between items-end relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-emerald-500 tracking-widest">{title}</h2>
      <Hexagon className="text-emerald-500/50" size={16} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-500/30 pt-4 mt-auto flex justify-between items-center relative z-10 bg-black">
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
