"use client";
import { useState, useEffect } from "react";
import { 
  Download, Hotel, Utensils, Layers, ShieldCheck, CheckCircle2, 
  Zap, Clock, Database, Wifi, WifiOff, Key, FileText, 
  TrendingUp, BarChart3, ArrowRight, RefreshCw, Sliders, 
  Calendar, Building2, Wine, Sparkles, Smartphone, Lock, 
  Dumbbell, Shirt, ShoppingCart, Users, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function HospitalityERPProposal() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Hospitality_ERP_Master_Solution_Blueprint";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #proposal-render, #proposal-render * { visibility: visible; }
          #proposal-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            padding: 18mm 20mm 15mm 20mm;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* VIEW 1: PORTAL (Screen Only) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#0F172A]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-400 shadow-xl">
            <Building2 size={36} />
          </div>

          <h1 className="font-playfair text-2xl font-black text-[#0F172A] mb-2">Hospitality Operating System</h1>
          <p className="font-inter text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-8">Master Scope & Solution Blueprint</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-4 border-l-2 border-[#0F172A] font-mono text-[10px] text-slate-500">
              <p className="animate-pulse">&gt; Compiling Architecture...</p>
            </div>
          ) : (
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl"
            >
              <Download size={18} />
              <span>Download Master Proposal (PDF)</span>
            </button>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* VIEW 2: THE 7-PAGE MASTER PROPOSAL (Print View) */}
      <div id="proposal-render" className="hidden print:block text-slate-900">
        
        {/* PAGE 1: EXECUTIVE BRIEF */}
        <div className="a4-page">
          <DocHeader refCode="PROP-HOSP-2026-X1" pageNum="01" />
          
          <main className="grow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#0F172A] text-white px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest">Master Technical Proposal</span>
                <span className="text-[#D4AF37] font-mono text-[9px] font-bold uppercase">// Enterprise Hospitality Suite</span>
              </div>
              <h1 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-tight leading-[1.05] mb-3">
                Unified Hospitality<br/>&amp; Property Operating System
              </h1>
              <p className="font-inter text-xs text-slate-600 font-medium max-w-xl leading-relaxed">
                An all-in-one distributed platform bridging Point of Sale (POS), Property Management (PMS), Recipe Costing, Anti-Theft Inventory, IoT Smart Access, and Cloud Accounting.
              </p>
              <div className="h-0.5 w-24 bg-[#D4AF37] my-4"></div>
            </div>

            <div className="bg-slate-50 border-l-4 border-[#0F172A] p-4 rounded-r-lg">
              <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] tracking-wider mb-1.5 flex items-center gap-2">
                <Sparkles size={14} className="text-[#D4AF37]" /> Executive Vision
              </h3>
              <p className="font-inter text-[11px] leading-relaxed text-slate-700 text-justify">
                Modern hospitality operations face massive revenue leakages due to fragmented systems—where the restaurant POS, front-desk bookings, inventory storerooms, and room keycard encoders operate in isolation. This blueprint presents an **Integrated Operating System** that unifies all departments under a single real-time ledger, guaranteeing zero-downtime offline continuity and total management visibility across all branches.
              </p>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Figure 1.0: Centralized Architectural Nervous System</p>
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-inter font-bold">
                  <div className="bg-white border border-slate-200 p-2.5 rounded-lg">
                    <Hotel size={18} className="mx-auto mb-1 text-blue-600"/>
                    <p className="text-[#0F172A]">Hotel PMS</p>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Rooms &amp; Folios</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-lg">
                    <Utensils size={18} className="mx-auto mb-1 text-red-600"/>
                    <p className="text-[#0F172A]">Food &amp; Bar POS</p>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Tables &amp; KDS</p>
                  </div>
                  <div className="bg-[#0F172A] text-white p-2.5 rounded-lg shadow-md">
                    <Layers size={18} className="mx-auto mb-1 text-amber-400"/>
                    <p className="text-white">Central Brain</p>
                    <p className="text-[7px] text-amber-300 font-mono mt-0.5">Offline-First Engine</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-lg">
                    <Database size={18} className="mx-auto mb-1 text-emerald-600"/>
                    <p className="text-[#0F172A]">Recipe BOM</p>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Stock Depletion</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-lg">
                    <Lock size={18} className="mx-auto mb-1 text-purple-600"/>
                    <p className="text-[#0F172A]">Smart Access</p>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Doors &amp; Lifts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4">
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#0F172A] mb-1 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-600" /> Anti-Theft Guard
                </h4>
                <p className="font-inter text-[9.5px] leading-relaxed text-slate-600">
                  Every gram of ingredient and milliliter of liquor is tracked against real-time sales, stopping leakages.
                </p>
              </div>
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#0F172A] mb-1 flex items-center gap-1.5">
                  <WifiOff size={12} className="text-blue-600" /> Zero Downtime
                </h4>
                <p className="font-inter text-[9.5px] leading-relaxed text-slate-600">
                  Terminals operate 100% offline during internet cuts, syncing with the cloud instantly when restored.
                </p>
              </div>
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-[#0F172A] mb-1 flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-amber-600" /> Unified Invoicing
                </h4>
                <p className="font-inter text-[9.5px] leading-relaxed text-slate-600">
                  Guests charge restaurant bills, laundry, gym, and spa services straight to their room with one bill.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 2: RESTAURANT & BAR POINT OF SALE (POS) */}
        <div className="a4-page">
          <DocHeader refCode="PROP-HOSP-2026-X1" pageNum="02" />
          
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 01 // Front-of-House Operations</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#0F172A] mt-1 mb-2">
                Point of Sale &amp; F&amp;B Engine
              </h2>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                Engineered for extreme speed during peak dinner and weekend bar rushes, eliminating order bottlenecks between waiters, kitchen staff, and cashiers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 p-3.5 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1 flex items-center gap-2">
                  <Sliders size={14} className="text-blue-600" /> Visual Floor &amp; Table Layout
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Interactive real-time map of all dining areas (Main Floor, Poolside, VIP Lounge, Terrace). Color-coded states show occupied tables, reserved spots, pending tickets, and printed checks.
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1 flex items-center gap-2">
                  <Smartphone size={14} className="text-amber-600" /> Mobile Waiter Ordering
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Waiters take orders at table-side on lightweight handheld tablets. Orders fire directly to the kitchen/bar in under 1 second, reducing guest wait times by over 40%.
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1 flex items-center gap-2">
                  <Utensils size={14} className="text-red-600" /> Kitchen Display &amp; Routing (KDS)
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Eliminates missing paper tickets. Drink items route directly to the bartender&apos;s display or thermal printer; food items route to the kitchen with live timer warnings for delayed dishes.
                </p>
              </div>

              <div className="border border-slate-200 p-3.5 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1 flex items-center gap-2">
                  <Building2 size={14} className="text-emerald-600" /> Zero-Fraud Room Folio Charge
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Guests charge dining directly to their hotel room. The system automatically validates active check-in status and spending credit limits in real-time, preventing walkout bills.
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Figure 1.1: F&amp;B Order Routing &amp; Room Folio Bridge</p>
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between gap-2 text-center text-[8.5px] font-inter">
                  <div className="border-2 border-slate-900 bg-slate-50 p-2 rounded-lg w-28">
                    <p className="font-black text-[#0F172A]">1. Table Order</p>
                    <p className="text-[7px] text-slate-500 mt-0.5">Waiter Tablet</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 shrink-0" />
                  <div className="border border-red-500 bg-red-50 p-2 rounded-lg w-28">
                    <p className="font-black text-red-700">2. KDS Routing</p>
                    <p className="text-[7px] text-red-500 mt-0.5">Kitchen / Bar Display</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 shrink-0" />
                  <div className="border border-blue-500 bg-blue-50 p-2 rounded-lg w-28">
                    <p className="font-black text-blue-700">3. Split Bill</p>
                    <p className="text-[7px] text-blue-500 mt-0.5">Cash / Card / Split</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 shrink-0" />
                  <div className="border-2 border-emerald-600 bg-emerald-50 p-2 rounded-lg w-28">
                    <p className="font-black text-emerald-800">4. Room Folio</p>
                    <p className="text-[7px] text-emerald-600 mt-0.5">Single Checkout Bill</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-bold text-amber-400">Fast Flexible Check Settlement</p>
                <p className="font-inter text-[10px] text-slate-300">Split by seat, by individual item, by equal percentage, or combine multiple tender methods seamlessly.</p>
              </div>
              <span className="bg-white/10 text-white px-3 py-1 text-[9px] font-mono uppercase font-bold rounded">Instant Settlement</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 3: HOTEL PMS & ROOM RESERVATIONS */}
        <div className="a4-page">
          <DocHeader refCode="PROP-HOSP-2026-X1" pageNum="03" />
          
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 02 // Accommodation Management</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#0F172A] mt-1 mb-2">
                Property Management (PMS) Engine
              </h2>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                Centralized front-desk orchestration handling guest check-in, real-time room availability, corporate rate plans, and housekeeping workflows.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex gap-3.5 items-start p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Calendar size={16} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-bold uppercase text-[#0F172A]">Interactive Tape-Chart Reservation Matrix</h3>
                  <p className="font-inter text-[10px] text-slate-600 leading-relaxed mt-0.5">
                    Visual grid calendar showing room occupancy across days and months. Staff can drag-and-drop to extend reservations, upgrade room categories, or resolve double-booking conflicts with one click.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-8 h-8 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-bold uppercase text-[#0F172A]">Guest Profiles &amp; Loyalty Tiers</h3>
                  <p className="font-inter text-[10px] text-slate-600 leading-relaxed mt-0.5">
                    Categorizes walk-ins, VIPs, corporate accounts, and blacklisted profiles. Tracks full visit history, personalized preferences (e.g., extra pillows, high floor), and lifetime revenue contribution.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-bold uppercase text-[#0F172A]">Housekeeping &amp; Room State Machine</h3>
                  <p className="font-inter text-[10px] text-slate-600 leading-relaxed mt-0.5">
                    Cleaners update room status from their mobile devices (`Dirty` &rarr; `In Cleaning` &rarr; `Inspected &amp; Ready`). Front desk cannot assign a guest to an uninspected room by mistake.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Figure 1.2: Housekeeping &amp; Reservation Lifecycle</p>
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="grid grid-cols-4 gap-2 text-center text-[8.5px] font-inter">
                  <div className="p-2 border border-red-200 bg-red-50 rounded-lg">
                    <p className="font-bold text-red-700">1. Guest Checkout</p>
                    <span className="bg-red-200 text-red-800 px-1.5 py-0.2 text-[6.5px] font-mono uppercase font-bold rounded">Dirty</span>
                  </div>
                  <div className="p-2 border border-amber-200 bg-amber-50 rounded-lg">
                    <p className="font-bold text-amber-700">2. Housekeeper</p>
                    <span className="bg-amber-200 text-amber-800 px-1.5 py-0.2 text-[6.5px] font-mono uppercase font-bold rounded">Cleaning</span>
                  </div>
                  <div className="p-2 border border-blue-200 bg-blue-50 rounded-lg">
                    <p className="font-bold text-blue-700">3. Supervisor</p>
                    <span className="bg-blue-200 text-blue-800 px-1.5 py-0.2 text-[6.5px] font-mono uppercase font-bold rounded">Inspected</span>
                  </div>
                  <div className="p-2 border border-emerald-200 bg-emerald-50 rounded-lg">
                    <p className="font-bold text-emerald-700">4. Front Desk</p>
                    <span className="bg-emerald-200 text-emerald-800 px-1.5 py-0.2 text-[6.5px] font-mono uppercase font-bold rounded">Ready / Check-in</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[10px]">
              <div>
                <span className="font-bold text-[#0F172A]">Automated Night Audit: </span>
                <span className="text-slate-600">Calculates daily room revenues, posts tax charges, and locks daily ledger automatically.</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Auto-Reconcile</span>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 4: RECIPE COSTING & INVENTORY (BOM) */}
        <div className="a4-page">
          <DocHeader refCode="PROP-HOSP-2026-X1" pageNum="04" />
          
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 03 // Back-of-House Control</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#0F172A] mt-1 mb-2">
                Recipe Costing &amp; Inventory BOM
              </h2>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                Stops inventory theft and calculates true gross margins by automatically depleting raw ingredients at the exact millisecond an order is placed.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-2 flex items-center gap-2">
                <Database size={14} className="text-emerald-600" /> Bill of Materials (BOM) In Action
              </h3>
              <p className="font-inter text-[10px] text-slate-600 mb-3 leading-relaxed">
                When a bartender sells one <strong>"Premium Mojito"</strong> at the pool bar, the system automatically runs a silent background depletion:
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[8px] font-mono">
                <div className="bg-white p-2 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">-50 ml</p>
                  <p className="text-slate-500">White Rum</p>
                </div>
                <div className="bg-white p-2 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">-10 ml</p>
                  <p className="text-slate-500">Sugar Syrup</p>
                </div>
                <div className="bg-white p-2 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">-1 Unit</p>
                  <p className="text-slate-500">Fresh Lime</p>
                </div>
                <div className="bg-white p-2 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900">-6 Leaves</p>
                  <p className="text-slate-500">Fresh Mint</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3.5">
              <div className="border border-slate-200 p-3 rounded-lg bg-white">
                <h4 className="font-inter text-[10.5px] font-black uppercase text-[#0F172A] mb-1 text-red-700">Anti-Theft Variance Alerts</h4>
                <p className="font-inter text-[9px] text-slate-600 leading-relaxed">
                  Compares physical stock counts with expected sales depletion at every shift handover. Flags missing liquor or meat weights immediately.
                </p>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg bg-white">
                <h4 className="font-inter text-[10.5px] font-black uppercase text-[#0F172A] mb-1 text-blue-700">Production Pre-Batching</h4>
                <p className="font-inter text-[9px] text-slate-600 leading-relaxed">
                  Converts bulk raw goods (flour, butter, sugar) into pre-made kitchen assets (pastries, marinades) with automated batch expiry dates.
                </p>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg bg-white">
                <h4 className="font-inter text-[10.5px] font-black uppercase text-[#0F172A] mb-1 text-emerald-700">Inter-Branch Transfers</h4>
                <p className="font-inter text-[9px] text-slate-600 leading-relaxed">
                  Seamlessly request and transfer crates of drinks from Central Stores to Satellite Bars with two-step manager sign-off approval.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-bold text-amber-400">Automated Low-Stock Purchase Orders</p>
                <p className="font-inter text-[10px] text-slate-300">Generates supplier POs when ingredients breach safe minimum thresholds.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">Zero Stock-Outs</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 5: OFFLINE ZERO DOWNTIME & MULTI-BRANCH CLOUD */}
        <div className="a4-page">
          <DocHeader refCode="PROP-HOSP-2026-X1" pageNum="05" />
          
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">Module 04 // Reliability &amp; Scalability</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-[#0F172A] mt-1 mb-2">
                Offline Resilience &amp; Multi-Branch Control
              </h2>
              <p className="font-inter text-xs text-slate-600 leading-relaxed">
                Guarantees zero operational stoppage during internet cuts, while empowering owners to manage multi-location hotels and restaurants from anywhere.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1.5 flex items-center gap-2">
                  <WifiOff size={16} className="text-blue-600" /> True Local-First Offline Operation
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  If the ISP drops completely, the entire property keeps operating. Waiters take orders, kitchen printers fire tickets over local WiFi, bills settle, and cash drawers open without interruption.
                </p>
              </div>

              <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1.5 flex items-center gap-2">
                  <RefreshCw size={16} className="text-emerald-600" /> Self-Healing Cloud Delta Sync
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  The exact second internet connection is restored, all offline sales, room updates, and stock depletions silently synchronize to the central cloud database without duplicating records.
                </p>
              </div>

              <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1.5 flex items-center gap-2">
                  <Globe size={16} className="text-amber-600" /> Multi-Branch Central Command
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Manage 5 properties or satellite restaurants from one master executive dashboard. Push global menu changes or set localized branch-specific prices with one click.
                </p>
              </div>

              <div className="border border-slate-200 p-4 rounded-lg bg-slate-50/50">
                <h3 className="font-inter text-xs font-black uppercase text-[#0F172A] mb-1.5 flex items-center gap-2">
                  <BarChart3 size={16} className="text-purple-600" /> Blind Shift Drops (Z-Report)
                </h3>
                <p className="font-inter text-[10px] text-slate-600 leading-relaxed">
                  Cashiers must count and declare their physical drawer cash before the system reveals expected totals, completely eliminating end-of-day register skimming and variance tampering.
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Figure 1.3: Continuous Local Terminal &amp; Cloud Sync Relay</p>
              <div className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between gap-3 text-center text-[9px] font-inter">
                  <div className="border-2 border-blue-600 bg-blue-50 p-2.5 rounded-lg w-1/3">
                    <WifiOff size={16} className="mx-auto mb-1 text-blue-700"/>
                    <p className="font-bold text-blue-900">Local POS Terminals</p>
                    <p className="text-[7px] text-blue-600 font-mono mt-0.5">Local SQLite Storage</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[7.5px] font-mono text-slate-400 uppercase font-bold">Auto-Sync</span>
                    <RefreshCw size={16} className="text-slate-400 animate-spin my-1" />
                    <span className="text-[7.5px] font-mono text-emerald-600 uppercase font-bold">&lt; 200ms Relay</span>
                  </div>
                  <div className="border-2 border-[#0F172A] bg-slate-900 text-white p-2.5 rounded-lg w-1/3">
                    <Globe size={16} className="mx-auto mb-1 text-amber-400"/>
                    <p className="font-bold text-white">Central Cloud Database</p>
                    <p className="text-[7px] text-slate-400 font-mono mt-0.5">Postgres Multi-Tenant</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-[10px]">
              <div>
                <span className="font-bold text-[#0F172A]">Tax &amp; Accounting Sync: </span>
                <span className="text-slate-600">Automates VAT, service charges, consumption tax, and exports balanced journal entries.</span>
              </div>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">Audit-Ready</span>
            </div>
          </main>
          <DocFooter />
        </div>

// Reusable Print Header
function DocHeader({ refCode, pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-slate-900 pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <Building2 size={16} className="text-[#0F172A]" />
        <span className="font-inter text-[8.5px] font-black uppercase tracking-[0.2em] text-[#0F172A]">Hospitality Operating System // Specification SOW</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[8.5px]">
        <span className="text-slate-400">{refCode}</span>
        <span className="font-bold text-[#0F172A]">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

// Reusable Print Footer
function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t border-slate-200 text-slate-400 font-mono text-[7.5px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span>CONFIDENTIAL // PREPARED FOR CLIENT EVALUATION</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[#0F172A] font-bold">TITANIUM ARCHITECTURE</span>
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
      </div>
    </footer>
  );
}
