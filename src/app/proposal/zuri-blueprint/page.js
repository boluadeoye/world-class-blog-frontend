"use client";
import React, { useState, useEffect } from "react";
import { 
  Download, Printer, Layers, Server, Database, WifiOff, 
  Wifi, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, 
  FileText, Phone, MapPin, Building, Sliders, Lock
} from "lucide-react";

export default function ZuriArchitecturalBlueprint() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ZURI_POS_HUB_ARCHITECTURAL_BLUEPRINT_ZP-ARCH-WFB-002";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-100 selection:bg-slate-300 selection:text-slate-900">
      
      {/* GOOGLE FONTS INJECTION: PLUS JAKARTA SANS & JETBRAINS MONO */}
      <link 
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
        rel="stylesheet" 
      />

      {/* GLOBAL PRINT RESETS & LANDSCAPE ENFORCEMENT */}
      <style jsx global>{`
        @media print {
          @page {
            size: 297mm 210mm landscape;
            margin: 0;
          }
          body {
            background-color: #FFFFFF !important;
            color: #0F172A !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #print-blueprint, #print-blueprint * {
            visibility: visible;
          }
          #print-blueprint {
            position: absolute;
            left: 0;
            top: 0;
            width: 297mm;
            margin: 0;
            padding: 0;
            background: #FFFFFF;
          }
          .landscape-page {
            width: 297mm !important;
            height: 210mm !important;
            max-width: 297mm !important;
            max-height: 210mm !important;
            min-width: 297mm !important;
            min-height: 210mm !important;
            page-break-after: always;
            break-after: page;
            box-sizing: border-box;
            overflow: hidden;
            background-color: #FFFFFF;
            padding: 12mm 16mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .no-print {
            display: none !important;
          }
        }

        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        
        /* MONOCHROME 8-TIER COLOR CLASSES */
        .bg-color-000 { background-color: #FFFFFF; }
        .bg-color-050 { background-color: #F8FAFC; }
        .bg-color-100 { background-color: #F1F5F9; }
        .border-color-200 { border-color: #E2E8F0; }
        .border-color-300 { border-color: #CBD5E1; }
        .text-color-400 { color: #94A3B8; }
        .text-color-600 { color: #475569; }
        .text-color-900 { color: #0F172A; }
        .bg-color-900 { background-color: #0F172A; }
      `}</style>

      {/* VIEW A: OBSIDIAN CONTROL PORTAL (SCREEN VIEW) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1E293B_0%,#0F172A_100%)] opacity-80" />
        
        <div className="relative z-10 w-full max-w-xl bg-slate-900/90 border border-slate-700 rounded-xl p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-100">
                <Layers size={20} />
              </div>
              <div>
                <h1 className="font-jakarta text-lg font-bold tracking-tight text-white">Zuri POS Hub // System Canvas</h1>
                <p className="font-mono-data text-[11px] text-slate-400">DOC-ID: ZP-ARCH-WFB-002 • REV: PRODUCTION MASTER</p>
              </div>
            </div>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded text-[10px] font-mono-data border border-slate-700">A4 LANDSCAPE</span>
          </div>

          <div className="space-y-3 mb-8 text-xs text-slate-300 font-jakarta leading-relaxed">
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Matrix Standard:</span>
              <span className="font-mono-data text-white font-medium">60/40 Landscape Split (58.5% UI / 39% Ledger)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Total Output:</span>
              <span className="font-mono-data text-white font-medium">7 Physical Landscape Canvas Sheets</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Palette Model:</span>
              <span className="font-mono-data text-white font-medium">8-Tier Pure Grayscale (Zero Saturation)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Target Resolution:</span>
              <span className="font-mono-data text-white font-medium">1440 × 810 Base Canvas (297mm × 210mm DIN)</span>
            </div>
          </div>

          <button
            onClick={handlePrint}
            disabled={!isReady}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-jakarta font-bold py-3.5 px-6 rounded-lg transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Printer size={18} />
            <span>Generate Landscape Architectural Vector PDF</span>
          </button>
        </div>
      </div>

      {/* VIEW B: 7-PAGE LANDSCAPE BLUEPRINT CONTAINER */}
      <div id="print-blueprint" className="hidden print:block font-jakarta text-color-900 bg-color-000">

        {/* ========================================================================= */}
        {/* PAGE 1: COVER, ARCHITECTURAL METADATA & GRID SPECIFICATION               */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border border-color-200 bg-color-050 p-4 rounded-[6px] mb-4">
                  <span className="font-mono-data text-[8pt] text-color-600 block tracking-wide">
                    SYSTEM DELIVERABLE: PRODUCT 1 (PUBLIC SAAS MARKETING ENGINE &amp; REGIONAL AUTHORITY GATEWAY)
                  </span>
                  <h1 className="font-jakarta text-[18pt] font-extrabold text-color-900 tracking-tight mt-1 mb-1">
                    ZURI POS HUB — ARCHITECTURAL WIREFRAME BLUEPRINT &amp; LEDGER
                  </h1>
                  <p className="text-[8.5pt] text-color-600 leading-normal">
                    Operational Target: Multi-Property Hospitality Operating System (Hotels, Resorts, Lounges, Serviced Apartments). Master Synthesized Release.
                  </p>
                </div>

                <div className="border border-color-200 p-4 rounded-[6px] mb-4 bg-color-000">
                  <span className="font-mono-data text-[7.5pt] font-bold text-color-900 block mb-2 uppercase tracking-wider">
                    [GRID-SPECIFICATION-SCHEMATIC: 12 Desktop Columns / 8px Baseline Unit]
                  </span>
                  <div className="grid grid-cols-12 gap-1.5 text-center mb-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="bg-color-100 border border-color-300 py-2 rounded-[4px]">
                        <span className="font-mono-data text-[6.5pt] font-semibold text-color-600">
                          C{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-mono-data text-[7pt] text-color-400 border-t border-color-200 pt-2">
                    <span>Column Width: 96px</span>
                    <span>Gutter: 24px</span>
                    <span>Left Margin: 60px</span>
                    <span>Right Margin: 60px</span>
                  </div>
                </div>

                <div className="border border-color-200 p-3 rounded-[6px] mb-4 bg-color-050">
                  <span className="font-mono-data text-[7.5pt] font-bold text-color-900 block mb-2 uppercase tracking-wider">
                    [SPATIAL-SCALE-PRIMITIVES: 8px Incremental Scale System]
                  </span>
                  <div className="flex items-center gap-2 font-mono-data text-[7pt] text-color-600">
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Micro: 4px</span>
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Compact: 8px</span>
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Standard: 16px</span>
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Relaxed: 24px</span>
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Macro: 32px</span>
                    <span className="border border-color-300 bg-color-000 px-2 py-1 rounded-[4px]">Structural: 48px/64px</span>
                  </div>
                </div>
              </div>

              <div className="border border-color-300 p-3 rounded-[6px]">
                <span className="font-mono-data text-[7pt] text-color-400 block mb-1 uppercase tracking-wider">
                  [TYPOGRAPHY-SCALE-SPECIMEN-BLOCK]
                </span>
                <p className="font-jakarta text-[10pt] font-bold text-color-900 leading-tight mb-1">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789
                </p>
                <span className="font-mono-data text-[7pt] text-color-600 block">
                  Primary: Plus Jakarta Sans (Optical 12pt–56pt) | Numeric/Ledger: JetBrains Mono (Tabular Numerals Enabled)
                </span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 01 // ARCHITECTURAL METADATA</h2>
                </div>

                <div className="space-y-3 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: DOC-ID</span>
                      <span>System Identification</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      System Identification: ZP-ARCH-WFB-002. Production Master Release for Zuri Tech Ltd. Developer identity scrubbed 100%. Authority guaranteed.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: CANVAS-01</span>
                      <span>Viewport Mechanics</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Baseline 1440px desktop breakpoint layout with horizontal scroll locked (<code className="font-mono-data text-[7pt]">overflow-x: hidden</code>). Fluid vertical canvas.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: GRID-12</span>
                      <span>Responsive Matrix</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed mb-1">
                      12-column layout grid using 96px columns separated by 24px gutters:
                    </p>
                    <ul className="list-disc pl-3 text-color-600 font-sans text-[7pt] space-y-0.5">
                      <li><strong>Desktop Ultra:</strong> 1440px+ (Locked container width: 1320px).</li>
                      <li><strong>Laptop Standard:</strong> 1024px to 1439px (16px gutters, container: 960px).</li>
                      <li><strong>Tablet Landscape:</strong> 768px to 1023px (8-col collapsed, 12px gutters).</li>
                      <li><strong>Mobile Viewport:</strong> 390px to 767px (4-col stacked, 8px gutters).</li>
                    </ul>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: TYPO-MET</span>
                      <span>Dual-Font Metrics</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      1. Plus Jakarta Sans: Optical sizes 12pt to 56pt. Geometrically balanced apertures.<br />
                      2. JetBrains Mono: Tabular figures strictly enforced (<code className="font-mono-data text-[7pt]">font-variant-numeric: tabular-nums</code>).
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 1 OF 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 2: PERSISTENT NAVIGATION & HERO CONVERSION CANVAS                    */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                {/* NAV WIREFRAME */}
                <div className="border border-color-300 rounded-[6px] p-2.5 mb-4 bg-color-050 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-color-900 rounded-[4px] flex items-center justify-center text-color-000 font-bold text-[8pt]">Z</div>
                    <span className="font-jakarta text-[8pt] font-extrabold text-color-900 tracking-tight">ZURI POS HUB</span>
                  </div>
                  <div className="flex items-center gap-3 font-jakarta text-[7.5pt] text-color-600">
                    <span className="border-b border-color-900 font-semibold text-color-900 pb-0.5">Ecosystem</span>
                    <span>Offline Mesh</span>
                    <span>Save Calculator</span>
                    <span>Trust &amp; Legal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="border border-color-300 px-2 py-1 rounded-[4px] text-[7pt] font-medium text-color-600">Client Login</span>
                    <span className="bg-color-900 text-color-000 px-2 py-1 rounded-[4px] text-[7pt] font-bold">Request Access</span>
                  </div>
                </div>

                {/* HERO COPY WIREFRAME */}
                <div className="mb-4">
                  <div className="inline-block border border-color-300 bg-color-100 px-2.5 py-0.5 rounded-[4px] text-[7pt] font-mono-data text-color-600 mb-2">
                    ENTERPRISE HOSPITALITY OS // NIGERIAN EDITION
                  </div>
                  <h2 className="font-jakarta text-[16pt] font-extrabold text-color-900 leading-tight tracking-tight mb-2">
                    Run Unlimited Hotel Rooms at Zero Back-Office Cost.<br />
                    Pay Exclusively for Active Cashier POS Terminals.
                  </h2>
                  <p className="font-jakarta text-[8pt] text-color-600 leading-relaxed mb-3">
                    Complete property management, housekeeping, and front-desk booking: 100% Free (₦0). Pay monthly licensing fees ONLY when a physical cashier terminal processes money. Operates 100% locally when fiber and Starlink cut out.
                  </p>
                  
                  {/* CTA BUTTONS */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-color-900 text-color-000 px-4 py-2 rounded-[6px] text-[8pt] font-bold flex items-center gap-2">
                      <span>Configure Hardware Investment</span>
                      <ArrowRight size={12} />
                    </div>
                    <div className="border border-color-900 text-color-900 px-4 py-2 rounded-[6px] text-[8pt] font-semibold">
                      Request Physical Deployment
                    </div>
                  </div>
                </div>

                {/* MULTI-PROPERTY SWITCHER PREVIEW */}
                <div className="border border-color-200 rounded-[6px] p-3 bg-color-050">
                  <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-color-200">
                    <span className="font-mono-data text-[7pt] font-bold text-color-600 uppercase">
                      Multi-Property Switch Engine:
                    </span>
                    <div className="flex gap-1.5 font-mono-data text-[6.5pt]">
                      <span className="bg-color-900 text-color-000 px-1.5 py-0.5 rounded-[3px]">SW-01: VI Lagos (45 Rms)</span>
                      <span className="border border-color-300 bg-color-000 text-color-600 px-1.5 py-0.5 rounded-[3px]">SW-02: Abuja (20 Rms)</span>
                      <span className="border border-color-300 bg-color-000 text-color-600 px-1.5 py-0.5 rounded-[3px]">SW-03: Consolidated</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-color-200 bg-color-000 p-2 rounded-[4px]">
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-1">PV-PMS: Tape Chart</span>
                      <p className="font-jakarta text-[7.5pt] font-bold text-color-900">Room 101: Checked-In</p>
                      <span className="font-mono-data text-[6.5pt] text-color-600 block mt-1">[TEST-DRIVE: 1-Click Swap]</span>
                    </div>
                    <div className="border border-color-200 bg-color-000 p-2 rounded-[4px]">
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-1">PV-POS: Touch Grid</span>
                      <p className="font-jakarta text-[7.5pt] font-bold text-color-900">Beers &amp; Grills Matrix</p>
                      <span className="font-mono-data text-[6.5pt] text-color-600 block mt-1">Active Total: ₦18,300</span>
                    </div>
                    <div className="border border-color-200 bg-color-000 p-2 rounded-[4px]">
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-1">PV-KDS: Kitchen SLA</span>
                      <p className="font-jakarta text-[7.5pt] font-bold text-color-900">Ticket #104: 00:04:12</p>
                      <span className="font-mono-data text-[6.5pt] text-color-600 block mt-1">Color SLA: Normal (Gray)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>COMPONENT: HERO-STAGE-01</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 02 // HERO STAGE &amp; CONVERSION</h2>
                </div>

                <div className="space-y-2.5 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: L-01</span>
                      <span>Brand Mark Anchor</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Vector SVG mark + Text: "ZURI POS HUB". Clicking resets viewport to scroll top (Y=0).
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: NAV-01:04</span>
                      <span>Smooth Scroll Anchors</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Anchor tags bound to page landmarks: <code className="font-mono-data text-[7pt]">#ecosystem</code>, <code className="font-mono-data text-[7pt]">#offline</code>, <code className="font-mono-data text-[7pt]">#calculator</code>, <code className="font-mono-data text-[7pt]">#trust</code>.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: BTN-01</span>
                      <span>Client Login Authentication</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Direct cross-domain authentication router. URL: <code className="font-mono-data text-[6.5pt]">app.zuripos.com/auth/login</code>. Cross-origin session isolation. Zero marketing cookie leakage.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: SW-01:03</span>
                      <span>Multi-Property State Controller</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      • <strong>SW-01 (VI Lagos):</strong> 45 rooms, local NGN currency, 98% occupancy.<br />
                      • <strong>SW-02 (Abuja):</strong> 20 rooms, 74% occupancy.<br />
                      • <strong>SW-03 (Group):</strong> Consolidated metrics (65 rooms, ₦14.2M gross monthly turnover).
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: LT-01</span>
                      <span>Logic Trail Connector</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Manhattan dashed vector (4pt dash / 4pt gap) connecting [BTN-CALC] to Page 5 Interactive Investment Calculator (<code className="font-mono-data text-[7pt]">#calculator</code>).
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 2 OF 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 3: DEEP-DIVE ECOSYSTEM PROOF (PMS, POS, KDS)                        */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border-b border-color-200 pb-2 mb-3">
                  <span className="font-mono-data text-[7.5pt] text-color-400 uppercase tracking-wider block">MODULE 3A // CORE ARCHITECTURE</span>
                  <h2 className="font-jakarta text-[12pt] font-extrabold text-color-900">
                    ZuriPMS: Zero-Cost Core Property Management System
                  </h2>
                  <p className="text-[7.5pt] text-color-600">
                    Unlimited Rooms, Unlimited Guest Histories, Zero Software Subscription Costs.
                  </p>
                </div>

                {/* 30-DAY TAPE CHART GRID WIREFRAME */}
                <div className="border border-color-300 rounded-[6px] p-2.5 mb-3 bg-color-000">
                  <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1.5">
                    [TAPE-CHART-GRID: 30-Day Room Assignment Matrix]
                  </span>
                  <div className="space-y-1 font-mono-data text-[6.5pt]">
                    <div className="grid grid-cols-10 gap-1 border-b border-color-200 pb-1 text-color-400 font-semibold">
                      <span className="col-span-2">Room / Type</span>
                      <span>D01</span><span>D02</span><span>D03</span><span>D04</span><span>D05</span><span>D06</span><span>D07</span><span>D08</span>
                    </div>
                    <div className="grid grid-cols-10 gap-1 items-center py-1 border-b border-color-100">
                      <span className="col-span-2 font-bold text-color-900">101 (Deluxe)</span>
                      <div className="col-span-5 bg-color-900 text-color-000 rounded-[3px] px-1 py-0.5 truncate text-center">
                        Mr. Adeleke (Checked-In)
                      </div>
                      <span className="col-span-1 text-center text-color-400">--</span>
                      <div className="col-span-2 bg-color-300 text-color-900 rounded-[3px] px-1 py-0.5 truncate text-center">
                        Okonjo
                      </div>
                    </div>
                    <div className="grid grid-cols-10 gap-1 items-center py-1 border-b border-color-100">
                      <span className="col-span-2 font-bold text-color-900">102 (Deluxe)</span>
                      <span className="col-span-2 text-center text-color-400">--</span>
                      <div className="col-span-6 bg-color-600 text-color-000 rounded-[3px] px-1 py-0.5 truncate text-center">
                        Block: Al-Hassan (Guaranteed Booking)
                      </div>
                    </div>
                    <div className="grid grid-cols-10 gap-1 items-center py-1">
                      <span className="col-span-2 font-bold text-color-900">103 (Suite)</span>
                      <div className="col-span-4 bg-color-100 border border-color-300 text-color-600 rounded-[3px] px-1 py-0.5 truncate text-center">
                        OOO: Maintenance-AC
                      </div>
                      <span className="col-span-2 text-center text-color-400">--</span>
                      <div className="col-span-2 bg-color-300 text-color-900 rounded-[3px] px-1 py-0.5 truncate text-center">
                        Danjuma
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7-STATE HOUSEKEEPING LIFECYCLE */}
                <div className="border border-color-200 bg-color-050 rounded-[6px] p-2.5 mb-3">
                  <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">
                    [HOUSEKEEPING-LIFE-CYCLE: 7-State Engine Indicators]
                  </span>
                  <div className="flex items-center gap-1 font-mono-data text-[6.5pt] flex-wrap mb-1.5">
                    <span className="bg-color-900 text-color-000 px-1.5 py-0.5 rounded-[3px]">S1: CLEAN</span>
                    <span>&rarr;</span>
                    <span className="bg-color-600 text-color-000 px-1.5 py-0.5 rounded-[3px]">S2: DIRTY</span>
                    <span>&rarr;</span>
                    <span className="border border-color-900 font-bold px-1.5 py-0.5 rounded-[3px]">S3: INSPECTED</span>
                    <span>&rarr;</span>
                    <span className="bg-color-100 text-color-600 px-1.5 py-0.5 rounded-[3px]">S4: OOO</span>
                    <span>&rarr;</span>
                    <span className="bg-color-100 text-color-600 px-1.5 py-0.5 rounded-[3px]">S5: MAINT</span>
                    <span>&rarr;</span>
                    <span className="bg-color-100 text-color-600 px-1.5 py-0.5 rounded-[3px]">S6: TURN-DOWN</span>
                    <span>&rarr;</span>
                    <span className="bg-color-300 text-color-900 px-1.5 py-0.5 rounded-[3px]">S7: OCCUPIED</span>
                  </div>
                  <p className="font-jakarta text-[7pt] text-color-600">
                    Real-time Room 204 Status: "DIRTY" &bull; Supervisor Override Action: <span className="underline font-bold text-color-900">Mark "INSPECTED" with PIN</span>
                  </p>
                </div>

                {/* SPLIT FRONTLINE: POS TOUCH GRID & KDS KITCHEN */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-color-300 p-2.5 rounded-[6px] bg-color-000">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">3B: ZuriPOS Frontline Cashier</span>
                    <div className="grid grid-cols-3 gap-1 font-mono-data text-[6.5pt] mb-2">
                      <span className="border border-color-200 p-1 rounded text-center">Chapman<br />₦4,500</span>
                      <span className="border border-color-200 p-1 rounded text-center">Star<br />₦1,800</span>
                      <span className="border border-color-200 p-1 rounded text-center">Catfish<br />₦12,000</span>
                    </div>
                    <div className="bg-color-050 border-l-2 border-color-900 p-1.5 text-[6.5pt] text-color-600">
                      <strong>Blind Shift Drop:</strong> Cashier counts cash blindly at shift close without system hints.
                    </div>
                  </div>

                  <div className="border border-color-300 p-2.5 rounded-[6px] bg-color-000">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono-data text-[7pt] font-bold text-color-900">3C: ZuriKDS Kitchen Screen</span>
                      <span className="border border-color-900 px-1 rounded font-mono-data text-[6pt] font-bold text-color-900">WARNING SLA</span>
                    </div>
                    <p className="font-jakarta text-[7pt] font-bold text-color-900 mb-1">Ticket #204: VIP Cabana • 00:09:42</p>
                    <p className="font-jakarta text-[6.5pt] text-color-600 mb-2">1x Grilled Croaker Fish ("Extra Lemon")<br />1x Jollof Rice + Fried Plantain</p>
                    <div className="flex gap-2 font-mono-data text-[6.5pt]">
                      <span className="bg-color-100 border border-color-300 px-2 py-0.5 rounded">START PREP</span>
                      <span className="bg-color-900 text-color-000 px-2 py-0.5 rounded font-bold">BUMP TICKET</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>COMPONENT: ECOSYSTEM-PROOF-02</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 03 // PMS, POS &amp; KDS LOGIC</h2>
                </div>

                <div className="space-y-2.5 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: TAPE-01</span>
                      <span>30-Day Room Assignment Grid</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      • Horizontal axis: 30 rolling calendar days. Vertical axis: Physical property rooms.<br />
                      • Click booking bar: Opens guest folio modal (Ledger, deposits, room transfers).<br />
                      • Constraints: Prevents double-booking overlaps via database row-level exclusion locks.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: HK-SM-01</span>
                      <span>7-State Housekeeping Controller</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      S1: Clean (Ready for check-in) &bull; S2: Dirty (Triggered on checkout) &bull; S3: Inspected (Supervisor PIN override required) &bull; S4: Out of Order (Excluded from RevPAR denominator) &bull; S5: Under Maintenance &bull; S6: Turn-Down &bull; S7: Occupied-Clean.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: BLIND-01</span>
                      <span>Anti-Theft Shift Protocol</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Cashier inputs drawer count blindly at shift closure. System strictly masks expected total. Discrepancies written immutably to audit log.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: KDS-SLA</span>
                      <span>Kitchen Service Timers</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      • &lt; 00:05:00: Normal state (1.0pt gray outline).<br />
                      • 00:05:00 to 00:12:00: Warning (2.0pt solid border + soft audio chime).<br />
                      • &gt; 00:12:00: Critical (Flashing alert border + urgent repeat alarm).
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 3 OF 7</span>
              </div>
            </div>
          </div>
        </div>
        {/* ========================================================================= */}
        {/* PAGE 4: OFFLINE-FIRST HYBRID-MESH ARCHITECTURE                            */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border-b border-color-200 pb-2 mb-3">
                  <span className="font-mono-data text-[7.5pt] text-color-400 uppercase tracking-wider block">MODULE 4 // INFRASTRUCTURE RESILIENCE</span>
                  <h2 className="font-jakarta text-[12pt] font-extrabold text-color-900">
                    Local Air-Gapped Hybrid-Mesh Architecture
                  </h2>
                  <p className="text-[7.5pt] text-color-600">
                    Zero cloud downtime. Property operations persist when fiber, Starlink, and mobile networks cut out completely.
                  </p>
                </div>

                {/* CLOUD TIER */}
                <div className="border border-color-300 p-2 rounded-[6px] bg-color-050 text-center mb-2">
                  <span className="font-mono-data text-[7pt] font-bold text-color-900 block">[CLOUD TIER: AWS / Neon PostgreSQL Cluster]</span>
                  <span className="font-mono-data text-[6.5pt] text-color-600">Global Master Database &amp; Consolidated Group Ledger</span>
                </div>

                {/* SEVERANCE INDICATOR */}
                <div className="flex items-center justify-center gap-2 my-1">
                  <div className="h-[0.5pt] w-16 bg-color-300" />
                  <span className="border border-color-900 bg-color-900 text-color-000 px-2 py-0.5 rounded-[4px] font-mono-data text-[6.5pt] font-bold">
                    [X] INTERNET SEVERANCE: FIBER / STARLINK / MTN CUT OUT
                  </span>
                  <div className="h-[0.5pt] w-16 bg-color-300" />
                </div>

                {/* LOCAL AIR-GAPPED LAN BOX */}
                <div className="border-2 border-color-900 rounded-[6px] p-2.5 bg-color-000 mb-2">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-color-200">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900">
                      [PROPERTY LOCAL AREA NETWORK (LAN) / AIR-GAPPED ROUTER]
                    </span>
                    <span className="font-mono-data text-[6pt] bg-color-100 border border-color-300 px-1.5 py-0.5 rounded text-color-900 font-bold">
                      SUBNET: 192.168.1.0/24
                    </span>
                  </div>

                  {/* ZURI MICRO-EDGE GATEWAY */}
                  <div className="border border-color-900 bg-color-050 p-2 rounded-[4px] mb-2 text-center">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block">
                      [ZURI MICRO-EDGE GATEWAY: Local Station Master Node]
                    </span>
                    <span className="font-mono-data text-[6.5pt] text-color-600 block">
                      Embedded SQLite Write-Ahead Logging (WAL) Mode • In-Memory Guest Ledger &amp; Table State
                    </span>
                  </div>

                  {/* 3 CONNECTED TERMINALS */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="border border-color-300 p-1.5 rounded-[4px] bg-color-050">
                      <span className="font-mono-data text-[6.5pt] font-bold text-color-900 block">ZuriPOS Terminal 01</span>
                      <p className="font-jakarta text-[6pt] text-color-600">Process Cash/Card Orders</p>
                      <span className="font-mono-data text-[6pt] font-bold text-color-900 block mt-0.5">100% OPERATIONAL</span>
                    </div>
                    <div className="border border-color-300 p-1.5 rounded-[4px] bg-color-050">
                      <span className="font-mono-data text-[6.5pt] font-bold text-color-900 block">ZuriKDS Kitchen Screen</span>
                      <p className="font-jakarta text-[6pt] text-color-600">Instant Kitchen Slips</p>
                      <span className="font-mono-data text-[6pt] font-bold text-color-900 block mt-0.5">ZERO LATENCY CARDS</span>
                    </div>
                    <div className="border border-color-300 p-1.5 rounded-[4px] bg-color-050">
                      <span className="font-mono-data text-[6.5pt] font-bold text-color-900 block">Network ESC/POS Printer</span>
                      <p className="font-jakarta text-[6pt] text-color-600">Hardware TCP Port 9100</p>
                      <span className="font-mono-data text-[6pt] font-bold text-color-900 block mt-0.5">DIRECT DOCKET PRINT</span>
                    </div>
                  </div>
                </div>

                {/* RESTORED SYNC INDICATOR */}
                <div className="flex items-center justify-center gap-2 my-1">
                  <div className="h-[0.5pt] w-16 bg-color-300" />
                  <span className="border border-color-300 bg-color-100 text-color-600 px-2 py-0.5 rounded-[4px] font-mono-data text-[6.5pt]">
                    [!] CONNECTION RESTORED: CLOUD SYNC AUTOMATION AWAKENS
                  </span>
                  <div className="h-[0.5pt] w-16 bg-color-300" />
                </div>

                {/* REMOTE RECONCILIATION */}
                <div className="border border-color-200 p-2 rounded-[6px] bg-color-050 text-center">
                  <span className="font-mono-data text-[6.5pt] text-color-600 block">
                    Automatic data reconciliation via Conflict-Free Replicated Data Types (CRDT). Vector clocks resolve transactions cleanly. Zero double-booking overlaps.
                  </span>
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>TOPOLOGY: AIR-GAP-MESH-01</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 04 // AIR-GAPPED PROTOCOLS</h2>
                </div>

                <div className="space-y-2.5 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: NET-DOWN</span>
                      <span>Automatic Isolation Daemon</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Daemon pings 8.8.8.8 and cloud.zuripos.com every 3000ms. Failure switches app to <code className="font-mono-data text-[7pt]">LOCAL_ISOLATION_ACTIVE</code>. Terminals drop Cloud WebSockets and re-point to local micro-edge node IP instantly.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: LAN-ROUT</span>
                      <span>Local Socket Messaging</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Pure TCP/UDP socket messaging over local subnet (<code className="font-mono-data text-[7pt]">192.168.1.0/24</code>). Zero WAN bandwidth used. Thermal ESC/POS receipt printers receive raw byte streams directly over LAN IP.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: SYNC-RES</span>
                      <span>CRDT Data Reconciliation</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      On HTTP 200 return, system enters <code className="font-mono-data text-[7pt]">RECONCILIATION_STATE</code>. Queued SQLite WAL transactions push to cloud with idempotency tokens. Conflicts resolved via CRDT vector clocks (merged by sequence order, not clock time).
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: PRINTER-G</span>
                      <span>Hardware HAL Execution</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Printers operate over raw TCP/IP port 9100. Offline dockets buffer in hardware memory. Zero print loss guaranteed during power fluctuations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 4 OF 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 5: DYNAMIC PRICING & THEFT RECOVERY ENGINE                           */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border-b border-color-200 pb-2 mb-3">
                  <span className="font-mono-data text-[7.5pt] text-color-400 uppercase tracking-wider block">MODULE 5 // CAPITAL LEVERAGE &amp; ROI</span>
                  <h2 className="font-jakarta text-[12pt] font-extrabold text-color-900">
                    Real-Time Device Licensing &amp; Theft Recovery Calculator
                  </h2>
                </div>

                {/* MODE TOGGLES */}
                <div className="flex gap-2 mb-3 font-mono-data text-[7pt]">
                  <span className="bg-color-900 text-color-000 px-3 py-1 rounded-[4px] font-bold">
                    SW-CALC-PLAN: "Device Licensing Cost"
                  </span>
                  <span className="border border-color-300 text-color-600 px-3 py-1 rounded-[4px]">
                    SW-CALC-ROI: "Theft &amp; Shrinkage Recovery Simulator"
                  </span>
                </div>

                {/* SLIDER WRAPPER WIREFRAME */}
                <div className="border border-color-300 p-3 rounded-[6px] bg-color-050 mb-3">
                  <div className="flex justify-between items-center mb-2 font-mono-data text-[7.5pt]">
                    <span className="font-bold text-color-900">Number of Active Cashier POS Terminals:</span>
                    <span className="border border-color-900 bg-color-000 px-2 py-0.5 rounded font-bold text-color-900 text-[8.5pt]">
                      3 Devices
                    </span>
                  </div>

                  {/* SLIDER TRACK */}
                  <div className="relative py-2">
                    <div className="h-2 bg-color-200 rounded-full w-full relative">
                      <div className="h-2 bg-color-900 rounded-full w-[25%]" />
                      <div className="w-4 h-4 bg-color-900 border-2 border-color-000 rounded-full absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 shadow" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-mono-data text-[6.5pt] text-color-400 mt-1">
                    <span>Min: 1 Terminal</span>
                    <span>Max: 50+ Enterprise Stations</span>
                  </div>
                </div>

                {/* BILLING CYCLE SELECTION */}
                <div className="flex items-center gap-4 font-jakarta text-[7.5pt] mb-3 text-color-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-color-400" /> Monthly Settlement
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-color-900">
                    <span className="w-3 h-3 rounded-full border-2 border-color-900 bg-color-900 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-color-000" />
                    </span> 
                    Annual Settlement (20% Upfront Direct Discount Applied)
                  </span>
                </div>

                {/* SUMMARY BREAKDOWN & LEDGER */}
                <div className="border border-color-300 rounded-[6px] p-2.5 bg-color-000 space-y-1 font-mono-data text-[7pt] mb-3">
                  <div className="flex justify-between text-color-600 border-b border-color-100 pb-1">
                    <span>ZuriPMS Core License (Unlimited Rooms &amp; Folios):</span>
                    <span className="font-bold text-color-900">₦0 (100% FREE)</span>
                  </div>
                  <div className="flex justify-between text-color-600 border-b border-color-100 pb-1">
                    <span>Waiter Tablet Handhelds (Unlimited Order-Only):</span>
                    <span className="font-bold text-color-900">₦0 (100% FREE)</span>
                  </div>
                  <div className="flex justify-between text-color-600 border-b border-color-100 pb-1">
                    <span>Housekeeping &amp; Kitchen KDS Instances:</span>
                    <span className="font-bold text-color-900">₦0 (100% FREE)</span>
                  </div>
                  <div className="flex justify-between text-color-600 border-b border-color-100 pb-1">
                    <span>Active Billable POS Units (3 Stations @ ₦20k/mo):</span>
                    <span className="font-bold text-color-900">₦60,000</span>
                  </div>
                  <div className="flex justify-between text-color-600 border-b border-color-100 pb-1">
                    <span>Annual Settlement Discount (20% Deduction applied):</span>
                    <span className="font-bold text-color-900">-₦12,000</span>
                  </div>
                  <div className="flex justify-between text-color-600 pb-0.5">
                    <span>Projected Monthly Theft Recovery (via Recipe BOM):</span>
                    <span className="font-bold text-color-900">+₦750,000</span>
                  </div>
                  <div className="bg-color-050 border border-color-900 p-2 rounded-[4px] mt-1 text-center">
                    <span className="font-jakarta text-[8pt] font-extrabold text-color-900 block">
                      NET OPERATIONAL RETURN: System pays for itself 15.6x over!
                    </span>
                    <span className="font-mono-data text-[7pt] text-color-600">
                      Software Cost: ₦48,000/mo &bull; Estimated Recovered Revenue: ₦750,000/mo
                    </span>
                  </div>
                </div>

                {/* WHATSAPP ACTION BUTTON */}
                <div className="bg-color-900 text-color-000 p-2 rounded-[6px] text-center font-jakarta text-[7.5pt] font-bold">
                  Deploy 3 Terminals Now — Lock in ₦0 Free PMS Tier on WhatsApp
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>ENGINE: CALC-RECOVERY-01</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 05 // DYNAMIC ROI ALGORITHM</h2>
                </div>

                <div className="space-y-2.5 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: POS-SLIDER</span>
                      <span>Range Controller Specs</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Min: 1 &bull; Max: 50 &bull; Step: 1 &bull; Default: 3.<br />
                      Touch-move and mouse-drag events recalculate mathematical ledger per frame (60fps) without DOM thrashing.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: CALC-MATH</span>
                      <span>Dynamic Tier Rating</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      • Tier A (1 to 5 Devices): Base Rate = ₦25,000 / station / month.<br />
                      • Tier B (6 to 15 Devices): Base Rate = ₦20,000 / station / month.<br />
                      • Tier C (16+ Devices): Base Rate = ₦15,000 / station / month.<br />
                      <code className="font-mono-data text-[6.5pt] block mt-1">
                        ActiveRate = AnnualActive ? BaseRate * 0.80 : BaseRate;
                      </code>
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: ROI-MATH</span>
                      <span>Leakage Recovery Model</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Leakage formula: <code className="font-mono-data text-[7pt]">Turnover * 0.15</code>.<br />
                      Assumes hospitality industry standard 15% shrinkage reduction via automatic Bill of Materials inventory deduction at POS order entry.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: LT-02</span>
                      <span>Dynamic URI Generator</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Formats WhatsApp click payload: <code className="font-mono-data text-[6.5pt]">wa.me/234XXXXXXXXXX?text=Hello%20Zuri%20Team...</code> Injects real-time terminal count and calculated investment automatically into query string.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 5 OF 7</span>
              </div>
            </div>
          </div>
        </div>
        {/* ========================================================================= */}
        {/* PAGE 6: TRUST, ACCESS & LEGACY HARDWARE WIZARD                            */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border-b border-color-200 pb-2 mb-3">
                  <span className="font-mono-data text-[7.5pt] text-color-400 uppercase tracking-wider block">MODULE 6 // REGIONAL AUTHORITY &amp; TRUST</span>
                  <h2 className="font-jakarta text-[12pt] font-extrabold text-color-900">
                    Regional Authority, Physical Office &amp; Legacy Hardware Verification
                  </h2>
                </div>

                {/* ROW 1: COMPATIBILITY CHECKER & ACCESS SHOWCASE */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {/* COMPATIBILITY WIZARD */}
                  <div className="border border-color-300 p-2.5 rounded-[6px] bg-color-050">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">
                      [COMPATIBILITY-CHECKER: Hardware Wizard]
                    </span>
                    <p className="font-jakarta text-[6.5pt] text-color-600 mb-2">Keep your existing equipment. Save millions.</p>
                    
                    <div className="space-y-1.5 font-mono-data text-[6.5pt]">
                      <div>
                        <span className="text-color-400 block mb-0.5">Select Door Lock Brand:</span>
                        <div className="border border-color-300 bg-color-000 p-1 rounded flex justify-between items-center text-color-900 font-semibold">
                          <span>Adel RFID Lock</span>
                          <span>&darr;</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-color-400 block mb-0.5">Select Receipt Printer:</span>
                        <div className="border border-color-300 bg-color-000 p-1 rounded flex justify-between items-center text-color-900 font-semibold">
                          <span>Epson TM-T88V</span>
                          <span>&darr;</span>
                        </div>
                      </div>
                      <div className="bg-color-900 text-color-000 p-1.5 rounded-[4px] text-center font-bold mt-1">
                        OUTPUT: "100% Compatible via Zuri LAN Bridge"
                      </div>
                    </div>
                  </div>

                  {/* SMART LOCK SHOWCASE */}
                  <div className="border border-color-300 p-2.5 rounded-[6px] bg-color-050">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">
                      [ZURI-ACCESS: Smart Lock &amp; Elevator Matrix]
                    </span>
                    <p className="font-jakarta text-[6.5pt] text-color-900 font-bold mb-1.5">Guest Key: Room 805 (Floor 8)</p>
                    
                    <div className="grid grid-cols-2 gap-1 font-mono-data text-[6.5pt] mb-2">
                      <div className="border border-color-200 bg-color-000 p-1 rounded">[X] Ground Floor</div>
                      <div className="border border-color-200 bg-color-000 p-1 rounded">[X] Reception Floor</div>
                      <div className="border border-color-200 bg-color-000 p-1 rounded">[X] Restaurant (Flr 2)</div>
                      <div className="border border-color-200 bg-color-000 p-1 rounded">[X] Gym/Pool (Flr 3)</div>
                      <div className="border border-color-900 bg-color-900 text-color-000 p-1 rounded">[X] Guest Flr 8</div>
                      <div className="border border-color-200 bg-color-000 p-1 rounded text-color-400">[ ] Restricted 4-7</div>
                    </div>
                    <p className="font-jakarta text-[6pt] text-color-600 leading-tight">
                      <strong>Offline Guarantee:</strong> Permissions written directly to card chip. Locks read cards with zero network.
                    </p>
                  </div>
                </div>

                {/* ROW 2: LOCATION & LEGAL COMPLIANCE */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-color-200 p-2.5 rounded-[6px] bg-color-000">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">
                      [PHYSICAL HEADQUARTERS]
                    </span>
                    <p className="font-jakarta text-[7pt] font-bold text-color-900">ZURI TECHNOLOGIES LIMITED</p>
                    <p className="font-jakarta text-[6.5pt] text-color-600 leading-tight mt-0.5">
                      Plot 14, Commercial Boulevard, Victoria Island, Lagos State, Federal Republic of Nigeria.<br />
                      Tel: +234 (01) 234-ZURI &bull; support@zuripos.com
                    </p>
                  </div>

                  <div className="border border-color-200 p-2.5 rounded-[6px] bg-color-000">
                    <span className="font-mono-data text-[7pt] font-bold text-color-900 block mb-1">
                      [COMPLIANCE-VAULT: Enterprise Agreements]
                    </span>
                    <div className="space-y-1 font-mono-data text-[6.5pt] text-color-600">
                      <div className="border border-color-200 px-1.5 py-0.5 rounded flex justify-between">
                        <span>DOC-01: Master Services Agreement</span>
                        <span className="text-color-900 font-bold">[PDF]</span>
                      </div>
                      <div className="border border-color-200 px-1.5 py-0.5 rounded flex justify-between">
                        <span>DOC-02: 99.95% Hardware SLA Protocol</span>
                        <span className="text-color-900 font-bold">[PDF]</span>
                      </div>
                      <div className="border border-color-200 px-1.5 py-0.5 rounded flex justify-between">
                        <span>DOC-03: NDPR Data Sovereignty Audit</span>
                        <span className="text-color-900 font-bold">[PDF]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>COMPLIANCE: TRUST-VAULT-01</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 06 // ACCESS &amp; SOVEREIGNTY</h2>
                </div>

                <div className="space-y-2.5 font-mono-data text-[7pt]">
                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: WIZARD-01</span>
                      <span>Hardware Integration Logic</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      • Locks: Adel, Orbita, Vingcard, Betech, TTLock (via serial FIAS encoder).<br />
                      • Printers: Epson, Star Micronics, Xprinter, Bixolon (via ESC/POS raw TCP:9100 socket bridge). Zero driver bloat.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: ACCESS-01</span>
                      <span>Data-on-Card RFID Protocol</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Encrypted Mifare Classic 1K / DESFire EV2 payload schema written directly to physical card sector:<br />
                      <code className="font-mono-data text-[6.5pt] block mt-1">
                        [Room_ID: 805] + [CheckIn_Epoch] + [CheckOut_Epoch]
                      </code>
                      Door locks and elevator controllers validate card timestamps via internal hardware RTC. Zero dependency on WAN.
                    </p>
                  </div>

                  <div className="border border-color-200 p-2 rounded-[4px] bg-color-050">
                    <div className="flex justify-between font-bold text-color-900 border-b border-color-200 pb-1 mb-1">
                      <span>REF: DOC-01:03</span>
                      <span>Regulatory &amp; Legal Assets</span>
                    </div>
                    <p className="text-color-600 font-sans text-[7.5pt] leading-relaxed">
                      Validated enterprise agreements for Nigerian operations:<br />
                      1. Master Services Agreement (MSA)<br />
                      2. Service Level Agreement (99.95% uptime commitment)<br />
                      3. NDPR (Nigeria Data Protection Regulation) Data Sovereignty Audit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 6 OF 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 7: DEMO LEAD PIPELINE & LOGICAL STRESS-TEST MATRIX                  */}
        {/* ========================================================================= */}
        <div className="landscape-page">
          <div className="flex h-full w-full">
            {/* LEFT 60% PANE */}
            <div className="w-[58.5%] flex flex-col justify-between pr-4">
              <div>
                <div className="border-b border-color-200 pb-2 mb-3">
                  <span className="font-mono-data text-[7.5pt] text-color-400 uppercase tracking-wider block">MODULE 7 // CONVERSION PIPELINE</span>
                  <h2 className="font-jakarta text-[12pt] font-extrabold text-color-900">
                    Request Enterprise Deployment &amp; On-Premise Audit
                  </h2>
                </div>

                {/* LEAD FORM WIREFRAME */}
                <div className="border border-color-300 p-3 rounded-[6px] bg-color-050 mb-3 space-y-2 font-jakarta">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-0.5">Property Legal Name</span>
                      <div className="border border-color-300 bg-color-000 p-1.5 rounded-[4px] text-[7.5pt] text-color-400">
                        e.g., Eko Horizon Suites &amp; Towers
                      </div>
                    </div>
                    <div>
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-0.5">Total Room Count</span>
                      <div className="border border-color-300 bg-color-000 p-1.5 rounded-[4px] text-[7.5pt] text-color-900 font-semibold flex justify-between">
                        <span>21 - 50 Rooms</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-0.5">Active Cashier POS Needed</span>
                      <div className="border border-color-300 bg-color-000 p-1.5 rounded-[4px] text-[7.5pt] text-color-900 font-semibold">
                        3 Cashier Stations
                      </div>
                    </div>
                    <div>
                      <span className="font-mono-data text-[6.5pt] text-color-400 block mb-0.5">Operating State</span>
                      <div className="border border-color-300 bg-color-000 p-1.5 rounded-[4px] text-[7.5pt] text-color-900 font-semibold flex justify-between">
                        <span>Lagos State</span>
                        <span>&darr;</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono-data text-[6.5pt] text-color-400 block mb-0.5">Manager WhatsApp Tel</span>
                    <div className="border border-color-300 bg-color-000 p-1.5 rounded-[4px] text-[7.5pt] text-color-900 font-semibold">
                      +234 801 234 5678
                    </div>
                  </div>

                  <div className="bg-color-900 text-color-000 p-2.5 rounded-[4px] text-center text-[8pt] font-bold">
                    Submit Deployment Request — Lock in Guaranteed ₦0 PMS Free License
                  </div>
                </div>

                {/* ARCHITECTURAL SITE FOOTER */}
                <div className="border border-color-200 p-2.5 rounded-[6px] bg-color-000">
                  <div className="grid grid-cols-4 gap-2 font-mono-data text-[6pt]">
                    <div>
                      <span className="font-bold text-color-900 block mb-1">ZURI POS HUB</span>
                      <span className="text-color-600 block">Unified African OS</span>
                      <span className="text-color-400 block">© 2026 Zuri Tech Ltd</span>
                    </div>
                    <div>
                      <span className="font-bold text-color-900 block mb-1">SOLUTIONS</span>
                      <span className="text-color-600 block">- ZuriPMS Tape</span>
                      <span className="text-color-600 block">- ZuriPOS Mesh</span>
                    </div>
                    <div>
                      <span className="font-bold text-color-900 block mb-1">INFRASTRUCTURE</span>
                      <span className="text-color-600 block">- Cloud: 100% Green</span>
                      <span className="text-color-600 block">- Local LAN Spec</span>
                    </div>
                    <div>
                      <span className="font-bold text-color-900 block mb-1">REGULATORY</span>
                      <span className="text-color-600 block">- NDPR Data</span>
                      <span className="text-color-600 block">- Master Agreement</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="font-mono-data text-[7pt] text-color-400 pt-2 border-t border-color-200 flex justify-between">
                <span>STAGE: INTAKE-PIPELINE-01</span>
                <span>DESKTOP VIEWPORT CANVAS: 772PX</span>
              </div>
            </div>

            {/* CENTER GUTTER DIVIDER */}
            <div className="w-[2.5%] flex justify-center items-center">
              <div className="w-[0.75pt] h-full bg-color-300" />
            </div>

            {/* RIGHT 39% PANE: ANNOTATION LEDGER & STRESS-TEST MATRIX */}
            <div className="w-[39%] flex flex-col justify-between pl-4">
              <div>
                <div className="border-b border-color-900 pb-2 mb-3">
                  <span className="font-mono-data text-[7pt] text-color-400 uppercase tracking-widest block">SPECIFICATION LEDGER</span>
                  <h2 className="font-jakarta text-[12pt] font-bold text-color-900">PAGE 07 // STRESS-TEST MATRIX</h2>
                </div>

                <div className="space-y-2 font-mono-data text-[6.5pt]">
                  <div className="border border-color-200 p-1.5 rounded bg-color-050">
                    <span className="font-bold text-color-900 block mb-0.5">REF: FLD-PHONE // Validation Mask</span>
                    <p className="font-sans text-[7pt] text-color-600">
                      Regex: <code className="font-mono-data text-[6.5pt]">^(\+234|0)[789][01]\d{8}$</code>. Rejects invalid prefixes before network dispatch.
                    </p>
                  </div>

                  <div className="border border-color-200 p-1.5 rounded bg-color-050">
                    <span className="font-bold text-color-900 block mb-0.5">REF: SUBMIT // Intake Pipeline</span>
                    <p className="font-sans text-[7pt] text-color-600">
                      1. Disable button &bull; 2. Post payload to <code className="font-mono-data text-[6.5pt]">/api/v1/leads/intake</code> &bull; 3. Store idempotency key &bull; 4. Render WhatsApp concierge.
                    </p>
                  </div>

                  {/* LOGICAL SYSTEM STRESS-TEST TABLE */}
                  <div className="border border-color-900 rounded p-1.5 bg-color-000">
                    <span className="font-bold text-color-900 block mb-1 uppercase tracking-wider">
                      SYSTEMIC HARDENING MATRIX
                    </span>
                    <table className="w-full text-left border-collapse text-[6pt]">
                      <thead>
                        <tr className="border-b border-color-200 text-color-400">
                          <th className="py-0.5">#</th>
                          <th className="py-0.5">Surface</th>
                          <th className="py-0.5">Engineered Mitigation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-color-100 text-color-600 font-sans">
                        <tr>
                          <td className="font-mono-data font-bold py-0.5">1</td>
                          <td>Slider Drag</td>
                          <td>rAF throttle prevents DOM thrashing.</td>
                        </tr>
                        <tr>
                          <td className="font-mono-data font-bold py-0.5">2</td>
                          <td>3G Drop</td>
                          <td>UUID Idempotency-Key + localStorage retry.</td>
                        </tr>
                        <tr>
                          <td className="font-mono-data font-bold py-0.5">3</td>
                          <td>Sync Clocks</td>
                          <td>CRDT Vector Clocks merge by sequence order.</td>
                        </tr>
                        <tr>
                          <td className="font-mono-data font-bold py-0.5">4</td>
                          <td>Safari Auth</td>
                          <td>Hard navigation to root domain broker.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border-t border-color-200 pt-2 flex justify-between items-center text-[7pt] font-mono-data text-color-400">
                <span>DOCUMENT: ZP-PDF-SPEC-001</span>
                <span>PAGE 7 OF 7</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
