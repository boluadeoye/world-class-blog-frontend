"use client";
import { useState, useEffect } from "react";
import { 
  Download, Building2, Layers, ShieldCheck, CheckCircle2, 
  Zap, Clock, Database, Wifi, WifiOff, Key, FileText, 
  TrendingUp, BarChart3, ArrowRight, RefreshCw, Sliders, 
  Calendar, Wine, Sparkles, Smartphone, Lock, 
  Dumbbell, Shirt, ShoppingCart, Users, ArrowUpRight, Globe, Utensils, Hotel, Coins
} from "lucide-react";
import Link from "next/link";

// Subcomponents hoisted cleanly at the top
function DocHeader({ refCode, pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#022C22] pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#022C22] flex items-center justify-center text-[#D4AF37] font-black text-[10px]">ES</div>
        <span className="font-inter text-[8.5px] font-black uppercase tracking-[0.2em] text-[#022C22]">Eden Studios // Hospitality SaaS Blueprint</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[8.5px]">
        <span className="text-slate-400">{refCode}</span>
        <span className="font-bold text-[#022C22]">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t border-slate-300 text-slate-500 font-mono text-[7.5px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span>CONFIDENTIAL // EDEN STUDIOS COMMERCIAL PROPOSAL</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[#022C22] font-bold">EDEN ARCHITECTURE</span>
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
      </div>
    </footer>
  );
}

export default function SaaSBlueprint() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Eden_Studios_Hospitality_SaaS_Master_Blueprint";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

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
          #proposal-render, #proposal-render * { visibility: visible; }
          #proposal-render { 
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
            padding: 16mm 20mm 14mm 20mm; 
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-8 border-[#022C22] rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#022C22] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl">
            <Building2 size={36} />
          </div>

          <h1 className="font-playfair text-2xl font-black text-[#022C22] mb-2 uppercase">Eden Studios</h1>
          <p className="font-inter text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-8">Hospitality SaaS Master Blueprint</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-4 border-l-2 border-[#022C22] font-mono text-[10px] text-slate-500">
              <p className="animate-pulse">&gt; Compiling Architecture...</p>
            </div>
          ) : (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#022C22] hover:bg-[#064E3B] text-[#D4AF37] font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl"
            >
              <Download size={18} className="inline mr-2" /> Download Master Proposal (PDF)
            </button>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="proposal-render" className="hidden print:block text-[#000000]">
        
        {/* PAGE 1: EXECUTIVE OVERVIEW & MASTER ARCHITECTURE */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="01" />
          <main className="grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#022C22] text-[#D4AF37] px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-widest">Master Solution SOW</span>
                <span className="text-[#022C22] font-mono text-[8.5px] font-bold uppercase">// SaaS Multi-Tenant Platform</span>
              </div>
              <h1 className="font-playfair text-3xl font-black text-[#022C22] uppercase tracking-tight leading-[1.05] mb-2">
                Unified Hospitality &amp; Property Operating System
              </h1>
              <p className="font-inter text-xs text-slate-700 font-medium max-w-xl leading-relaxed">
                An all-in-one cloud platform engineered for hotel lodging, restaurant dining, bar point of sale, anti-theft recipe inventory, and IoT smart door access.
              </p>
              <div className="h-0.5 w-24 bg-[#D4AF37] my-3"></div>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#022C22] p-3.5 rounded-r-lg">
              <h3 className="font-inter text-xs font-black uppercase text-[#022C22] tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4AF37]" /> The SaaS Platform Vision
              </h3>
              <p className="font-inter text-[10.5px] leading-relaxed text-slate-800 text-justify">
                This project establishes an enterprise-grade Software-as-a-Service (SaaS) platform. Multiple hotel and restaurant clients operate as distinct tenants under one centralized system. Each property receives private, locked data security, automated offline sales continuity, and complete back-office inventory control.
              </p>
            </div>

            <div>
              <p className="font-mono text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-2">Figure 1.0: Centralized Multi-Tenant Ecosystem</p>
              <div className="border border-slate-300 rounded-xl p-3 bg-slate-50">
                <div className="grid grid-cols-5 gap-2 text-center text-[8.5px] font-inter font-bold">
                  <div className="bg-white border border-slate-300 p-2 rounded-lg">
                    <Hotel size={16} className="mx-auto mb-1 text-blue-700"/>
                    <p className="text-[#022C22]">Hotel PMS</p>
                    <p className="text-[7px] text-slate-500 font-mono mt-0.5">Rooms &amp; Folios</p>
                  </div>
                  <div className="bg-white border border-slate-300 p-2 rounded-lg">
                    <Utensils size={16} className="mx-auto mb-1 text-red-700"/>
                    <p className="text-[#022C22]">Food &amp; Bar POS</p>
                    <p className="text-[7px] text-slate-500 font-mono mt-0.5">Tables &amp; KDS</p>
                  </div>
                  <div className="bg-[#022C22] text-white p-2 rounded-lg shadow">
                    <Layers size={16} className="mx-auto mb-1 text-[#D4AF37]"/>
                    <p className="text-white">Central Brain</p>
                    <p className="text-[7px] text-amber-300 font-mono mt-0.5">Offline Engine</p>
                  </div>
                  <div className="bg-white border border-slate-300 p-2 rounded-lg">
                    <Database size={16} className="mx-auto mb-1 text-emerald-700"/>
                    <p className="text-[#022C22]">Recipe BOM</p>
                    <p className="text-[7px] text-slate-500 font-mono mt-0.5">Stock Depletion</p>
                  </div>
                  <div className="bg-white border border-slate-300 p-2 rounded-lg">
                    <Lock size={16} className="mx-auto mb-1 text-purple-700"/>
                    <p className="text-[#022C22]">Smart Access</p>
                    <p className="text-[7px] text-slate-500 font-mono mt-0.5">Doors &amp; Lifts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3.5 border-t border-slate-200 pt-3">
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#022C22] mb-1 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-700" /> Anti-Theft Guard
                </h4>
                <p className="font-inter text-[9px] leading-relaxed text-slate-700">Every gram of ingredient and bottle of drink is tracked automatically against live sales.</p>
              </div>
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#022C22] mb-1 flex items-center gap-1">
                  <WifiOff size={12} className="text-blue-700" /> 100% Offline Mode
                </h4>
                <p className="font-inter text-[9px] leading-relaxed text-slate-700">Operations never halt during internet cuts; data auto-syncs the second network returns.</p>
              </div>
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#022C22] mb-1 flex items-center gap-1">
                  <TrendingUp size={12} className="text-amber-700" /> Unified Folio
                </h4>
                <p className="font-inter text-[9px] leading-relaxed text-slate-700">Guests charge meals, drinks, laundry, and gym directly to their room with 1 single bill.</p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 2: RESTAURANT & BAR POINT OF SALE (POS) */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="02" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 01 // Front-of-House</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Point of Sale &amp; F&amp;B Engine
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                High-speed mobile ordering and kitchen routing designed to eliminate ticket delays and prevent unpaid walkouts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <Sliders size={13} className="text-blue-700" /> Visual Floor &amp; Table Layout
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Real-time color-coded map of dining areas (Main Floor, Pool Bar, VIP Lounge). Shows free tables, pending tickets, and printed checks at a glance.</p>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <Smartphone size={13} className="text-amber-700" /> Mobile Waiter Ordering
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Waiters take orders on tablets at tables. Tickets fire instantly to the kitchen and bar in &lt; 1 second, reducing customer wait times by 40%.</p>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <Utensils size={13} className="text-red-700" /> Kitchen Display System (KDS)
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Drinks route to the bar; food routes to the kitchen display screen with live timer warnings for delayed dishes, ending lost paper tickets.</p>
              </div>
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <Building2 size={13} className="text-emerald-700" /> Charge to Room (Zero-Fraud)
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Guests charge dining to their room. The system verifies active check-in status and credit limits automatically in real-time.</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Figure 1.1: Order Routing &amp; Room Folio Bridge</p>
              <div className="border border-slate-300 rounded-xl p-3 bg-white">
                <div className="flex items-center justify-between gap-2 text-center text-[8px] font-inter font-bold">
                  <div className="border-2 border-[#022C22] bg-slate-50 p-2 rounded-lg w-28">
                    <p className="text-[#022C22]">1. Waiter Order</p>
                    <p className="text-[6.5px] text-slate-500 font-normal mt-0.5">Handheld Tablet</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 shrink-0" />
                  <div className="border border-red-500 bg-red-50 p-2 rounded-lg w-28">
                    <p className="text-red-800">2. Kitchen Screen</p>
                    <p className="text-[6.5px] text-red-600 font-normal mt-0.5">Instant KDS Routing</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 shrink-0" />
                  <div className="border border-blue-500 bg-blue-50 p-2 rounded-lg w-28">
                    <p className="text-blue-800">3. Split Bill</p>
                    <p className="text-[6.5px] text-blue-600 font-normal mt-0.5">Cash / Card / Transfer</p>
                  </div>
                  <ArrowRight size={12} className="text-slate-400 shrink-0" />
                  <div className="border-2 border-emerald-700 bg-emerald-50 p-2 rounded-lg w-28">
                    <p className="text-emerald-900">4. Room Folio</p>
                    <p className="text-[6.5px] text-emerald-700 font-normal mt-0.5">Single Final Bill</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#022C22] text-white p-3 rounded-lg flex justify-between items-center text-xs">
              <div>
                <p className="font-inter font-bold text-[#D4AF37]">Fast Flexible Check Settlement</p>
                <p className="font-inter text-[9.5px] text-slate-200">Split by seat, item, percentage, or combine multiple payment methods seamlessly.</p>
              </div>
              <span className="bg-[#D4AF37] text-[#022C22] px-2.5 py-1 text-[8.5px] font-mono uppercase font-black rounded">Instant Checkout</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 3: HOTEL PMS & RECIPE INVENTORY */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="03" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 02 &amp; 03 // Lodging &amp; Inventory</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Hotel PMS &amp; Recipe Stock Control
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                Automates room reservations and depletes raw ingredients at the exact millisecond food or drinks are sold.
              </p>
            </div>

            {/* RECIPE DEPLETION IN ACTION */}
            <div className="border border-slate-300 rounded-xl p-3.5 bg-slate-50">
              <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1.5 flex items-center gap-1.5">
                <Database size={13} className="text-emerald-700" /> Automatic Stock Subtraction (Recipe Control)
              </h3>
              <p className="font-inter text-[9.5px] text-slate-700 mb-2 leading-relaxed">
                When a bartender sells <strong>1 Cocktail</strong>, the software automatically subtracts raw ingredients from inventory:
              </p>

              <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                <div className="bg-white p-2 border border-slate-300 rounded">
                  <p className="font-black text-[#000000] text-xs">-50 ml</p>
                  <p className="text-slate-600 text-[9px]">Rum</p>
                </div>
                <div className="bg-white p-2 border border-slate-300 rounded">
                  <p className="font-black text-[#000000] text-xs">-10 ml</p>
                  <p className="text-slate-600 text-[9px]">Syrup</p>
                </div>
                <div className="bg-white p-2 border border-slate-300 rounded">
                  <p className="font-black text-[#000000] text-xs">-1 Unit</p>
                  <p className="text-slate-600 text-[9px]">Lime</p>
                </div>
                <div className="bg-white p-2 border border-slate-300 rounded">
                  <p className="font-black text-[#000000] text-xs">-6 Leaves</p>
                  <p className="text-slate-600 text-[9px]">Mint</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="border border-slate-300 p-3 rounded-lg bg-white">
                <h4 className="font-inter text-[10px] font-black uppercase text-[#022C22] mb-1 flex items-center gap-1">
                  <Calendar size={13} className="text-blue-700" /> Live Room Calendar (Tape Chart)
                </h4>
                <p className="font-inter text-[9px] text-slate-700 leading-relaxed">Visual grid showing occupied, empty, and dirty rooms. Prevents double-booking completely.</p>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-white">
                <h4 className="font-inter text-[10px] font-black uppercase text-[#022C22] mb-1 flex items-center gap-1">
                  <ShieldCheck size={13} className="text-red-700" /> End-of-Shift Theft Alerts
                </h4>
                <p className="font-inter text-[9px] text-slate-700 leading-relaxed">Compares physical stock with sales made. If bottles are missing, the cashier cannot close without reporting.</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Figure 1.2: Housekeeping &amp; Room State Flow</p>
              <div className="border border-slate-300 rounded-xl p-3 bg-slate-50">
                <div className="grid grid-cols-4 gap-2 text-center text-[8px] font-inter font-bold">
                  <div className="p-1.5 border border-red-300 bg-red-50 rounded">
                    <p className="text-red-800">1. Checkout</p>
                    <span className="text-[6.5px] text-red-600 font-mono">Dirty</span>
                  </div>
                  <div className="p-1.5 border border-amber-300 bg-amber-50 rounded">
                    <p className="text-amber-800">2. Cleaner</p>
                    <span className="text-[6.5px] text-amber-600 font-mono">In Progress</span>
                  </div>
                  <div className="p-1.5 border border-blue-300 bg-blue-50 rounded">
                    <p className="text-blue-800">3. Supervisor</p>
                    <span className="text-[6.5px] text-blue-600 font-mono">Inspected</span>
                  </div>
                  <div className="p-1.5 border border-emerald-300 bg-emerald-50 rounded">
                    <p className="text-emerald-900">4. Reception</p>
                    <span className="text-[6.5px] text-emerald-700 font-mono">Ready to Book</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 4: OFFLINE CONTINUITY & MULTI-BRANCH */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="04" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 04 // Reliability &amp; Control</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Zero-Downtime Offline &amp; Multi-Branch
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                Guarantees continuous sales during internet cuts and gives owners real-time control over multiple hotel branches from a smartphone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <WifiOff size={14} className="text-blue-700" /> 100% Offline Operation
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">If MTN or Starlink cuts out, waiters keep taking orders, kitchen printers fire tickets, and receipts print over local Wi-Fi without stoppage.</p>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <RefreshCw size={14} className="text-emerald-700" /> Automatic Cloud Sync
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">The instant internet returns, all offline orders, room bookings, and stock depletions silently sync to the central database automatically.</p>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <Globe size={14} className="text-amber-700" /> Multi-Branch Head Office View
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Manage multiple properties from one master dashboard. Update menus globally or set different drink prices for each branch with 1 click.</p>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
                <h3 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1 flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-purple-700" /> Blind Shift Cash Drops
                </h3>
                <p className="font-inter text-[9.5px] text-slate-700 leading-relaxed">Cashiers must count and declare their physical cash before the system reveals expected totals, ending end-of-day register skimming.</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[8.5px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Figure 1.3: Continuous Local Terminal &amp; Cloud Sync Relay</p>
              <div className="border border-slate-300 rounded-xl p-3 bg-white">
                <div className="flex items-center justify-between gap-3 text-center text-[8.5px] font-inter font-bold">
                  <div className="border-2 border-blue-600 bg-blue-50 p-2 rounded-lg w-1/3">
                    <WifiOff size={14} className="mx-auto mb-1 text-blue-700"/>
                    <p className="text-blue-900">Local Terminals</p>
                    <p className="text-[6.5px] text-blue-600 font-mono mt-0.5">Local Storage</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] font-mono text-slate-400 uppercase">Auto-Sync</span>
                    <RefreshCw size={14} className="text-slate-400 my-1" />
                    <span className="text-[7px] font-mono text-emerald-700 uppercase">&lt; 200ms Relay</span>
                  </div>
                  <div className="border-2 border-[#022C22] bg-slate-900 text-white p-2 rounded-lg w-1/3">
                    <Globe size={14} className="mx-auto mb-1 text-[#D4AF37]"/>
                    <p className="text-white">Central Cloud</p>
                    <p className="text-[6.5px] text-slate-400 font-mono mt-0.5">Postgres Multi-Tenant</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-xs">
              <span className="font-bold text-[#022C22]">Tax &amp; Accounting Sync: </span>
              <span className="text-slate-700 text-[10px]">Calculates VAT, consumption tax, and outputs balanced accounting reports automatically.</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 5: THIRD-PARTY INFRASTRUCTURE & APIS */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="05" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 03 // Infrastructure Utilities</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Third-Party Services &amp; Cloud Breakdown
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                To guarantee enterprise speed, the platform connects to industry-standard cloud infrastructure on a direct client-funded utility model.
              </p>
            </div>

            {/* FULL DETAILED THIRD PARTY TABLE RESTORED */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-[9px] font-inter">
              <div className="grid grid-cols-12 bg-[#022C22] text-[#D4AF37] p-2.5 font-bold uppercase font-mono text-[8px]">
                <div className="col-span-3">Provider</div>
                <div className="col-span-6">Operational Role &amp; Purpose</div>
                <div className="col-span-3 text-right">Billing Type</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-white items-center">
                <div className="col-span-3 font-bold text-[#022C22]">AWS (Amazon Web Services)</div>
                <div className="col-span-6 text-slate-700">Application host servers, S3 asset storage (logos, receipts, guest IDs), and security firewalls.</div>
                <div className="col-span-3 text-right font-mono text-[#022C22] font-bold">Direct Account</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-slate-50 items-center">
                <div className="col-span-3 font-bold text-[#022C22]">Neon Serverless Postgres</div>
                <div className="col-span-6 text-slate-700">High-speed multi-tenant relational database with auto-scaling storage and isolated tenant vaults.</div>
                <div className="col-span-3 text-right font-mono text-[#022C22] font-bold">Direct Account</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-white items-center">
                <div className="col-span-3 font-bold text-[#022C22]">SMS Gateway (Termii / Twilio)</div>
                <div className="col-span-6 text-slate-700">Automated guest booking confirmation SMS, manager fraud alerts, and staff OTP logins.</div>
                <div className="col-span-3 text-right font-mono text-slate-700 font-bold">Usage-Based (Per SMS)</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-slate-50 items-center">
                <div className="col-span-3 font-bold text-[#022C22]">Payment Gateway (Paystack)</div>
                <div className="col-span-6 text-slate-700">Collection of monthly SaaS tenant subscription fees and online guest card settlements.</div>
                <div className="col-span-3 text-right font-mono text-slate-700 font-bold">Per Transaction Fee</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 bg-white items-center">
                <div className="col-span-3 font-bold text-[#022C22]">IoT Gateway Bridge (TTLock)</div>
                <div className="col-span-6 text-slate-700">Cloud API relay connecting room reservations to physical smart door lock keycard encoders.</div>
                <div className="col-span-3 text-right font-mono text-slate-700 font-bold">Direct API Tier</div>
              </div>
            </div>

            <div className="bg-[#022C22] text-white p-3.5 rounded-lg">
              <h4 className="font-inter text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                Direct Client Pass-Through Notice
              </h4>
              <p className="font-inter text-[9.5px] text-slate-200 leading-relaxed">
                All cloud accounts (AWS, Neon, SMS) are registered directly under the client&apos;s legal entity. The development fee covers full engineering and integration; server usage scales with business growth and is billed directly by providers.
              </p>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 6: MODULAR ADD-ON SUITE */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="06" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 04 // Modular Extensions</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Modular Add-On Enhancements
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                Specialized sub-systems engineered as modular plug-ins. These capabilities can be deployed independently based on client rollout phases.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 flex gap-3 items-start">
                <div className="w-8 h-8 bg-purple-100 text-purple-900 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Lock size={15} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-[#022C22]">Smart Locks, RFID Cards &amp; Elevator Relays</h3>
                    <span className="font-mono text-[7.5px] bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded font-bold">IoT Bridge</span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-relaxed mt-0.5">Program physical RFID cards in 1 second at reception or issue mobile Bluetooth keys. Restrict elevator access strictly to the guest&apos;s room floor.</p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 flex gap-3 items-start">
                <div className="w-8 h-8 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Building2 size={15} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-[#022C22]">Venue &amp; Conference Hall Management</h3>
                    <span className="font-mono text-[7.5px] bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold">Event Module</span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-relaxed mt-0.5">Rent event halls by the hour or day. Attach stage layouts (Banquet, Theater), sound equipment, and catering packages to one master invoice.</p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 flex gap-3 items-start">
                <div className="w-8 h-8 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Shirt size={15} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-[#022C22]">Laundry Operations &amp; Room Posting</h3>
                    <span className="font-mono text-[7.5px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">Valet Module</span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-relaxed mt-0.5">Barcode-tagged garment intake, dry-cleaning status tracking, and automated service fee posting directly to the guest room checkout bill.</p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 flex gap-3 items-start">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-900 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Dumbbell size={15} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-[#022C22]">Gym &amp; Wellness Membership Engine</h3>
                    <span className="font-mono text-[7.5px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">Membership</span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-relaxed mt-0.5">Recurring monthly/annual gym memberships, automated SMS expiry alerts, class schedules, and turnstile access control integration.</p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 flex gap-3 items-start">
                <div className="w-8 h-8 bg-cyan-100 text-cyan-900 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <ShoppingCart size={15} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-[#022C22]">WooCommerce 2-Way E-Commerce Relay</h3>
                    <span className="font-mono text-[7.5px] bg-cyan-100 text-cyan-900 px-1.5 py-0.5 rounded font-bold">2-Way Sync</span>
                  </div>
                  <p className="font-inter text-[9px] text-slate-700 leading-relaxed mt-0.5">Online food delivery orders from your website print directly in the kitchen. Stock changes update automatically in under 2 seconds.</p>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 7: INVESTMENT, 3 MILESTONES & SIGN-OFF */}
        <div className="a4-page">
          <DocHeader refCode="EDEN-SOW-2026-X1" pageNum="07" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 05 // Commercial Terms</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#022C22] mt-1 mb-1.5">
                Investment &amp; 3-Stage Milestone Schedule
              </h2>
              <p className="font-inter text-xs text-slate-700 leading-relaxed">
                Total professional engineering and UI/UX design investment structured into three clear delivery stages.
              </p>
            </div>

            {/* TOTAL INVESTMENT BOX */}
            <div className="border-2 border-[#022C22] bg-slate-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-black text-[#022C22] uppercase tracking-widest">Total Engineering &amp; Design Investment</p>
                <p className="font-inter text-[9.5px] text-slate-600 mt-0.5">Complete Multi-Tenant SaaS Platform &amp; Core Module Suite</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-[#022C22]">₦1,500,000</span>
                <span className="block font-mono text-[8px] text-slate-500 uppercase font-bold">Fixed Turnkey Fee</span>
              </div>
            </div>

            {/* 3 MILESTONES */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-[9px] font-inter">
              <div className="grid grid-cols-12 bg-[#022C22] text-[#D4AF37] p-2 font-bold uppercase font-mono text-[7.5px]">
                <div className="col-span-3">Milestone</div>
                <div className="col-span-6">Key Deliverables &amp; Criteria</div>
                <div className="col-span-3 text-right">Disbursement</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-white items-center">
                <div className="col-span-3 font-bold text-[#022C22]">Milestone 1 (40%)</div>
                <div className="col-span-6 text-slate-700">Project initiation, database schema architecture, UI/UX design system completion.</div>
                <div className="col-span-3 text-right font-mono font-bold text-[#022C22]">₦600,000</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 border-b border-slate-200 bg-slate-50 items-center">
                <div className="col-span-3 font-bold text-[#022C22]">Milestone 2 (40%)</div>
                <div className="col-span-6 text-slate-700">Working restaurant POS, table ordering, room calendar, recipe inventory live demo.</div>
                <div className="col-span-3 text-right font-mono font-bold text-[#022C22]">₦600,000</div>
              </div>

              <div className="grid grid-cols-12 p-2.5 bg-white items-center">
                <div className="col-span-3 font-bold text-[#022C22]">Milestone 3 (20%)</div>
                <div className="col-span-6 text-slate-700">Offline delta-sync engine, API endpoints, payment gateway integration, final deployment.</div>
                <div className="col-span-3 text-right font-mono font-bold text-emerald-800">₦300,000</div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-[#D4AF37] p-2.5 rounded-r-lg">
              <p className="font-inter text-[9.5px] text-slate-800 font-semibold leading-relaxed">
                <strong>Cloud Server Notice:</strong> Monthly cloud hosting (AWS / Neon database) and SMS alerts are direct utility costs billed to the client&apos;s account as the business expands.
              </p>
            </div>

            {/* GOVERNANCE & APPROVAL BLOCK */}
            <div className="border-t-2 border-[#022C22] pt-3 flex justify-between items-end">
              <div>
                <p className="font-mono text-[7.5px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Architectural Verification</p>
                <h3 className="font-playfair text-base font-black text-[#022C22] uppercase tracking-wide">
                  Eden Studios Architecture &amp; Design Group
                </h3>
                <p className="font-inter text-[8.5px] font-bold text-[#D4AF37] uppercase tracking-widest mt-0.5">
                  Commercial Solutions Engineering
                </p>
                <p className="font-mono text-[7.5px] text-slate-400 mt-0.5">Issue Date: {currentDate}</p>
              </div>

              <div className="border-2 border-[#022C22] p-2 rounded-lg text-center bg-slate-50 w-32">
                <p className="font-mono text-[6.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                <div className="flex items-center justify-center gap-1 text-[8px] font-black text-emerald-800">
                  <ShieldCheck size={11} />
                  <span>PROPOSAL READY</span>
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
