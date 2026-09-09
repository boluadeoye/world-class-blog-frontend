"use client";
import React, { useState, useEffect } from "react";
import { Printer, ArrowRight } from "lucide-react";

export default function ZuriCADMasterDrawings() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ZURI_POS_HUB_MASTER_ARCHITECTURAL_DRAWINGS_ZP-ARCH-CAD-001";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-100 selection:bg-slate-300 selection:text-slate-900">
      
      {/* GOOGLE FONTS: PLUS JAKARTA SANS & JETBRAINS MONO */}
      <link 
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
        rel="stylesheet" 
      />

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
          body * { visibility: hidden; }
          #cad-drawing-set, #cad-drawing-set * { visibility: visible; }
          #cad-drawing-set {
            position: absolute;
            left: 0;
            top: 0;
            width: 297mm;
            background: #FFFFFF;
          }
          .cad-sheet {
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
            padding: 8mm 10mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .no-print { display: none !important; }
        }

        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono-cad { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
        
        /* CAD HATCHING & DRAFTING RULERS */
        .cad-hatch {
          background-image: repeating-linear-gradient(45deg, #E2E8F0, #E2E8F0 1.5px, transparent 1.5px, transparent 6px);
        }
      `}</style>

      {/* SCREEN VIEW: WORKSTATION CONTROL PORTAL */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative">
        <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-2xl">
          <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="font-mono-cad text-[10px] text-slate-400 block tracking-widest uppercase">CAD REPOSITORY // WORKING DRAWINGS</span>
              <h1 className="font-jakarta text-xl font-bold text-white mt-1">ZURI POS HUB — SET ZP-ARCH-CAD-001</h1>
            </div>
            <span className="bg-slate-800 border border-slate-700 text-slate-300 font-mono-cad text-[10px] px-2 py-1 rounded">DIN A4 LANDSCAPE</span>
          </div>

          <div className="space-y-2 font-mono-cad text-xs text-slate-300 mb-8">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-500">Geometry:</span>
              <span className="text-white">60% Blueprint Canvas / 40% Schedule of Works</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-500">Linework:</span>
              <span className="text-white">Monochrome Architectural Grayscale (#0F172A Ink)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-500">Drafting Sheets:</span>
              <span className="text-white">7 Total (A-001 to A-106 Complete)</span>
            </div>
          </div>

          <button
            onClick={handlePrint}
            disabled={!isReady}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-jakarta font-bold py-3.5 px-6 rounded-lg transition-all"
          >
            <Printer size={18} />
            <span>Plot Master Architectural Drawings (PDF)</span>
          </button>
        </div>
      </div>

      {/* PRINT VIEW: 7 ARCHITECTURAL CAD SHEETS */}
      <div id="cad-drawing-set" className="hidden print:block font-jakarta text-[#0F172A] bg-white">

        {/* ========================================================================= */}
        {/* SHEET A-001: TITLE BLOCK, SPATIAL GRID MATRIX & FINISH SCHEDULE          */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          {/* SHEET FRAME */}
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-3">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">CANOPY REF: 12-COLUMN STRUCTURAL GRID // 1440 × 810 CANVAS</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">MASTER ARCHITECTURAL DRAFTING CANOPY</h2>
                  </div>

                  {/* 12-COLUMN STRUCTURAL GRID SCHEMATIC */}
                  <div className="border border-[#0F172A] p-3 rounded-[2px] bg-[#F8FAFC] mb-3">
                    <div className="flex justify-between mb-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <span className="w-5 h-5 rounded-full border border-[#0F172A] flex items-center justify-center font-mono-cad text-[5.5pt] font-bold bg-white mb-1">
                            C{String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="w-[42px] h-[52px] border border-[#CBD5E1] bg-white flex flex-col justify-between p-1 text-center font-mono-cad text-[5pt] text-[#475569]">
                            <span>96</span>
                            <span className="text-[#94A3B8]">px</span>
                            <span>COL</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-dashed border-[#0F172A] pt-1.5 flex justify-between font-mono-cad text-[6.5pt] text-[#475569]">
                      <span>|← 60px Margin →|</span>
                      <span>|← 1320px Active Structural Canvas (24px Gutters) →|</span>
                      <span>|← 60px Margin →|</span>
                    </div>
                  </div>

                  {/* SPATIAL ELEVATION SCALING UNITS */}
                  <div className="border border-[#E2E8F0] p-2.5 rounded-[2px] mb-3 bg-white">
                    <span className="font-mono-cad text-[6.5pt] font-bold text-[#0F172A] block mb-1.5 uppercase tracking-wider">
                      STRUCTURAL ELEVATION SCALING UNITS (8px Base Rhythm)
                    </span>
                    <div className="grid grid-cols-6 gap-1 font-mono-cad text-[6pt] text-center">
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">4px: Micro</span>
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">8px: Compact</span>
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">16px: Standard</span>
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">24px: Relaxed</span>
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">32px: Macro</span>
                      <span className="border border-[#CBD5E1] bg-[#F8FAFC] py-1 rounded-[2px]">48/64px: Structural</span>
                    </div>
                  </div>

                  {/* LINE-WEIGHT CONVENTIONS */}
                  <div className="border border-[#E2E8F0] p-2 rounded-[2px] font-mono-cad text-[6pt] space-y-1 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 border-b-[0.5px] border-[#E2E8F0]" />
                      <span className="text-[#475569]">0.50pt Hairline (Internal Cell Dividers &amp; Grids)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 border-b-[1px] border-[#0F172A]" />
                      <span className="text-[#475569]">1.00pt Standard (Container Borders, Inputs, Buttons)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 border-b-[2px] border-[#0F172A]" />
                      <span className="text-[#0F172A] font-bold">2.00pt Structural Outline &amp; Focus Perimeter</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="w-1/2 border-b border-dashed border-[#475569]" />
                      <span className="text-[#475569]">1.00pt Dashed Logic Trail (Orthogonal Vector)</span>
                    </div>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE A
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Project Scope</td>
                        <td className="py-1.5 font-sans leading-tight">
                          System Deliverable: Product 1 (Public SaaS Marketing Engine &amp; Regional Authority Gateway). Multi-property hospitality operating system for hotels, resorts, and serviced apartments.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Drawing Rule</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Grid locked to 1440px desktop breakpoint. Horizontal overflow locked (`none`). Breakpoints: 1440px (12-Col), 1024px (8-Col), 768px (Tablet), 390px (Mobile 4-Col).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Typographic</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Dual Typeface Standard: Primary Display &amp; Form Labels in Plus Jakarta Sans (12pt–56pt). Financials, Timers &amp; Data in JetBrains Mono (Strict tabular numeric alignment).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Monochrome Palette</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Grayscale Linework Palette: #FFFFFF (Pure Ground), #F8FAFC (Surface Tint), #E2E8F0 (Grid Line), #CBD5E1 (Border Stroke), #0F172A (Deep Slate Ink).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-001" sheetTitle="TITLE BLOCK, SPATIAL GRID MATRIX & FINISH SCHEDULE" pageNum="1" totalPages="7" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHEET A-101: PERSISTENT NAVIGATION & HERO CONVERSION CANVAS               */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">ELEVATION 01 // CONVERSION CANOPY</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">PERSISTENT NAVIGATION &amp; HERO STAGE</h2>
                  </div>

                  {/* TOP NAV CANOPY WIREFRAME */}
                  <div className="border border-[#0F172A] p-2 rounded-[2px] bg-[#F8FAFC] flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 bg-[#0F172A] rounded-[2px] text-white flex items-center justify-center font-mono-cad text-[6pt] font-bold">■</span>
                      <span className="font-jakarta text-[7.5pt] font-black tracking-tight text-[#0F172A]">ZURI POS HUB</span>
                    </div>
                    <div className="flex gap-2 font-mono-cad text-[6.5pt] text-[#475569]">
                      <span>Ecosystem <span className="text-[#0F172A] font-bold">(01)</span></span>
                      <span>Offline Mesh <span className="text-[#0F172A] font-bold">(01)</span></span>
                      <span>Pricing <span className="text-[#0F172A] font-bold">(01)</span></span>
                      <span>Trust &amp; HQ <span className="text-[#0F172A] font-bold">(01)</span></span>
                    </div>
                    <div className="flex gap-1.5 font-mono-cad text-[6.5pt]">
                      <span className="border border-[#CBD5E1] px-1.5 py-0.5 rounded-[2px] bg-white">Client Login</span>
                      <span className="bg-[#0F172A] text-white px-2 py-0.5 rounded-[2px] font-bold">[Get Started]</span>
                    </div>
                  </div>

                  {/* HERO WIREFRAME */}
                  <div className="border border-[#E2E8F0] p-3 rounded-[2px] bg-white mb-3">
                    <span className="font-mono-cad text-[6.5pt] text-[#475569] block mb-1">
                      ENTERPRISE HOSPITALITY OS // NIGERIAN EDITION
                    </span>
                    <h3 className="font-jakarta text-[13pt] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-1.5">
                      Run Unlimited Hotel Rooms at Zero Back-Office Cost.<br />
                      Pay Exclusively for Active Cashier POS Terminals.
                    </h3>
                    <p className="font-sans text-[7.5pt] text-[#475569] leading-relaxed mb-3">
                      Complete property management, housekeeping, and front-desk booking: 100% Free (₦0). Pay monthly licensing fees ONLY when a physical cashier terminal processes money. Operates 100% locally when fiber and Starlink cut out.
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#0F172A] text-white px-3 py-1.5 rounded-[2px] font-mono-cad text-[7pt] font-bold flex items-center gap-1.5">
                        <span>[■] Configure Hardware Investment</span>
                        <span className="text-[#94A3B8]">(02)</span>
                      </div>
                      <div className="border border-[#0F172A] px-3 py-1.5 rounded-[2px] font-mono-cad text-[7pt] font-bold text-[#0F172A] flex items-center gap-1.5">
                        <span>[ ] Request Physical Deployment</span>
                        <span className="text-[#475569]">(03)</span>
                      </div>
                    </div>

                    {/* MANHATTAN VECTOR LOGIC TRAIL */}
                    <div className="font-mono-cad text-[6pt] text-[#475569] mt-2 flex items-center gap-2">
                      <span className="border-t border-dashed border-[#0F172A] w-12" />
                      <span>LOGIC TRAIL LT-01 ──&gt; (ORTHOGONAL VECTOR ROUTING TO SHEET A-104)</span>
                    </div>
                  </div>

                  {/* MULTI-PROPERTY SELECTOR & PREVIEW */}
                  <div className="border border-[#0F172A] p-2.5 rounded-[2px] bg-[#F8FAFC]">
                    <div className="flex justify-between items-center mb-2 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">MULTI-PROPERTY SELECTOR:</span>
                      <div className="flex gap-2 text-[#475569]">
                        <span className="font-bold text-[#0F172A]">(•) VI Lagos (45 Rms)</span>
                        <span>( ) Abuja Branch (20 Rms)</span>
                        <span>( ) Group Master View <span className="font-bold text-[#0F172A]">(04)</span></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-mono-cad text-[6pt]">
                      <div className="border border-[#CBD5E1] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block mb-1">ZuriPMS Tape Chart</span>
                        <span className="bg-[#0F172A] text-white px-1 py-0.5 rounded block text-center mb-1">[=== Adeleke ===]</span>
                        <span className="text-[#475569] block">[⇄ Tap to Swap Room] <strong className="text-[#0F172A]">(05)</strong></span>
                      </div>
                      <div className="border border-[#CBD5E1] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block mb-1">ZuriPOS Touch Grid</span>
                        <span className="text-[#475569] block">Chapman ...... ₦4,500</span>
                        <span className="text-[#475569] block">Cold Star .... ₦1,800</span>
                        <span className="font-bold text-[#0F172A] block mt-1">Active: ₦18,300</span>
                      </div>
                      <div className="border border-[#CBD5E1] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block mb-1">ZuriKDS Kitchen Screen</span>
                        <span className="text-[#475569] block">Ticket #104 (Table 04)</span>
                        <span className="text-[#475569] block">1x Peppered Croaker</span>
                        <span className="border border-[#0F172A] px-1 block text-center font-bold mt-1">NORMAL SLA (04:12)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE B
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Nav Gateway</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Persistent Top Navigation (Height: 72px, Z-Index: 9999). Anchor tags bound to `#ecosystem`, `#offline`, `#calculator`, `#trust`. Login route: `https://app.zuripos.com/auth/login`.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Primary CTA</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Solid Fill Button (Height: 48px, Radius: 6px). Triggers smooth glide scroll down to Sheet A-104 Interactive Financial Calculator (`#calculator`).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Secondary CTA</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Outlined Ghost Button (Stroke: 1.0pt, Radius: 6px). Triggers smooth glide scroll down to Sheet A-106 Demo Lead Intake Form and focuses first input field.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Multi-Property</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Dynamic State Switcher: VI Lagos renders single-property 98% occupancy; Abuja renders boutique 74%; Group Master merges records into 65 rooms and consolidated gross metrics.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(05)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Tactile Demo</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Interactive Preview Card: User click on room bar simulates 0.04s instant room reassignment, proving client-side speed without requiring account creation.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-101" sheetTitle="PERSISTENT NAVIGATION & HERO CONVERSION CANVAS" pageNum="2" totalPages="7" />
          </div>
        </div>
        {/* ========================================================================= */}
        {/* SHEET A-102: ECOSYSTEM DETAILED ELEVATION (PMS, POS, KDS)                 */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">ELEVATION 02 // MODULE RACK SPECIFICATION</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ZuriPMS, ZuriPOS &amp; ZuriKDS SUBSYSTEMS</h2>
                  </div>

                  {/* 30-DAY TAPE CHART ELEVATION */}
                  <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white mb-2.5">
                    <div className="flex justify-between items-center mb-1.5 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">ROOM / CALENDAR MATRIX (30-DAY TIMELINE)</span>
                      <span className="text-[#0F172A] font-bold">(01)</span>
                    </div>

                    <div className="border border-[#E2E8F0] font-mono-cad text-[6pt]">
                      <div className="grid grid-cols-10 bg-[#F8FAFC] border-b border-[#E2E8F0] p-1 font-bold text-[#0F172A]">
                        <span className="col-span-2">Room / Type</span>
                        <span>D01</span><span>D02</span><span>D03</span><span>D04</span><span>D05</span><span>D06</span><span>D07</span><span>D08</span>
                      </div>
                      <div className="grid grid-cols-10 items-center p-1 border-b border-[#E2E8F0]">
                        <span className="col-span-2 font-bold text-[#0F172A]">101 - Exec Suite</span>
                        <div className="col-span-5 bg-[#0F172A] text-white px-1 py-0.5 rounded-[2px] text-[5.5pt] truncate text-center">
                          MR. ADELEKE (Folio: ₦185,000)
                        </div>
                        <span className="col-span-1 text-center text-[#CBD5E1]">--</span>
                        <div className="col-span-2 bg-[#CBD5E1] text-[#0F172A] px-1 py-0.5 rounded-[2px] text-[5.5pt] truncate text-center">
                          Okonjo
                        </div>
                      </div>
                      <div className="grid grid-cols-10 items-center p-1 border-b border-[#E2E8F0]">
                        <span className="col-span-2 font-bold text-[#0F172A]">102 - Deluxe Dbl</span>
                        <span className="col-span-2 text-center text-[#CBD5E1]">--</span>
                        <div className="col-span-6 bg-[#475569] text-white px-1 py-0.5 rounded-[2px] text-[5.5pt] truncate text-center">
                          MRS. OKONJO (Guaranteed Booking)
                        </div>
                      </div>
                      <div className="grid grid-cols-10 items-center p-1">
                        <span className="col-span-2 font-bold text-[#0F172A]">103 - Penthouse</span>
                        <div className="col-span-8 cad-hatch border border-[#CBD5E1] py-0.5 px-2 text-[5.5pt] text-[#0F172A] font-bold text-center">
                          &lt;--- ROOM OUT OF ORDER (OOO): AC COMPRESSOR OVERHAUL ---&gt;
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 7-STAGE HOUSEKEEPING CONTROLLER */}
                  <div className="border border-[#E2E8F0] p-2 rounded-[2px] bg-[#F8FAFC] mb-2.5">
                    <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">HOUSEKEEPING 7-STAGE LIFECYCLE CONTROLLER</span>
                      <span className="text-[#0F172A] font-bold">(02)</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono-cad text-[5.5pt] flex-wrap mb-1">
                      <span className="border border-[#0F172A] bg-[#0F172A] text-white px-1 py-0.5 rounded-[2px]">S1: CLEAN</span>
                      <span>&rarr;</span>
                      <span className="border border-[#475569] bg-[#475569] text-white px-1 py-0.5 rounded-[2px]">S2: DIRTY</span>
                      <span>&rarr;</span>
                      <span className="border-2 border-[#0F172A] bg-white font-bold px-1 py-0.5 rounded-[2px]">S3: INSPECTED</span>
                      <span>&rarr;</span>
                      <span className="border border-[#CBD5E1] bg-[#E2E8F0] text-[#475569] px-1 py-0.5 rounded-[2px]">S4: OOO</span>
                      <span>&rarr;</span>
                      <span className="border border-[#CBD5E1] bg-[#E2E8F0] text-[#475569] px-1 py-0.5 rounded-[2px]">S5: MAINT</span>
                      <span>&rarr;</span>
                      <span className="border border-[#CBD5E1] bg-[#E2E8F0] text-[#475569] px-1 py-0.5 rounded-[2px]">S6: TURN-DOWN</span>
                      <span>&rarr;</span>
                      <span className="border border-[#0F172A] bg-white font-bold px-1 py-0.5 rounded-[2px]">S7: OCCUPIED</span>
                    </div>
                    <p className="font-mono-cad text-[6pt] text-[#475569]">
                      Room 204 State: [DIRTY] &bull; Transition: [Mark "INSPECTED" (Supervisor PIN Required)]
                    </p>
                  </div>

                  {/* BOTTOM SPLIT: FRONTLINE POS & KDS PRODUCTION */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">3B: ZuriPOS Frontline Station</span>
                        <span className="text-[#0F172A] font-bold">(03)</span>
                      </div>
                      <p className="font-mono-cad text-[6pt] text-[#475569] mb-1">Table 12: VIP Lounge │ Waiter: Chinedu E.</p>
                      <div className="space-y-0.5 font-mono-cad text-[6pt] border-y border-[#E2E8F0] py-1 mb-1">
                        <div className="flex justify-between"><span>1x Grilled Croaker Fish</span><span>₦9,500</span></div>
                        <div className="flex justify-between"><span>2x Club Soda</span><span>₦1,000</span></div>
                      </div>
                      <div className="border border-[#0F172A] bg-[#F8FAFC] p-1 font-mono-cad text-[5.5pt] text-[#0F172A]">
                        <strong>[!] BLIND SHIFT DROP:</strong> Cashier enters drawer cash without system hints.
                      </div>
                    </div>

                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">3C: ZuriKDS Production Rack</span>
                        <span className="text-[#0F172A] font-bold">(04)</span>
                      </div>
                      <div className="flex justify-between font-mono-cad text-[6pt] font-bold mb-1">
                        <span>TICKET #204: VIP Section</span>
                        <span className="border border-[#0F172A] px-1">00:09:42 (WARNING)</span>
                      </div>
                      <p className="font-sans text-[6pt] text-[#475569] mb-1 leading-tight">
                        1x Grilled Croaker ("Extra Lemon, No Pepper")<br />1x Jollof Rice + Plantain
                      </p>
                      <div className="grid grid-cols-2 gap-1 font-mono-cad text-[6pt]">
                        <span className="border border-[#0F172A] text-center py-0.5 font-bold">START PREP</span>
                        <span className="bg-[#0F172A] text-white text-center py-0.5 font-bold">BUMP TICKET</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE C
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">30-Day Tape Chart</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Horizontal X: 30 days; Vertical Y: physical rooms. Visual: Solid = Reserved; Hatch = Maintenance (OOO). Database constraint: Row-level exclusion locks prevent overlapping reservations.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Housekeeping FSM</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Finite State Machine: Checkout triggers S1 (Clean) &rarr; S2 (Dirty). Transition S2 &rarr; S3 (Inspected) strictly requires supervisor PIN authentication.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Frontline POS</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Tactile grid minimum 64px × 64px hit area. Blind Shift Drop Protocol: System forces cashier to input physical drawer count; expected ledger total is masked.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">KDS Production</td>
                        <td className="py-1.5 font-sans leading-tight">
                          SLA Service Timers: Normal (&lt;00:05:00); Warning (00:05:00 to 00:12:00, solid outline + audio chime); Critical (&gt;00:12:00, flashing alert + repeat alarm).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-102" sheetTitle="ECOSYSTEM DETAILED ELEVATION (PMS, POS, KDS)" pageNum="3" totalPages="7" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHEET A-103: MEP INFRASTRUCTURE & AIR-GAPPED MESH TOPOLOGY                */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">SINGLE-LINE SCHEMATIC // NETWORK MEP TOPOLOGY</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">AIR-GAPPED HYBRID-MESH ARCHITECTURE</h2>
                  </div>

                  {/* CLOUD CORE REPOSITORY */}
                  <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white flex justify-between items-center mb-2">
                    <div>
                      <span className="font-mono-cad text-[7pt] font-bold text-[#0F172A] block">CLOUD REPOSITORY: AWS EU-WEST / NEON POSTGRESQL</span>
                      <span className="font-mono-cad text-[6pt] text-[#475569]">Global Data Plane with Row-Level Security (RLS)</span>
                    </div>
                    <span className="font-mono-cad text-[7pt] font-bold text-[#0F172A]">(01)</span>
                  </div>

                  {/* PHYSICAL SEVERANCE DISCONNECT */}
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="border-t border-[#0F172A] w-16" />
                    <span className="border-2 border-[#0F172A] bg-[#0F172A] text-white px-2 py-0.5 rounded-[2px] font-mono-cad text-[6pt] font-bold">
                      [X] PHYSICAL SEVERANCE: FIBER CUT / STARLINK BLACKOUT (02)
                    </span>
                    <span className="border-t border-[#0F172A] w-16" />
                  </div>

                  {/* ON-PREMISE LAN BOUNDARY */}
                  <div className="border-2 border-[#0F172A] p-2.5 rounded-[2px] bg-[#F8FAFC] mb-2">
                    <div className="flex justify-between items-center mb-1.5 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">ON-PREMISE AIR-GAPPED LAN ROUTER (192.168.1.0/24)</span>
                      <span className="text-[#0F172A] font-bold">(03)</span>
                    </div>

                    {/* MICRO-EDGE CORE */}
                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white mb-2 text-center">
                      <span className="font-mono-cad text-[7pt] font-bold text-[#0F172A] block">
                        ZURI MICRO-EDGE CORE: Intel NUC / Terminal Station Master
                      </span>
                      <span className="font-mono-cad text-[6pt] text-[#475569] block">
                        Embedded SQLite with Write-Ahead Logging (WAL) Mode • In-Memory Active Table State Register
                      </span>
                    </div>

                    {/* 3 TERMINAL DROPS */}
                    <div className="grid grid-cols-3 gap-2 font-mono-cad text-[6pt] text-center">
                      <div className="border border-[#0F172A] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block">ZuriPOS Terminal 01</span>
                        <span className="text-[#475569] block mt-0.5">100% Sales Continuity</span>
                        <span className="font-bold text-[#0F172A] block mt-0.5">Cash / Room Charge OK</span>
                      </div>
                      <div className="border border-[#0F172A] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block">ZuriKDS Kitchen Screen</span>
                        <span className="text-[#475569] block mt-0.5">Zero Latency Tickets</span>
                        <span className="font-bold text-[#0F172A] block mt-0.5">Visual SLA Timers</span>
                      </div>
                      <div className="border border-[#0F172A] p-1.5 rounded-[2px] bg-white">
                        <span className="font-bold text-[#0F172A] block">Network ESC/POS Printer</span>
                        <span className="text-[#475569] block mt-0.5">Raw TCP Port 9100</span>
                        <span className="font-bold text-[#0F172A] block mt-0.5">Direct Docket Print</span>
                      </div>
                    </div>
                  </div>

                  {/* RECONCILIATION AWAKENS */}
                  <div className="flex items-center justify-center gap-2 my-1">
                    <span className="border-t border-dashed border-[#0F172A] w-16" />
                    <span className="border border-[#0F172A] bg-white px-2 py-0.5 rounded-[2px] font-mono-cad text-[6pt] font-bold text-[#0F172A]">
                      [!] UPLINK RESTORED: DATA RECONCILIATION AWAKENS (04)
                    </span>
                    <span className="border-t border-dashed border-[#0F172A] w-16" />
                  </div>

                  <div className="border border-[#0F172A] p-1.5 rounded-[2px] bg-white text-center font-mono-cad text-[6pt]">
                    <span className="font-bold text-[#0F172A]">CRDT RE-SYNCHRONIZATION:</span> Monotonic Vector Clocks merge data by sequence order. Zero transaction loss.
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE D
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Cloud Core</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Primary Data Plane: Serverless PostgreSQL cluster with active Row-Level Security (RLS) enforcement.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Isolation Daemon</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Automatic Failover: Pings 8.8.8.8 and cloud endpoints every 3000ms. Failure triggers `LOCAL_ISOLATION_ACTIVE` in &lt;200ms without cashier disruption.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Local Mesh</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Transport: Local TCP/UDP sockets on subnet (192.168.1.0/24). Storage: SQLite WAL mode guarantees zero corruption. Printer HAL: Raw ESC/POS byte streaming on Port 9100.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Conflict-Free Sync</td>
                        <td className="py-1.5 font-sans leading-tight">
                          CRDT Vector Clocks using composite primary key: `[Station_GUID] + [Monotonic_Sequence_ID] + [UTC_Epoch]`. Merged sequentially, eliminating double bookings.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-103" sheetTitle="MEP INFRASTRUCTURE & AIR-GAPPED MESH TOPOLOGY" pageNum="4" totalPages="7" />
          </div>
        </div>
        {/* ========================================================================= */}
        {/* SHEET A-104: CAPITAL ROI MACHINERY & THEFT RECOVERY ENGINE                */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">FINANCIAL ENGINE // RECOVERY MATRIX</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">DEVICE LICENSING &amp; THEFT RECOVERY CALCULATOR</h2>
                  </div>

                  {/* MODE TOGGLE */}
                  <div className="flex gap-2 font-mono-cad text-[6.5pt] mb-2.5">
                    <span className="border border-[#0F172A] bg-[#0F172A] text-white px-2 py-1 rounded-[2px] font-bold">
                      [■] Device Licensing Investment (01)
                    </span>
                    <span className="border border-[#CBD5E1] bg-white text-[#475569] px-2 py-1 rounded-[2px]">
                      [ ] Anti-Theft &amp; Shrinkage Recovery Simulator (02)
                    </span>
                  </div>

                  {/* LINEAR SLIDER TRACK */}
                  <div className="border border-[#0F172A] p-2.5 rounded-[2px] bg-[#F8FAFC] mb-2.5">
                    <div className="flex justify-between items-center mb-1.5 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">ACTIVE CASHIER POS TERMINAL SELECTOR</span>
                      <span className="border border-[#0F172A] bg-white px-2 py-0.5 rounded text-[7.5pt] font-bold text-[#0F172A]">(03) [ 3 Stations ]</span>
                    </div>

                    {/* CALIBRATED TRACK */}
                    <div className="relative py-2">
                      <div className="h-1 bg-[#CBD5E1] rounded w-full relative">
                        <div className="h-1 bg-[#0F172A] w-[25%]" />
                        <div className="w-3 h-3 bg-[#0F172A] border border-white rounded-full absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="flex justify-between font-mono-cad text-[6pt] text-[#475569] mt-1">
                      <span>1 Station</span>
                      <span>[ - 1 Station ]   [ + 1 Station ]</span>
                      <span>50+ Stations</span>
                    </div>
                  </div>

                  {/* SETTLEMENT TERMS */}
                  <div className="flex gap-4 font-mono-cad text-[6.5pt] mb-2 text-[#475569]">
                    <span>( ) Billed Monthly</span>
                    <span className="font-bold text-[#0F172A]">(•) Billed Annually (20% Upfront Direct Deduction Applied) (04)</span>
                  </div>

                  {/* FINANCIAL AUDIT LEDGER */}
                  <div className="border border-[#0F172A] rounded-[2px] p-2 bg-white font-mono-cad text-[6.5pt] space-y-1 mb-2">
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5">
                      <span>ZuriPMS Core License (Unlimited Rooms, Bookings, Folios):</span>
                      <span className="font-bold text-[#0F172A]">₦0 (100% FREE) (05)</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5">
                      <span>Waiter Handheld Tablets (Unlimited Order-Only):</span>
                      <span className="font-bold text-[#0F172A]">₦0 (100% FREE)</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5">
                      <span>Housekeeping &amp; Kitchen Display App Instances:</span>
                      <span className="font-bold text-[#0F172A]">₦0 (100% FREE)</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5">
                      <span>Billable Cashier POS Units (3 Stations @ ₦20,000/mo):</span>
                      <span className="font-bold text-[#0F172A]">₦60,000</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5">
                      <span>Annual Billing Deduction Applied (20% Direct Discount):</span>
                      <span className="font-bold text-[#0F172A]">-₦12,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>[!] PROJECTED THEFT RECOVERY: F&amp;B Recipe BOM Prevention:</span>
                      <span className="font-bold text-[#0F172A]">+₦750,000 / Mo</span>
                    </div>
                    <div className="border-t border-[#0F172A] pt-1 mt-1 text-center bg-[#F8FAFC]">
                      <span className="font-jakarta text-[7.5pt] font-extrabold text-[#0F172A] block">
                        NET OPERATIONAL VALUE: Software Cost: ₦48,000/mo │ Est. Theft Recovered: ₦750,000/mo
                      </span>
                      <span className="font-mono-cad text-[6pt] text-[#475569]">
                        RETURN ON INVESTMENT: Zuri POS Hub pays for itself 15.6x over every single month!
                      </span>
                    </div>
                  </div>

                  <div className="border border-[#0F172A] bg-[#0F172A] text-white p-1.5 rounded-[2px] text-center font-mono-cad text-[7pt] font-bold">
                    [■] Deploy 3 Terminals Now — Lock in Guaranteed ₦0 Free PMS Tier on WhatsApp (06)
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE E
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Mode Toggle</td>
                        <td className="py-1 font-sans leading-tight">
                          Dual-tab state controller switching between cost schedule and operational ROI calculations.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Theft Formula</td>
                        <td className="py-1 font-sans leading-tight">
                          Shrinkage Recovery: `Turnover * 0.15 = ProjectedTheftRecovery`. Models 15% revenue leakage eliminated via recipe BOM tracking.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Linear Slider</td>
                        <td className="py-1 font-sans leading-tight">
                          Range: Min = 1, Max = 50, Step = 1, Default = 3. Throttled via `requestAnimationFrame` to eliminate DOM thrashing.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Rate Schedule</td>
                        <td className="py-1 font-sans leading-tight">
                          Tier 1 (1–5 Stations): ₦25,000/mo &bull; Tier 2 (6–15 Stations): ₦20,000/mo &bull; Tier 3 (16+ Stations): ₦15,000/mo. Annual discount = 20% deduction.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(05)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Transparency</td>
                        <td className="py-1 font-sans leading-tight">
                          Core PRD business model: PMS and unlimited rooms remain ₦0 forever.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(06)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">WhatsApp Serializer</td>
                        <td className="py-1 font-sans leading-tight">
                          Dynamic URI Serializer formats terminal count, plan type, and calculated investment into RFC 3986 click string.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-104" sheetTitle="CAPITAL ROI MACHINERY & THEFT RECOVERY ENGINE" pageNum="5" totalPages="7" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHEET A-105: STRUCTURAL ACCESS CONTROL & HARDWARE COMPATIBILITY           */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">INTEGRATION SCHEMATIC // HARDWARE SPECIFICATION</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">REGIONAL AUTHORITY &amp; LEGACY HARDWARE INTEGRATION</h2>
                  </div>

                  {/* ROW 1: COMPATIBILITY WIZARD & ACCESS MATRIX */}
                  <div className="grid grid-cols-2 gap-2 mb-2.5">
                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">LEGACY HARDWARE WIZARD</span>
                        <span className="text-[#0F172A] font-bold">(01)</span>
                      </div>
                      <p className="font-mono-cad text-[5.5pt] text-[#475569] mb-1.5">Connect existing equipment. Save millions.</p>
                      <div className="space-y-1 font-mono-cad text-[6pt]">
                        <div>
                          <span className="text-[#94A3B8] block">Select Door Lock Brand:</span>
                          <div className="border border-[#0F172A] p-1 flex justify-between">
                            <span className="font-bold text-[#0F172A]">Adel RFID Door Locks</span>
                            <span>v</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[#94A3B8] block">Select Thermal Printer:</span>
                          <div className="border border-[#0F172A] p-1 flex justify-between">
                            <span className="font-bold text-[#0F172A]">Epson TM-T88V Printer</span>
                            <span>v</span>
                          </div>
                        </div>
                        <div className="border border-[#0F172A] bg-[#F8FAFC] p-1 font-bold text-[#0F172A] text-center mt-1">
                          RESULT: "100% Compatible via Zuri Serial/LAN HAL"
                        </div>
                      </div>
                    </div>

                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">ACCESS &amp; ELEVATOR MATRIX</span>
                        <span className="text-[#0F172A] font-bold">(02)</span>
                      </div>
                      <p className="font-mono-cad text-[5.5pt] text-[#475569] mb-1">Active Card: Room 805 (Floor 8)</p>
                      <div className="space-y-0.5 font-mono-cad text-[5.5pt]">
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[✓] Floor 8: Assigned Room</span><span className="font-bold text-[#0F172A]">GRANTED</span></div>
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[X] Floors 4-7: Restricted</span><span className="font-bold text-[#0F172A]">DENIED</span></div>
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[✓] Floor 3: Pool &amp; Gym</span><span className="font-bold text-[#0F172A]">GRANTED</span></div>
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[✓] Floor 2: Dining Lounge</span><span className="font-bold text-[#0F172A]">GRANTED</span></div>
                        <div className="flex justify-between"><span>[✓] Floor 1: Reception Desk</span><span className="font-bold text-[#0F172A]">GRANTED</span></div>
                      </div>
                      <p className="font-mono-cad text-[5.5pt] text-[#475569] mt-1 pt-1 border-t border-[#E2E8F0]">
                        OFFLINE: Sector permissions written to card. Zero WAN needed.
                      </p>
                    </div>
                  </div>

                  {/* ROW 2: CORPORATE HQ & LEGAL VAULT */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-[#F8FAFC]">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">PHYSICAL CORPORATE HQ</span>
                        <span className="text-[#0F172A] font-bold">(03)</span>
                      </div>
                      <p className="font-jakarta text-[7pt] font-extrabold text-[#0F172A]">ZURI TECHNOLOGIES LIMITED</p>
                      <p className="font-sans text-[6pt] text-[#475569] leading-tight mt-0.5">
                        Plot 14, Commercial Boulevard, Victoria Island, Lagos State, Federal Republic of Nigeria.<br />
                        Official Inbound Desk: +234 (01) 234-ZURI &bull; support@zuripos.com
                      </p>
                    </div>

                    <div className="border border-[#0F172A] p-2 rounded-[2px] bg-[#F8FAFC]">
                      <div className="flex justify-between items-center mb-1 font-mono-cad text-[6.5pt]">
                        <span className="font-bold text-[#0F172A]">COMPLIANCE &amp; LEGAL VAULT</span>
                        <span className="text-[#0F172A] font-bold">(04)</span>
                      </div>
                      <div className="space-y-0.5 font-mono-cad text-[5.5pt]">
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[↓] Master Services Agreement (MSA)</span><span className="font-bold text-[#0F172A]">[PDF]</span></div>
                        <div className="flex justify-between border-b border-[#E2E8F0] pb-0.5"><span>[↓] Service Level Agreement (99.95% SLA)</span><span className="font-bold text-[#0F172A]">[PDF]</span></div>
                        <div className="flex justify-between"><span>[↓] NDPR Compliance Certification</span><span className="font-bold text-[#0F172A]">[PDF]</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE F
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Hardware HAL</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Door Locks: Adel, Orbita, Vingcard, Betech, TTLock (USB/Serial FIAS bridge). Printers: Epson, Star Micronics, Xprinter, Bixolon (ESC/POS socket protocol). Zero hardware replacement costs.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Data-on-Card</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Keycard (Mifare Classic 1K / DESFire EV2) sector schema: `[Room_ID] + [Valid_From] + [Valid_To] + [Elevator_Bitmask]`. Offline lock validation via internal RTC.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Trust Anchor</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Physical corporate footprint in Victoria Island, Lagos establishes domestic enterprise presence and on-premise technician dispatch.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-bold text-[#0F172A]">(04)</td>
                        <td className="py-1.5 font-semibold text-[#0F172A]">Legal Assets</td>
                        <td className="py-1.5 font-sans leading-tight">
                          Downloadable regulatory and operational contracts validating Nigerian enterprise data protection compliance and institutional governance.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-105" sheetTitle="STRUCTURAL ACCESS CONTROL & HARDWARE COMPATIBILITY" pageNum="6" totalPages="7" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SHEET A-106: LEAD PIPELINE & STRUCTURAL STRESS MATRIX                    */}
        {/* ========================================================================= */}
        <div className="cad-sheet">
          <div className="border-[2px] border-[#0F172A] p-2 h-full flex flex-col justify-between relative">
            <RulerCoordinates />
            
            <div className="flex h-[92%] w-full">
              {/* LEFT 60%: GRAPHICAL BLUEPRINT CANVAS */}
              <div className="w-[59%] flex flex-col justify-between pr-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2.5">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">PIPELINE SCHEMATIC // CONVERSION INTAKE</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ON-PREMISE DEPLOYMENT &amp; AUDIT INTAKE FUNNEL</h2>
                  </div>

                  {/* LEAD FORM SCHEMATIC */}
                  <div className="border border-[#0F172A] p-2 rounded-[2px] bg-white mb-2 space-y-1.5">
                    <div className="flex justify-between items-center mb-0.5 font-mono-cad text-[6.5pt]">
                      <span className="font-bold text-[#0F172A]">DEMO LEAD ENGINE SPECIFICATION</span>
                      <span className="text-[#0F172A] font-bold">(01)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 font-mono-cad text-[6pt]">
                      <div>
                        <span className="text-[#94A3B8] block">Property Commercial Name:</span>
                        <div className="border border-[#CBD5E1] p-1 text-[#475569]">Eko Horizon Suites &amp; Towers</div>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] block">Total Room Capacity:</span>
                        <div className="border border-[#CBD5E1] p-1 text-[#0F172A] font-bold flex justify-between">
                          <span>21 - 50 Rooms</span>
                          <span>v</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 font-mono-cad text-[6pt]">
                      <div>
                        <span className="text-[#94A3B8] block">Active Cashier POS Needed:</span>
                        <div className="border border-[#CBD5E1] p-1 text-[#0F172A] font-bold">3 Cashier Stations</div>
                      </div>
                      <div>
                        <span className="text-[#94A3B8] block">Operating Territory:</span>
                        <div className="border border-[#CBD5E1] p-1 text-[#0F172A] font-bold flex justify-between">
                          <span>Lagos State</span>
                          <span>v</span>
                        </div>
                      </div>
                    </div>

                    <div className="font-mono-cad text-[6pt]">
                      <span className="text-[#94A3B8] block">Director WhatsApp Phone Number:</span>
                      <div className="border border-[#0F172A] p-1 font-bold text-[#0F172A] bg-[#F8FAFC]">
                        +234 801 234 5678
                      </div>
                    </div>

                    <div className="border border-[#0F172A] bg-[#0F172A] text-white p-1.5 rounded-[2px] text-center font-mono-cad text-[6.5pt] font-bold">
                      [■] Submit Deployment Request — Secure Guaranteed ₦0 PMS Free Tier License (02)
                    </div>
                  </div>

                  {/* MASTER SITE DIRECTORY */}
                  <div className="border border-[#E2E8F0] p-1.5 rounded-[2px] bg-[#F8FAFC] font-mono-cad text-[5.5pt]">
                    <div className="flex justify-between items-center mb-1 text-[#0F172A] font-bold">
                      <span>MASTER SITE DIRECTORY &amp; INFRASTRUCTURE MONITOR</span>
                      <span>(03)</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[#475569]">
                      <div>
                        <strong className="text-[#0F172A] block">ZURI POS HUB</strong>
                        <span>Unified African OS</span>
                      </div>
                      <div>
                        <strong className="text-[#0F172A] block">PLATFORM CORE</strong>
                        <span>- ZuriPMS Tape</span>
                        <span className="block">- ZuriPOS Mesh</span>
                      </div>
                      <div>
                        <strong className="text-[#0F172A] block">MONITOR</strong>
                        <span>- Cloud: 100% Green</span>
                        <span className="block">- Air-Gapped LAN</span>
                      </div>
                      <div>
                        <strong className="text-[#0F172A] block">REGULATORY</strong>
                        <span>- NDPR Certified</span>
                        <span className="block">- Master Agreement</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1">
                  CANVAS RECT: 772PX × 720PX // DRAFTING PLANE G
                </div>
              </div>

              {/* CENTER GUTTER DIVISION */}
              <div className="w-[2%] flex justify-center items-center">
                <div className="w-[0.75pt] h-full bg-[#CBD5E1]" />
              </div>

              {/* RIGHT 39%: ENGINEERING SCHEDULE OF WORKS */}
              <div className="w-[39%] flex flex-col justify-between pl-3">
                <div>
                  <div className="border-b border-[#0F172A] pb-1.5 mb-2">
                    <span className="font-mono-cad text-[7pt] text-[#475569] uppercase tracking-wider block">DISCIPLINE: SPECIFICATION LEDGER</span>
                    <h2 className="font-jakarta text-[11pt] font-extrabold text-[#0F172A]">ENGINEERING SCHEDULE OF WORKS</h2>
                  </div>

                  <table className="w-full border-collapse font-mono-cad text-[6.5pt] text-left mb-2">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-[#0F172A]">
                        <th className="py-1 w-10">CALLOUT</th>
                        <th className="py-1 w-24">DISCIPLINE</th>
                        <th className="py-1">ENGINEERING MANDATE &amp; GOVERNANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(01)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Field Masking</td>
                        <td className="py-1 font-sans leading-tight">
                          Phone regex: `^(\+234|0)[789][01]\d{8}$`. States: Pre-populated select containing all 36 Nigerian States + FCT Abuja.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(02)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Intake Pipeline</td>
                        <td className="py-1 font-sans leading-tight">
                          1. Generate UUID Idempotency-Key &bull; 2. Mirror state to `localStorage` on keystroke &bull; 3. Submit payload to `/api/v1/leads/intake`.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 font-bold text-[#0F172A]">(03)</td>
                        <td className="py-1 font-semibold text-[#0F172A]">Master Index</td>
                        <td className="py-1 font-sans leading-tight">
                          Global sitemap and infrastructure health monitor anchor.
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* STRUCTURAL STRESS-TEST & FAILURE MODES MATRIX */}
                  <div className="border border-[#0F172A] p-1.5 rounded-[2px] bg-[#F8FAFC]">
                    <span className="font-mono-cad text-[6.5pt] font-bold text-[#0F172A] block mb-1">
                      STRUCTURAL STRESS-TEST &amp; FAILURE MODES MATRIX
                    </span>
                    <table className="w-full border-collapse font-mono-cad text-[6pt] text-left">
                      <thead>
                        <tr className="border-b border-[#0F172A] text-[#0F172A]">
                          <th className="py-0.5 w-4">#</th>
                          <th className="py-0.5 w-16">SURFACE</th>
                          <th className="py-0.5">ARCHITECTURAL MITIGATION STRATEGY</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                        <tr>
                          <td className="py-0.5 font-bold text-[#0F172A]">1</td>
                          <td className="py-0.5 font-semibold text-[#0F172A]">Slider Drag</td>
                          <td className="py-0.5 font-sans leading-tight">Throttled via `requestAnimationFrame`. Math calculated in memory; DOM updated without repaint.</td>
                        </tr>
                        <tr>
                          <td className="py-0.5 font-bold text-[#0F172A]">2</td>
                          <td className="py-0.5 font-semibold text-[#0F172A]">Lead Pipeline</td>
                          <td className="py-0.5 font-sans leading-tight">Form cached in `localStorage`. If POST fails, fallback routes directly to WhatsApp.</td>
                        </tr>
                        <tr>
                          <td className="py-0.5 font-bold text-[#0F172A]">3</td>
                          <td className="py-0.5 font-semibold text-[#0F172A]">Air-Gap Mesh</td>
                          <td className="py-0.5 font-sans leading-tight">Vector Clocks (CRDT): Transactions stamped with Station GUID + Sequence ID; merged by order.</td>
                        </tr>
                        <tr>
                          <td className="py-0.5 font-bold text-[#0F172A]">4</td>
                          <td className="py-0.5 font-semibold text-[#0F172A]">Client Login</td>
                          <td className="py-0.5 font-sans leading-tight">Stateless routing: Hard navigation directly to root domain broker (`app.zuripos.com/login`).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="font-mono-cad text-[6pt] text-[#94A3B8] border-t border-[#E2E8F0] pt-1 flex justify-between">
                  <span>SCALE: 1:1 @ 1440 × 810</span>
                  <span>STATUS: ISSUED FOR CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* CAD TITLE BLOCK */}
            <TitleBlock sheetNo="SHEET A-106" sheetTitle="LEAD ACQUISITION PIPELINE & STRUCTURAL STRESS MATRIX" pageNum="7" totalPages="7" />
          </div>
        </div>

      </div>
    </div>
  );
}

// CAD PERIMETER RULER COORDINATES & REGISTRATION MARKS
function RulerCoordinates() {
  return (
    <>
      <span className="absolute -top-1.5 -left-1.5 font-mono-cad text-[8pt] text-[#0F172A] font-bold select-none">+</span>
      <span className="absolute -top-1.5 -right-1.5 font-mono-cad text-[8pt] text-[#0F172A] font-bold select-none">+</span>
      <span className="absolute -bottom-1.5 -left-1.5 font-mono-cad text-[8pt] text-[#0F172A] font-bold select-none">+</span>
      <span className="absolute -bottom-1.5 -right-1.5 font-mono-cad text-[8pt] text-[#0F172A] font-bold select-none">+</span>

      <div className="absolute top-0 left-10 right-10 flex justify-between font-mono-cad text-[5.5pt] text-[#94A3B8] -translate-y-2 select-none">
        <span>ZONE 1</span><span>ZONE 2</span><span>ZONE 3</span><span>ZONE 4</span><span>ZONE 5</span><span>ZONE 6</span>
      </div>
    </>
  );
}

// CAD ENGINEERING TITLE BLOCK PRIMITIVE
function TitleBlock({ sheetNo, sheetTitle, pageNum, totalPages }) {
  return (
    <div className="border-t-[1.5px] border-[#0F172A] pt-1 mt-1 grid grid-cols-12 gap-1 font-mono-cad text-[5.5pt] text-[#0F172A] bg-white">
      <div className="col-span-3 border-r border-[#CBD5E1] pr-1 flex flex-col justify-between">
        <span className="text-[#94A3B8] block">DRAWING SET // DISCIPLINE</span>
        <strong className="text-[6.5pt] text-[#0F172A] tracking-wider block">ZP-ARCH-CAD-001 // ARCHITECTURAL</strong>
      </div>
      <div className="col-span-4 border-r border-[#CBD5E1] pr-1 flex flex-col justify-between">
        <span className="text-[#94A3B8] block">PROJECT IDENTIFICATION</span>
        <span className="font-bold truncate text-[#0F172A]">ZURI POS HUB — HOSPITALITY OPERATING SYSTEM</span>
      </div>
      <div className="col-span-3 border-r border-[#CBD5E1] pr-1 flex flex-col justify-between">
        <span className="text-[#94A3B8] block">SHEET DESIGNATION</span>
        <strong className="text-[6.5pt] text-[#0F172A] truncate block">{sheetTitle}</strong>
      </div>
      <div className="col-span-2 text-right flex flex-col justify-between">
        <span className="text-[#94A3B8] block">REV 02 // PAGE</span>
        <strong className="text-[7pt] text-[#0F172A]">{sheetNo} ({pageNum}/{totalPages})</strong>
      </div>
    </div>
  );
}
