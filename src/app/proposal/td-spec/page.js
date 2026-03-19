"use client";
import { useState, useEffect } from "react";
import { Download, FileJson } from "lucide-react";

export default function TDSpecification() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1200); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "TD_TECHNICAL_SPECIFICATION_2026";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-red-200">
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #td-spec-render, #td-spec-render * { visibility: visible; }
          #td-spec-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FFFFFF; box-sizing: border-box; overflow: hidden; }
          .no-print { display: none !important; }
        }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .json-key { color: #0F172A; font-weight: 600; }
        .json-string { color: #DC2626; }
      `}</style>

      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-4 border-[#DC2626]">
          <FileJson size={48} className="text-[#0F172A] mx-auto mb-6" />
          <h1 className="font-newsreader text-3xl font-semibold text-[#0F172A] mb-8 uppercase tracking-tight">Data Specification</h1>
          {!isReady ? <div className="text-slate-400 font-mono text-xs animate-pulse">FORMATTING JSON-LD...</div> : 
          <button onClick={handlePrint} className="w-full bg-[#0F172A] text-white font-bold py-4 rounded uppercase tracking-widest hover:bg-slate-800 transition-all">Extract Specification</button>}
        </div>
      </div>

      <div id="td-spec-render" className="hidden print:block">
        <div className="a4-page p-[30mm] relative">
          <div className="absolute bottom-[20mm] right-[20mm] opacity-10 grayscale mix-blend-multiply pointer-events-none z-0">
            <img src={logoUrl} alt="TD Stamp" className="w-24 h-24 object-contain" />
          </div>
          <header className="flex justify-between items-end border-b border-slate-200 pb-6 mb-12 relative z-10">
            <div>
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Section 2.0</p>
              <h2 className="font-inter text-sm font-black text-[#0F172A] uppercase tracking-widest">The Data Schema (JSON-LD)</h2>
            </div>
            <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">TD-SPEC-2026</div>
          </header>
          <main className="grow flex flex-col relative z-10">
            <div className="mb-10 max-w-prose">
              <p className="font-newsreader text-lg leading-relaxed text-slate-800 text-justify mb-6">
                The <span className="font-inter font-semibold text-[#DC2626]">Solar Ephemeris Assertion (SEA)</span> manifest must be encoded as a JSON-LD object. This schema provides a deterministic, non-repudiable link to physical reality.
              </p>
            </div>
            <div className="bg-slate-50 border border-[#0F172A] rounded-sm overflow-hidden shadow-sm mb-10">
              <div className="bg-white px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0F172A]">sea-manifest.json</span>
                <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Format: JSON-LD</span>
              </div>
              <pre className="p-8 font-mono text-[10px] leading-[2] overflow-x-auto">
{`{
  `} <span className="json-key">"@context"</span>{`: `}<span className="json-string">"https://frp-protocol.org/contexts/sea-v1.jsonld"</span>{`,
  `} <span className="json-key">"@type"</span>{`: `}<span className="json-string">"SolarEphemerisAssertion"</span>{`,
  `} <span className="json-key">"version"</span>{`: `}<span className="json-string">"1.0"</span>{`,
  `} <span className="json-key">"observation"</span>{`: {
    `} <span className="json-key">"timestamp"</span>{`: `}<span className="json-string">"ISO-8601-UTC"</span>{`
  }
}`}
              </pre>
            </div>
            <div className="mt-auto border-l-2 border-[#DC2626] pl-6 py-2">
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Architectural Note</p>
              <p className="font-newsreader text-sm italic text-slate-700">"The integrity of the assertion relies entirely on the manifest_super_hash."</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
