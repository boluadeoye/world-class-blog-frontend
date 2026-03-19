"use client";
import { useState, useEffect } from "react";
import { Download, FileJson, Hexagon } from "lucide-react";

export default function TDSpecification() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "TD_TECHNICAL_SPECIFICATION_2026";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT BOUTIQUE FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #td-spec-render, #td-spec-render * { visibility: visible; }
          #td-spec-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF;
            box-sizing: border-box;
            overflow: hidden;
          }
          .no-print { display: none !important; }
        }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* JSON SYNTAX HIGHLIGHTING */
        .json-key { color: #0F172A; font-weight: 600; }
        .json-string { color: #DC2626; }
        .json-number { color: #2563EB; }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-4 border-[#DC2626]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center p-3 border border-slate-200">
            <FileJson size={32} className="text-[#0F172A]" />
          </div>

          <h1 className="font-newsreader text-3xl font-semibold text-[#0F172A] mb-2 tracking-tight">Data Schema</h1>
          <p className="font-inter text-[#DC2626] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Titanium Digital Spec</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#DC2626] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; FORMATTING JSON-LD...</p>
              <p className="opacity-75">&gt; ALIGNING EDITORIAL MARGINS...</p>
              <p className="text-[#0F172A] font-bold animate-pulse">&gt; SPEC_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Specification
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE TECHNICAL SPECIFICATION (Print Only) === */}
      <div id="td-spec-render" className="hidden print:block text-[#0F172A]">
        
        <div className="a4-page flex flex-col p-[30mm] relative">
          
          {/* DRY-STAMP WATERMARK (Bottom Right) */}
          <div className="absolute bottom-[20mm] right-[20mm] opacity-10 grayscale mix-blend-multiply pointer-events-none z-0">
            <img src={logoUrl} alt="TD Dry Stamp" className="w-24 h-24 object-contain" />
          </div>

          {/* HEADER */}
          <header className="flex justify-between items-end border-b border-slate-200 pb-6 mb-12 relative z-10">
            <div>
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Section 2.0</p>
              <h2 className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-widest">The Data Schema (JSON-LD)</h2>
            </div>
            <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">
              TD-SPEC-2026
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="grow flex flex-col relative z-10">
            
            {/* EDITORIAL DESCRIPTION */}
            <div className="mb-10 max-w-prose">
              <p className="font-newsreader text-lg leading-relaxed text-slate-800 text-justify mb-6">
                The <span className="font-inter font-semibold text-[#DC2626]">Solar Ephemeris Assertion (SEA)</span> manifest must be encoded as a JSON-LD object within the C2PA JUMBF structure. This schema provides a deterministic, non-repudiable link between a content capture event and the immutable state of the solar system.
              </p>
              <p className="font-inter text-xs text-slate-500 uppercase tracking-widest">
                Namespace: <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-1">c2pa.assertion.solar_ephemeris</span>
              </p>
            </div>

            {/* HIGH-FIDELITY DATA BOX */}
            <div className="bg-slate-50 border border-[#0F172A] rounded-sm overflow-hidden shadow-sm mb-10">
              <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileJson size={14} className="text-[#DC2626]"/>
                  <span className="font-mono text-[10px] font-bold text-[#0F172A]">sea-manifest.json</span>
                </div>
                <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Format: JSON-LD</span>
              </div>
              
              <pre className="p-8 font-mono text-[10px] leading-[2] overflow-x-auto">
{`{
  `}
<span className="json-key">"@context"</span>{`: `}<span className="json-string">"https://frp-protocol.org/contexts/sea-v1.jsonld"</span>{`,
  `}
<span className="json-key">"@type"</span>{`: `}<span className="json-string">"SolarEphemerisAssertion"</span>{`,
  `}
<span className="json-key">"version"</span>{`: `}<span className="json-string">"1.0"</span>{`,
  `}
<span className="json-key">"observation"</span>{`: {
    `}
<span className="json-key">"timestamp"</span>{`: `}<span className="json-string">"ISO-8601-UTC"</span>{`,
    `}
<span className="json-key">"geo"</span>{`: {
      `}
<span className="json-key">"latitude"</span>{`: `}<span className="json-string">"decimal"</span>{`,
      `}
<span className="json-key">"longitude"</span>{`: `}<span className="json-string">"decimal"</span>{`,
      `}
<span className="json-key">"altitude_meters"</span>{`: `}<span className="json-string">"float"</span>{`
    }
  },
  `}
<span className="json-key">"ephemeris_data"</span>{`: {
    `}
<span className="json-key">"sun_altitude"</span>{`: `}<span className="json-string">"degrees"</span>{`,
    `}
<span className="json-key">"sun_azimuth"</span>{`: `}<span className="json-string">"degrees_normalized_0_360"</span>{`,
    `}
<span className="json-key">"source"</span>{`: `}<span className="json-string">"SUNCALC_V1.9_STABLE"</span>{`
  },
  `}
<span className="json-key">"integrity"</span>{`: {
    `}
<span className="json-key">"header_hash_sha256"</span>{`: `}<span className="json-string">"hex_string"</span>{`,
    `}
<span className="json-key">"manifest_super_hash"</span>{`: `}<span className="json-string">"hex_string"</span>{`
  }
}`}
              </pre>
            </div>

            {/* ARCHITECTURAL NOTE */}
            <div className="mt-auto border-l-2 border-[#DC2626] pl-6 py-2">
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Architectural Note</p>
              <p className="font-newsreader text-sm italic text-slate-700">
                "The integrity of the assertion relies entirely on the <span className="font-mono text-[10px] text-[#0F172A]">manifest_super_hash</span>. Any mutation in the physical telemetry will invalidate the cryptographic seal."
              </p>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
