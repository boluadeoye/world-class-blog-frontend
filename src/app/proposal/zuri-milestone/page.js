"use client";
import { useState, useEffect } from "react";
import { 
  Download, ShieldCheck, CheckCircle2, Lock, Scale, 
  FileText, Building2, Server, WifiOff, Clock, 
  AlertTriangle, Cpu, Globe, PenTool, Fingerprint,
  Sparkles, Key, Hotel, Utensils, Database, Layers,
  Receipt, Coins, Percent, ArrowRight, Check
} from "lucide-react";
import Link from "next/link";

const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788790816/blog_assets/hiyhsdkblezih5vdzxdy.png";

// Hoisted Subcomponents
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#071D3D] pb-2 mb-3 relative z-10">
      <div className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Eden Studios" className="h-6 object-contain" />
        <span className="font-inter text-[9.5px] font-black uppercase tracking-[0.2em] text-[#071D3D]">
          Eden Studios // Milestone Handover &amp; Verification
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9px]">
        <span className="text-slate-500 font-bold">ZURI-M1-SIGN-OFF-2026</span>
        <span className="font-black text-[#071D3D] bg-slate-100 px-2 py-0.5 rounded">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t-2 border-slate-200 text-[#000000] font-mono text-[8px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span className="font-bold">OFFICIAL MILESTONE 1 VERIFICATION &amp; PHASE 2 INDUCTION</span>
      <div className="flex items-center gap-2">
        <span className="text-[#F95700] font-black">ZURI HOSPITALITY OS</span>
        <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
      </div>
    </footer>
  );
}

function Watermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none z-0">
      <img src={logoUrl} alt="Watermark" className="w-[180mm] h-[180mm] object-contain grayscale" />
    </div>
  );
}

