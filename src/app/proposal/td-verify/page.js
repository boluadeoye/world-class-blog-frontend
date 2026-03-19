"use client";
import { useState, useEffect } from "react";
import { Download, ShieldCheck, Award, CheckCircle2, Fingerprint } from "lucide-react";

export default function TDVerification() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1200); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "TD_VERIFICATION_CERTIFICATE_2026";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-red-200">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #F9F9F9 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #td-verify-render, #td-verify-render * { visibility: visible; }
          #td-verify-render { position: absolute; left: 0; top: 0; width: 100%; background: #F9F9F9; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #F9F9F9;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .gold-silver-seal {
          background: white;
          border: 8px solid;
          border-image: linear-gradient(45deg, #D4AF37, #E2E8F0, #D4AF37) 1;
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.1);
        }
        .approved-stamp {
          border: 3px solid #DC2626;
          color: #DC2626;
          padding: 4px 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transform: rotate(-2deg);
          display: inline-block;
        }
      `}</style>

      {/* VIEW 1: THE PORTAL */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-4 border-[#D4AF37]">
          <ShieldCheck size={48} className="text-[#0F172A] mx-auto mb-6" />
          <h1 className="font-playfair text-3xl font-semibold text-[#0F172A] mb-8 uppercase tracking-tight">Verify Authenticity</h1>
          {!isReady ? <div className="text-slate-400 font-mono text-xs animate-pulse">GENERATING TRUST SEAL...</div> : 
          <button onClick={handlePrint} className="w-full bg-[#0F172A] text-white font-bold py-4 rounded uppercase tracking-widest hover:bg-slate-800 transition-all">Extract Certificate</button>}
        </div>
      </div>

      {/* VIEW 2: THE VERIFICATION PAGE */}
      <div id="td-verify-render" className="hidden print:block">
        <div className="a4-page p-[40mm] relative">
          
          {/* TOP DECORATIVE LINE */}
          <div className="absolute top-[20mm] left-1/2 -translate-x-1/2 w-32 h-1 bg-[#0F172A]"></div>

          {/* THE SEAL */}
          <div className="gold-silver-seal w-48 h-48 rounded-full flex items-center justify-center mb-16 relative">
            <img src={logoUrl} alt="TD Logo" className="w-32 h-32 object-contain mix-blend-multiply" />
            <div className="absolute -bottom-4 bg-white px-4 py-1 border border-slate-200 rounded-full shadow-sm">
              <p className="font-inter text-[8px] font-black text-[#0F172A] uppercase tracking-widest">Verified Asset</p>
            </div>
          </div>

          {/* MAIN TEXT */}
          <div className="text-center mb-16">
            <p className="font-inter text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Final Architectural Approval</p>
            <h1 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-tight mb-6">Certificate of Integrity</h1>
            <div className="max-w-sm mx-auto">
              <p className="font-inter text-sm text-slate-600 leading-relaxed">
                This document confirms that the proposed infrastructure meets the <span className="font-bold text-[#0F172A]">Titanium Digital</span> standards for performance, security, and mathematical finality.
              </p>
            </div>
          </div>

          {/* THE STAMP */}
          <div className="mb-20">
            <div className="approved-stamp">
              Approved
            </div>
          </div>

          {/* SIGNATURE BLOCK */}
          <div className="w-full max-w-md text-center">
            <div className="mb-4">
              <p className="font-playfair text-3xl italic text-[#0F172A]">Bolu Adeoye</p>
              <div className="w-full h-px bg-slate-300 mt-2"></div>
            </div>
            <p className="font-inter text-[10px] font-black text-[#0F172A] uppercase tracking-widest">Bolu Adeoye, Lead Architect</p>
            <p className="font-inter text-[8px] font-bold text-[#DC2626] uppercase tracking-widest mt-1">Titanium Digital // TD-CORE</p>
          </div>

          {/* CRYPTOGRAPHIC FOOTER */}
          <footer className="absolute bottom-[20mm] w-full px-[40mm] flex justify-between items-end">
            <div className="flex items-center gap-3">
              <Fingerprint size={24} className="text-slate-300" />
              <div>
                <p className="font-mono text-[6px] text-slate-400 uppercase tracking-widest">System Hash</p>
                <p className="font-mono text-[7px] text-slate-500">SHA256: 8f3c9a2b...e4d1f0b9</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Issue Date</p>
              <p className="font-mono text-[10px] font-black text-[#0F172A]">13.03.2026</p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
