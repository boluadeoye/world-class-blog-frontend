"use client";
import { useState, useEffect } from "react";
import { 
  Download, Building2, Layers, ShieldCheck, CheckCircle2, 
  Zap, Clock, Database, WifiOff, Key, FileText, 
  Sparkles, Smartphone, Lock, Dumbbell, Shirt, 
  ShoppingCart, Users, ArrowRight, Globe, Utensils, 
  Hotel, Calendar, TrendingUp, Coins
} from "lucide-react";
import Link from "next/link";

// Subcomponents hoisted cleanly at the top
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#022C22] pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#D4AF37] flex items-center justify-center text-black font-black text-[10px]">ES</div>
        <span className="font-inter text-[9px] font-black uppercase tracking-[0.2em] text-[#022C22]">Eden Studios // Hospitality Operating System</span>
      </div>
      <span className="font-mono text-[9px] font-bold text-slate-500">PAGE {pageNum}</span>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t border-slate-200 text-slate-500 font-mono text-[8px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span>CONFIDENTIAL // PREPARED FOR CLIENT EVALUATION</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[#022C22] font-bold">EDEN STUDIOS</span>
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
      </div>
    </footer>
  );
}

export default function EdenSaaSProposal() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Eden_Studios_Hospitality_OS_Proposal";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

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

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-8 border-[#022C22] rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#022C22] rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-xl">
            <Building2 size={36} />
          </div>
          <h1 className="font-playfair text-2xl font-black text-[#022C22] mb-1 uppercase">Eden Studios</h1>
          <p className="font-inter text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-8">Hospitality OS Solution Blueprint</p>
          {isReady ? (
            <button onClick={handlePrint} className="w-full bg-[#022C22] hover:bg-[#064E3B] text-[#D4AF37] font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} className="inline mr-2" /> Download Master Proposal (PDF)
            </button>
          ) : (
            <p className="text-[#022C22] font-mono text-xs animate-pulse">Initializing Blueprint...</p>
          )}
          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="proposal-render" className="hidden print:block text-[#000000]">
        
        {/* PAGE 1: THE EDEN COVER & EXECUTIVE BRIEF */}
        <div className="a4-page !p-0 bg-[#022C22] text-white border-[12mm] border-[#022C22] relative">
          <div className="h-full border border-[#D4AF37]/40 p-[15mm] flex flex-col justify-between relative z-10">
            
            <div className="flex justify-between items-start">
              <div>
                <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-1">Eden Studios Architecture</p>
                <p className="font-playfair italic text-xs text-slate-300">Commercial Solution Blueprint</p>
              </div>
              <span className="bg-[#D4AF37] text-[#022C22] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest rounded">
                SaaS Edition 2026
              </span>
            </div>

            <div className="my-auto py-8">
              <div className="w-12 h-12 mb-6 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-white/5">
                <Building2 size={24} />
              </div>
              <h1 className="font-playfair text-5xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4">
                Hospitality<br/><span className="text-[#D4AF37] italic font-normal">Operating System</span>
              </h1>
              <div className="h-1 w-24 bg-[#D4AF37] mb-6"></div>
              <p className="font-inter text-sm font-medium text-slate-200 max-w-lg leading-relaxed">
                An all-in-one software platform engineered to run hotel lodging, restaurant dining, swimming pool bars, and storeroom inventory from a single, unified screen.
              </p>
            </div>

            <div className="border-t border-[#D4AF37]/30 pt-6 space-y-4 font-inter text-xs">
              <div className="grid grid-cols-2 gap-6 text-slate-300">
                <div>
                  <p className="font-bold text-[#D4AF37] uppercase tracking-wider text-[10px]">What This Solves</p>
                  <p className="mt-1 text-slate-200 leading-relaxed text-sm">Blocks staff theft, eliminates double-booked rooms, and operates smoothly with zero internet downtime.</p>
                </div>
                <div>
                  <p className="font-bold text-[#D4AF37] uppercase tracking-wider text-[10px]">Prepared By</p>
                  <p className="mt-1 text-slate-200 font-semibold text-sm">Eden Studios Engineering Group</p>
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-[#D4AF37]/20 pt-4 text-[9px] font-mono text-slate-400">
                <span>https://boluadeoye.com.ng</span>
                <span className="text-[#D4AF37] font-bold">DATE: {currentDate}</span>
              </div>
            </div>

          </div>
        </div>
        {/* PAGE 2: CORE FRONT-OF-HOUSE (POS & HOTEL ROOMS) */}
        <div className="a4-page">
          <DocHeader pageNum="02" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 01 // Front-of-House</span>
              <h2 className="font-playfair text-3xl font-black uppercase text-[#022C22] mt-1 mb-2">
                Restaurant POS &amp; Hotel Room Booking
              </h2>
              <p className="font-inter text-sm text-[#000000] leading-relaxed">
                Connects your reception desk directly to the restaurant and bar, eliminating lost paper tickets and speed bottlenecks.
              </p>
            </div>

            <div className="space-y-4">
              
              <div className="border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Utensils size={18} className="text-[#022C22]" />
                  <h3 className="font-inter text-sm font-black uppercase text-[#000000]">1. Waiter Tablet Ordering &amp; Live Table Map</h3>
                </div>
                <p className="font-inter text-xs font-semibold leading-relaxed text-slate-800">
                  Waiters take food and drink orders on tablets directly at the table. Orders flash inside the kitchen in 1 second, speeding up service and cutting customer wait times in half.
                </p>
              </div>

              <div className="border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Hotel size={18} className="text-[#022C22]" />
                  <h3 className="font-inter text-sm font-black uppercase text-[#000000]">2. Front-Desk Room Calendar (No Double-Booking)</h3>
                </div>
                <p className="font-inter text-xs font-semibold leading-relaxed text-slate-800">
                  A color-coded visual calendar showing every room. Receptionists can easily see which rooms are occupied, empty, or currently being cleaned by housekeeping.
                </p>
              </div>

              <div className="border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Coins size={18} className="text-[#022C22]" />
                  <h3 className="font-inter text-sm font-black uppercase text-[#000000]">3. Charge Drinks &amp; Food Directly to Room</h3>
                </div>
                <p className="font-inter text-xs font-semibold leading-relaxed text-slate-800">
                  Guests at the pool bar can say &ldquo;Charge to Room 204.&rdquo; The system verifies their check-in and adds the cost to their final bill, stopping walk-out theft.
                </p>
              </div>

            </div>

            <div className="bg-[#022C22] text-white p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Fast Check Settlement</p>
                <p className="font-inter text-xs text-slate-200 mt-0.5">Split bills by seat, item, or combine cash, card, and bank transfers easily.</p>
              </div>
              <span className="bg-[#D4AF37] text-[#022C22] font-black text-[10px] px-3 py-1 uppercase rounded font-mono">1-Click Checkout</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 3: BACK-OF-HOUSE (INVENTORY & OFFLINE RELIABILITY) */}
        <div className="a4-page">
          <DocHeader pageNum="03" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 02 // Back-of-House Control</span>
              <h2 className="font-playfair text-3xl font-black uppercase text-[#022C22] mt-1 mb-2">
                Anti-Theft Stock &amp; 100% Offline Mode
              </h2>
              <p className="font-inter text-sm text-[#000000] leading-relaxed">
                Stops staff from pocketing sales and ensures the entire business keeps running even when the internet network fails.
              </p>
            </div>

            {/* RECIPE DEPLETION IN ACTION */}
            <div className="border-2 border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="font-inter text-sm font-black uppercase text-[#000000] mb-2 flex items-center gap-2">
                <Database size={16} className="text-[#022C22]" /> Automatic Stock Subtraction (Recipe Control)
              </h3>
              <p className="font-inter text-xs text-slate-800 mb-3 leading-relaxed">
                The software knows the exact recipe for every drink and meal. When a bartender sells <strong>1 Cocktail</strong>, the system automatically subtracts:
              </p>

              <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                <div className="bg-white p-2.5 border border-slate-300 rounded-lg">
                  <p className="font-black text-[#000000] text-sm">-50 ml</p>
                  <p className="text-slate-600 text-[10px]">Rum</p>
                </div>
                <div className="bg-white p-2.5 border border-slate-300 rounded-lg">
                  <p className="font-black text-[#000000] text-sm">-10 ml</p>
                  <p className="text-slate-600 text-[10px]">Syrup</p>
                </div>
                <div className="bg-white p-2.5 border border-slate-300 rounded-lg">
                  <p className="font-black text-[#000000] text-sm">-1 Unit</p>
                  <p className="text-slate-600 text-[10px]">Lime</p>
                </div>
                <div className="bg-white p-2.5 border border-slate-300 rounded-lg">
                  <p className="font-black text-[#000000] text-sm">-6 Leaves</p>
                  <p className="text-slate-600 text-[10px]">Mint</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              <div className="border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
                <h4 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-red-700" /> End-of-Shift Theft Alerts
                </h4>
                <p className="font-inter text-xs text-slate-800 leading-relaxed">
                  Compares physical drinks left in the bar with sales made. If 5 bottles are missing, the cashier cannot close their shift without reporting it.
                </p>
              </div>

              <div className="border-2 border-slate-200 p-4 rounded-xl bg-slate-50">
                <h4 className="font-inter text-xs font-black uppercase text-[#022C22] mb-1.5 flex items-center gap-1.5">
                  <WifiOff size={16} className="text-blue-700" /> 100% Offline Resilience
                </h4>
                <p className="font-inter text-xs text-slate-800 leading-relaxed">
                  If the internet goes off completely, your hotel doesn&apos;t stop. Orders print, rooms check in, and bills settle. It syncs automatically when network returns.
                </p>
              </div>

            </div>

            <div className="border-t-2 border-slate-200 pt-3 flex justify-between items-center text-xs">
              <span className="font-bold text-[#000000]">Remote Owner Dashboard: </span>
              <span className="text-slate-700 font-medium">Monitor live sales, room bookings, and cash from your smartphone anywhere.</span>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 4: HARDWARE & ADD-ON SUITE */}
        <div className="a4-page">
          <DocHeader pageNum="04" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 03 // Optional Extensions</span>
              <h2 className="font-playfair text-3xl font-black uppercase text-[#022C22] mt-1 mb-2">
                Smart Keycards &amp; Add-On Modules
              </h2>
              <p className="font-inter text-sm text-[#000000] leading-relaxed">
                Expand your software power into physical smart door locks, elevator controls, conference halls, and website sales whenever you are ready.
              </p>
            </div>

            <div className="space-y-3.5">
              
              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-slate-50 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-purple-100 text-purple-900 rounded-lg flex items-center justify-center shrink-0">
                  <Key size={18} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-black uppercase text-[#000000]">1. Smart Door Locks &amp; Elevator Access</h3>
                  <p className="font-inter text-xs text-slate-700 leading-relaxed mt-0.5">
                    Program physical RFID card keys at reception in 1 second. Restrict elevator buttons so guests can only access the exact floor their room is on.
                  </p>
                </div>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-slate-50 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-black uppercase text-[#000000]">2. Event &amp; Conference Hall Bookings</h3>
                  <p className="font-inter text-xs text-slate-700 leading-relaxed mt-0.5">
                    Rent meeting halls by the hour or day. Bundle sound equipment, projectors, and food catering packages into one master invoice.
                  </p>
                </div>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-slate-50 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center shrink-0">
                  <Shirt size={18} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-black uppercase text-[#000000]">3. Laundry &amp; Valet Billing</h3>
                  <p className="font-inter text-xs text-slate-700 leading-relaxed mt-0.5">
                    Tag guest clothing, track washing/ironing stages, and automatically post laundry fees to the guest&apos;s room checkout bill.
                  </p>
                </div>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-slate-50 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-900 rounded-lg flex items-center justify-center shrink-0">
                  <Dumbbell size={18} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-black uppercase text-[#000000]">4. Gym &amp; Spa Membership Passes</h3>
                  <p className="font-inter text-xs text-slate-700 leading-relaxed mt-0.5">
                    Manage monthly gym passes, automated renewal reminders, and member entrance gate verification.
                  </p>
                </div>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-slate-50 flex gap-3.5 items-start">
                <div className="w-9 h-9 bg-cyan-100 text-cyan-900 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-black uppercase text-[#000000]">5. WooCommerce Website Sync</h3>
                  <p className="font-inter text-xs text-slate-700 leading-relaxed mt-0.5">
                    Online food delivery orders from your website print directly in the kitchen. Stock changes update automatically in under 2 seconds.
                  </p>
                </div>
              </div>

            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 5: INVESTMENT, 3 MILESTONES & AGREEMENT */}
        <div className="a4-page">
          <DocHeader pageNum="05" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Section 04 // Commercial Terms</span>
              <h2 className="font-playfair text-3xl font-black uppercase text-[#022C22] mt-1 mb-2">
                Investment &amp; 3-Stage Milestones
              </h2>
              <p className="font-inter text-sm text-[#000000] leading-relaxed">
                Structured development and UI/UX design investment broken into three clear delivery stages.
              </p>
            </div>

            {/* TOTAL INVESTMENT BOX */}
            <div className="border-4 border-[#022C22] bg-slate-50 p-5 rounded-2xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-black text-[#022C22] uppercase tracking-widest">Total Engineering &amp; Design Investment</p>
                <p className="font-inter text-xs text-slate-600 mt-1 font-medium">Complete Hotel PMS, Restaurant POS, Recipe Inventory &amp; Multi-Tenant Core</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-3xl font-black text-[#022C22]">₦1,500,000</span>
                <span className="block font-mono text-[9px] text-slate-500 uppercase font-bold">Fixed Turnkey Fee</span>
              </div>
            </div>

            {/* 3 MILESTONES */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">3-Stage Milestone Payment Schedule</p>
              
              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-white flex justify-between items-center">
                <div>
                  <span className="font-inter text-xs font-black text-[#022C22] uppercase">Milestone 1: Project Kickoff &amp; Design (40%)</span>
                  <p className="font-inter text-xs text-slate-600 mt-0.5">Database architecture, complete UI/UX screen designs, and administrative setup.</p>
                </div>
                <span className="font-mono text-base font-black text-[#022C22] pl-4">₦600,000</span>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-white flex justify-between items-center">
                <div>
                  <span className="font-inter text-xs font-black text-[#022C22] uppercase">Milestone 2: Core POS &amp; Hotel Demo (40%)</span>
                  <p className="font-inter text-xs text-slate-600 mt-0.5">Working restaurant POS, table ordering, room calendar, and recipe stock depletion demo.</p>
                </div>
                <span className="font-mono text-base font-black text-[#022C22] pl-4">₦600,000</span>
              </div>

              <div className="border-2 border-slate-200 p-3.5 rounded-xl bg-white flex justify-between items-center">
                <div>
                  <span className="font-inter text-xs font-black text-[#022C22] uppercase">Milestone 3: Final Launch &amp; Handover (20%)</span>
                  <p className="font-inter text-xs text-slate-600 mt-0.5">Offline sync engine, API connections, quality assurance testing, and production deployment.</p>
                </div>
                <span className="font-mono text-base font-black text-emerald-800 pl-4">₦300,000</span>
              </div>
            </div>

            {/* THIRD PARTY PASS THROUGH NOTE */}
            <div className="bg-amber-50 border-l-4 border-[#D4AF37] p-3 rounded-r-lg">
              <p className="font-inter text-xs text-slate-800 font-semibold leading-relaxed">
                <strong>Cloud Server Notice:</strong> Monthly cloud hosting (AWS / Neon database) and SMS alerts are direct utility costs billed to the client&apos;s account as the business expands.
              </p>
            </div>

            {/* GOVERNANCE & APPROVAL BLOCK */}
            <div className="border-t-2 border-[#022C22] pt-4 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Architectural Verification</p>
                <h3 className="font-playfair text-lg font-black text-[#022C22] uppercase tracking-wide">
                  Eden Studios Architecture &amp; Design Group
                </h3>
                <p className="font-inter text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mt-0.5">
                  Commercial Solutions Engineering
                </p>
                <p className="font-mono text-[8px] text-slate-400 mt-1">Issue Date: {currentDate}</p>
              </div>

              <div className="border-2 border-[#022C22] p-2.5 rounded-lg text-center bg-slate-50 w-36">
                <p className="font-mono text-[7px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                <div className="flex items-center justify-center gap-1 text-[8.5px] font-black text-emerald-800">
                  <ShieldCheck size={12} />
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