export default function ZuriMilestoneReport() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Zuri_Phase1_Completion_Report_and_Phase2_Charter";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-orange-100 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0; 
          }
          body { 
            background-color: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #report-render, #report-render * { visibility: visible; }
          #report-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            background: #FFFFFF; 
          }
          .a4-page { 
            height: 297mm; 
            width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF !important; 
            box-sizing: border-box; 
            overflow: hidden; 
            display: flex; 
            flex-direction: column; 
            padding: 16mm 18mm 14mm 18mm; 
          }
          .no-print { display: none !important; }
        }
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#F95700]">
          <div className="w-20 h-20 mx-auto mb-6 bg-orange-50 border-2 border-orange-200 rounded-2xl flex items-center justify-center p-3 shadow-sm">
            <CheckCircle2 size={40} className="text-[#F95700]" />
          </div>

          <h1 className="font-display text-2xl font-black text-[#071D3D] mb-1 uppercase">Zuri Hospitality OS</h1>
          <p className="font-inter text-[#F95700] text-xs font-black uppercase tracking-widest mb-8">Phase 1 Completion &amp; Phase 2 Roadmap</p>

          {isReady ? (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#071D3D] hover:bg-slate-900 text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download Completion Report (PDF)</span>
            </button>
          ) : (
            <p className="text-slate-500 font-mono text-xs animate-pulse">Compiling Completion Dossier...</p>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="report-render" className="hidden print:block text-[#000000]">
        
        {/* ========================================================= */}
        {/* PAGE 1: EXECUTIVE BRIEF & MILESTONE 1 CERTIFICATE         */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="01" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={logoUrl} alt="Logo" className="h-10 object-contain" />
                <div className="h-7 w-[2px] bg-[#071D3D]"></div>
                <div>
                  <span className="bg-[#10B981] text-white px-2.5 py-0.5 text-[8.5px] font-mono font-black uppercase tracking-widest rounded">
                    Milestone 1 Certified &bull; 100% Completed
                  </span>
                  <p className="font-mono text-[8.5px] font-bold text-[#F95700] mt-0.5">Ref: ZURI-M1-SIGN-OFF-2026</p>
                </div>
              </div>

              <h1 className="font-display text-3xl font-black text-[#071D3D] uppercase tracking-tight leading-[1.1] mb-1">
                Phase 1 Completion Report<br/>
                <span className="text-[#F95700]">&amp; Phase 2 Operational Charter</span>
              </h1>
              <p className="font-mono text-[9.5px] font-black text-[#071D3D] tracking-wide">
                PROJECT: ZURI POINT OF SALES HUB &bull; SYSTEM FOUNDATION &amp; IDENTITY STAGE SIGN-OFF
              </p>
              <div className="h-1 w-24 bg-[#F95700] my-2.5"></div>
            </div>

            {/* EXECUTIVE HANDOVER STATEMENT */}
            <div className="border-2 border-[#071D3D] rounded-xl p-4 bg-slate-50">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2 mb-2">
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#10B981]" /> Executive Handover Notice
                </h3>
                <span className="font-mono text-[9px] font-bold text-slate-500">Date: {currentDate}</span>
              </div>
              <p className="font-inter text-[12px] font-semibold leading-[1.7] text-[#000000] text-justify">
                This document serves as the official **Phase 1 Completion Report** for the Zuri Hospitality Operating System. Eden Studios Engineering Group has successfully designed, architected, and validated the foundational infrastructure of the platform. All modules specified under Phase 1 are fully functional, stress-tested, and certified ready for executive live walkthrough.
              </p>
            </div>

            {/* HIGH-LEVEL VERIFICATION MATRIX */}
            <div className="border-2 border-slate-300 bg-white p-3.5 rounded-xl space-y-2">
              <p className="font-mono text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">
                Phase 1 Delivery Status Summary
              </p>
              
              <div className="grid grid-cols-2 gap-2.5 font-inter text-[11px]">
                <div className="border border-emerald-300 bg-emerald-50/50 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="font-bold text-[#071D3D]">1. Security &amp; Identity (Auth &amp; PIN)</span>
                  <span className="font-mono text-[9px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check size={12} strokeWidth={3}/> VERIFIED
                  </span>
                </div>

                <div className="border border-emerald-300 bg-emerald-50/50 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="font-bold text-[#071D3D]">2. Lodging, Rooms &amp; Tape Chart</span>
                  <span className="font-mono text-[9px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check size={12} strokeWidth={3}/> VERIFIED
                  </span>
                </div>

                <div className="border border-emerald-300 bg-emerald-50/50 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="font-bold text-[#071D3D]">3. Revenue &amp; Recipe BOM Engine</span>
                  <span className="font-mono text-[9px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check size={12} strokeWidth={3}/> VERIFIED
                  </span>
                </div>

                <div className="border border-emerald-300 bg-emerald-50/50 p-2.5 rounded-lg flex items-center justify-between">
                  <span className="font-bold text-[#071D3D]">4. UI/UX Fidelity &amp; Kinetic Telemetry</span>
                  <span className="font-mono text-[9px] font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check size={12} strokeWidth={3}/> VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* CONTRACTUAL MILESTONE 1 DISBURSEMENT BOX */}
            <div className="border-2 border-[#10B981] bg-emerald-50/70 p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-black text-emerald-950 uppercase tracking-wider">
                  Contractual Milestone 1 Disbursement Trigger
                </p>
                <p className="font-inter text-[10.5px] font-semibold text-emerald-900 mt-0.5">
                  Pursuant to ratified SOW ZURI-SOW-ADDENDUM-2026-V1, Phase 1 sign-off formally authorizes the release of Milestone 1.
                </p>
              </div>
              <div className="text-right shrink-0 pl-4">
                <span className="font-mono text-2xl font-black text-[#071D3D]">₦400,000</span>
                <span className="block font-mono text-[8.5px] font-bold text-emerald-800 uppercase">40% Tranche 1 Release</span>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 2: DETAILED PHASE 1 AUDIT (MODULES 1 & 2)            */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="02" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#F95700] uppercase tracking-widest">Section 01 // Completed Architecture</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-1">
                Phase 1 Execution Audit: Foundation &amp; Lodging
              </h2>
              <p className="font-inter text-xs font-semibold text-[#000000] mb-2">
                Detailed verification of completed security protocols and front-desk property management systems.
              </p>
            </div>

            {/* MODULE 1: SECURITY & IDENTITY */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50 space-y-2.5">
              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-1.5">
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                  <Key size={15} className="text-[#F95700]" /> 1. Security &amp; Identity (The Gatekeeper Engine)
                </h3>
                <span className="font-mono text-[8.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  ALL DELIVERABLES CERTIFIED
                </span>
              </div>

              <div className="space-y-2 font-inter text-[11.5px] font-semibold text-[#000000]">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Branded Authentication:</strong> Full enterprise login and signup system supporting secure email/password hashing and one-tap Google OAuth.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Clinical OTP Verification:</strong> Seamless email OTP verification flow that automatically routes authenticated users directly to their dashboard upon activation.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Staff 4-Digit PIN Kernel:</strong> Rapid-entry POS keypad enabling bartenders and waiters to unlock terminals in 1 second without full passwords.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Multi-Property Vault Isolation:</strong> Kernel-level multi-tenancy. Multiple hotels operate under one account while keeping guests, money, and rooms in isolated vaults.
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 2: FRONT OFFICE & ROOMS */}
            <div className="border-2 border-slate-300 rounded-xl p-3.5 bg-white space-y-2.5">
              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-1.5">
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                  <Hotel size={15} className="text-[#0052CC]" /> 2. Front Office &amp; Room Management
                </h3>
                <span className="font-mono text-[8.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  ALL DELIVERABLES CERTIFIED
                </span>
              </div>

              <div className="space-y-2 font-inter text-[11.5px] font-semibold text-[#000000]">
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Room Categories &amp; Master Pricing:</strong> Categorization engine grouping rooms by tier (Luxury, Executive Suite) with centralized master rate control.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Smart Bulk Room Generator:</strong> Instant floor construction using Prefix logic (Floor 1 + Prefix 1 = Rooms 101–110) matching physical property door numbers.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Housekeeping Live Tracker:</strong> Real-time color badges (Green for Clean, Amber for Cleaning, Red for Maintenance) showing front desk sellable inventory.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">30-Day Visual Tape Chart:</strong> Interactive reservation calendar rendering guest stays as horizontal bars, completely eliminating double-bookings.
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 3: REVENUE ENGINE & DESIGN FIDELITY                  */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="03" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#F95700] uppercase tracking-widest">Section 02 // Operations &amp; UI Fidelity</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-1">
                Phase 1 Execution Audit: Revenue &amp; UI Performance
              </h2>
              <p className="font-inter text-xs font-semibold text-[#000000] mb-2">
                Verification of the restaurant/bar touch interface, recipe costing, and interface responsiveness.
              </p>
            </div>

            {/* MODULE 3: REVENUE & ANTI-THEFT */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50 space-y-2.5">
              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-1.5">
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                  <Utensils size={15} className="text-[#F95700]" /> 3. The Revenue &amp; Anti-Theft Engine
                </h3>
                <span className="font-mono text-[8.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  ALL DELIVERABLES CERTIFIED
                </span>
              </div>

              <div className="space-y-2 font-inter text-[11.5px] font-semibold text-[#000000]">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Category-First POS Interface:</strong> Following the PRD specification exactly, the terminal presents prominent "Category Boxes" first. Cashiers tap categories to filter items rapidly.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Recipe BOM (Bill of Materials):</strong> Connected menu sales directly to inventory stock. The system automatically tracks exact milliliters and grams of raw ingredients (e.g., Brandy, Rum, Meats) used per order.
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 4: DESIGN & PERFORMANCE */}
            <div className="border-2 border-slate-300 rounded-xl p-3.5 bg-white space-y-2.5">
              <div className="flex justify-between items-center border-b-2 border-slate-200 pb-1.5">
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-1.5">
                  <Sparkles size={15} className="text-[#D4AF37]" /> 4. Design Fidelity &amp; System Performance
                </h3>
                <span className="font-mono text-[8.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  ALL DELIVERABLES CERTIFIED
                </span>
              </div>

              <div className="space-y-2 font-inter text-[11.5px] font-semibold text-[#000000]">
                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Absolute 1:1 Design Fidelity:</strong> Cleanly integrated the verified Zuri Orange (<span className="font-mono text-[#F95700]">#F95700</span>) and Cream Canvas palette for a catchy, high-end visual tone.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Kinetic Rolling Telemetry:</strong> Dashboard features live animated numbers for revenue and occupancy calculations, providing immediate executive feedback as data updates.
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071D3D]">Desktop-Grade Physics:</strong> Engineered with subpixel smooth-scrolling and micro-transitions, delivering native software responsiveness on web browsers.
                  </div>
                </div>
              </div>
            </div>

            {/* DEMONSTRATION NOTICE */}
            <div className="bg-[#071D3D] text-white p-3.5 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-bold text-[#F95700] uppercase tracking-wider">Live Staging Walkthrough</p>
                <p className="font-inter text-[10.5px] text-slate-200 mt-0.5">All 4 foundation modules above are live, fully functional, and ready for executive demonstration.</p>
              </div>
              <span className="bg-[#10B981] text-white px-2.5 py-1 text-[8.5px] font-mono uppercase font-black rounded">
                DEMO READY
              </span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 4: PHASE 2 SCOPE & FORMAL SIGN-OFF                   */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="04" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9.5px] font-black text-[#F95700] uppercase tracking-widest">Section 03 // Next Phase Initiation</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-1">
                Phase 2 Operational Charter: The Revenue Engine
              </h2>
              <p className="font-inter text-xs font-semibold text-[#000000] mb-2">
                With the core foundation verified and locked, development transitions into the active transaction engine.
              </p>
            </div>

            {/* PHASE 2 DELIVERABLES MATRIX */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50 space-y-2">
              <p className="font-mono text-[9px] font-black uppercase text-[#071D3D] tracking-widest mb-1">
                Upcoming Phase 2 Engineering Workstream
              </p>

              <div className="grid grid-cols-2 gap-2.5 font-inter text-[11px]">
                <div className="border-2 border-slate-300 bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 font-bold text-[#071D3D] mb-1">
                    <WifiOff size={14} className="text-blue-700" /> 1. Offline Mesh Continuity
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Engineering local-first Wi-Fi sync so cashier terminals continue billing and printing tickets with zero internet connection.
                  </p>
                </div>

                <div className="border-2 border-slate-300 bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 font-bold text-[#071D3D] mb-1">
                    <Percent size={14} className="text-[#F95700]" /> 2. The Inclusive/Exclusive VAT Switch
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Configurable tax engine allowing properties to toggle between tax-inclusive retail pricing and tax-exclusive commercial invoices.
                  </p>
                </div>

                <div className="border-2 border-slate-300 bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 font-bold text-[#071D3D] mb-1">
                    <Receipt size={14} className="text-emerald-700" /> 3. Storekeeper Stock Receipts (GRN)
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Formal goods received logging tracking procurement costs, supplier balances, and verifying new stock before shelf intake.
                  </p>
                </div>

                <div className="border-2 border-slate-300 bg-white p-3 rounded-lg">
                  <div className="flex items-center gap-1.5 font-bold text-[#071D3D] mb-1">
                    <Coins size={14} className="text-purple-700" /> 4. Dedicated Loyalty Wallet
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">
                    Decoupled reward architecture separating accumulated loyalty reward points from instant promotional percentage discounts.
                  </p>
                </div>
              </div>
            </div>

            {/* MILESTONE 1 RATIFICATION ATTESTATION */}
            <div className="border-2 border-emerald-500 bg-emerald-50 p-3 rounded-xl">
              <p className="font-mono text-[9px] font-black uppercase text-emerald-900 tracking-wider">
                Formal Milestone 1 Sign-Off &amp; Payment Release
              </p>
              <p className="font-inter text-[11px] font-semibold text-emerald-950 mt-0.5 leading-relaxed">
                By executing below, the Client formally certifies that Phase 1 deliverables have been inspected, tested, and accepted, authorizing the disbursement of **Milestone 1 (40% &bull; ₦400,000)** pursuant to the ratified contract.
              </p>
            </div>

            {/* FORMAL SIGNING BLANKS (NO PRE-SIGNED NAMES) */}
            <div className="grid grid-cols-2 gap-4">
              {/* SERVICE PROVIDER */}
              <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl font-inter text-[10.5px]">
                <span className="font-mono text-[8px] uppercase text-slate-500 font-bold block">For: Service Provider</span>
                <p className="font-bold text-[#071D3D] text-xs uppercase mt-0.5">Eden Studios Engineering Group</p>
                <p className="text-[9.5px] font-semibold text-slate-700">Rep: Mr. Owoniyi Marvellous (Lead Director)</p>
                
                <div className="mt-4 space-y-2 font-mono text-[8.5px] text-[#000000]">
                  <div>
                    <span className="text-slate-500 uppercase block">Authorized Signature:</span>
                    <p className="text-slate-400 font-bold">____________________________________</p>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block">Execution Date:</span>
                    <p className="text-slate-400 font-bold">________________________</p>
                  </div>
                </div>
              </div>

              {/* CLIENT */}
              <div className="border-2 border-[#071D3D] bg-white p-3.5 rounded-xl font-inter text-[10.5px]">
                <span className="font-mono text-[8px] uppercase text-[#F95700] font-bold block">For: Client Organization</span>
                <p className="font-bold text-[#071D3D] text-xs uppercase mt-0.5">Zuri Point of Sales Hub</p>
                <p className="text-[9.5px] font-semibold text-slate-700">Rep: Mrs. Taiwo Abolanle Olatinsu (Executive)</p>
                
                <div className="mt-4 space-y-2 font-mono text-[8.5px] text-[#000000]">
                  <div>
                    <span className="text-slate-500 uppercase block">Authorized Acceptance:</span>
                    <p className="text-slate-400 font-bold">____________________________________</p>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block">Execution Date:</span>
                    <p className="text-slate-400 font-bold">________________________</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

      </div>
    </div>
  );
}
