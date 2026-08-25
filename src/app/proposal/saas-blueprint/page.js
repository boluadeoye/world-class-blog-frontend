"use client";
import { useState, useEffect } from "react";
import { 
  Download, Building2, Layers, ShieldCheck, Zap, 
  Database, Globe, Lock, Cpu, Server, 
  CheckCircle2, ArrowRight, Smartphone, CreditCard,
  Wifi, WifiOff, Key, Settings, ShoppingCart, 
  Dumbbell, Shirt, Terminal, Network, AlertTriangle,
  Utensils, Hotel
} from "lucide-react";
import Link from "next/link";

// Hoisted Subcomponents
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-slate-800 pb-2 mb-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-amber-500 flex items-center justify-center text-black font-black text-[10px]">TD</div>
        <span className="font-inter text-[8.5px] font-black uppercase tracking-[0.2em] text-slate-400">Hospitality SaaS // Scope of Work &amp; Architecture</span>
      </div>
      <span className="font-mono text-[8.5px] font-bold text-slate-500">PAGE {pageNum}</span>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t border-slate-800 text-slate-500 font-mono text-[7.5px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span>CONFIDENTIAL // PREPARED FOR CLIENT EVALUATION</span>
      <div className="flex items-center gap-1.5">
        <span className="text-amber-500 font-bold">TITANIUM DYNAMICS</span>
        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
      </div>
    </footer>
  );
}

export default function SaaSBlueprint() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Hospitality_SaaS_Master_Blueprint_SOW";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-amber-500/30 antialiased">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,900;1,600&family=Inter:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #proposal-render, #proposal-render * { visibility: visible; }
          #proposal-render { position: absolute; left: 0; top: 0; width: 100%; background: #050505; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #050505; 
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
        <div className="relative z-10 w-full max-w-md bg-black p-10 text-center shadow-2xl border-t-4 border-amber-500 rounded-2xl">
          <Server size={48} className="text-amber-500 mx-auto mb-6" />
          <h1 className="font-playfair text-2xl font-black text-white mb-2 uppercase">SaaS Blueprint &amp; SOW</h1>
          <p className="font-inter text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">Multi-Tenant Platform Proposal</p>
          {isReady ? (
            <button onClick={handlePrint} className="w-full bg-amber-500 text-black font-inter font-black py-4 rounded-xl uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
              <Download size={18} className="inline mr-2" /> Download Blueprint (PDF)
            </button>
          ) : (
            <p className="text-amber-500 font-mono text-xs animate-pulse">Initializing System...</p>
          )}
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="proposal-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: VISION & MULTI-TENANT ARCHITECTURE */}
        <div className="a4-page">
          <DocHeader pageNum="01" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-widest">
                Software-as-a-Service (SaaS) Architecture
              </span>
              <h1 className="font-playfair text-4xl font-black text-white uppercase tracking-tight leading-[1.05] mt-3 mb-3">
                Hospitality Operating System<br/><span className="text-amber-500">Master Solution Blueprint</span>
              </h1>
              <p className="font-inter text-xs text-slate-400 leading-relaxed max-w-xl">
                A multi-tenant, cloud-native platform engineered to empower unlimited hotel, restaurant, and bar properties from a centralized administrative SaaS infrastructure.
              </p>
              <div className="h-0.5 w-24 bg-amber-500 my-4"></div>
            </div>

            <div className="bg-white/5 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h3 className="font-inter text-xs font-black uppercase text-white tracking-wider mb-1.5 flex items-center gap-2">
                <Globe size={14} className="text-amber-500" /> The SaaS Infrastructure Model
              </h3>
              <p className="font-inter text-[11px] leading-relaxed text-slate-300 text-justify">
                This project establishes an enterprise-grade digital ecosystem. Instead of a single hotel application, the platform functions as a **Multi-Tenant SaaS engine**. Multiple independent hotel and restaurant businesses operate as distinct tenants—each with completely isolated databases, custom menus, staff roles, and reporting—governed by a global platform owner dashboard.
              </p>
            </div>

            {/* DIAGRAM: MULTI-TENANT CLOUD ARCHITECTURE */}
            <div>
              <p className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3">Figure 1.0: Multi-Tenant Isolation &amp; Infrastructure Stack</p>
              <div className="border border-slate-800 rounded-xl p-4 bg-black/60">
                <div className="grid grid-cols-3 gap-3 text-center text-[9px] font-inter">
                  
                  <div className="border border-slate-800 bg-white/5 p-3 rounded-lg">
                    <Building2 size={20} className="mx-auto mb-1.5 text-blue-400" />
                    <p className="font-bold text-white uppercase">Tenant A</p>
                    <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Hotel &amp; Resort Property</p>
                  </div>

                  <div className="border border-slate-800 bg-white/5 p-3 rounded-lg">
                    <Utensils size={20} className="mx-auto mb-1.5 text-amber-400" />
                    <p className="font-bold text-white uppercase">Tenant B</p>
                    <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Multi-Branch Restaurant</p>
                  </div>

                  <div className="border border-slate-800 bg-white/5 p-3 rounded-lg">
                    <Globe size={20} className="mx-auto mb-1.5 text-emerald-400" />
                    <p className="font-bold text-white uppercase">Tenant C</p>
                    <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Boutique Bar &amp; Lounge</p>
                  </div>

                </div>

                <div className="my-2.5 flex items-center justify-center gap-2 font-mono text-[8px] text-amber-500">
                  <div className="h-px w-12 bg-slate-800"></div>
                  <span>Cryptographic Row-Level Security (RLS) Vault Isolation</span>
                  <div className="h-px w-12 bg-slate-800"></div>
                </div>

                <div className="border border-amber-500/30 bg-amber-950/20 p-2.5 rounded-lg text-center font-mono text-[9px] text-slate-300">
                  <span className="font-bold text-white uppercase">SaaS Control Plane &amp; Core Engine: </span>
                  <span>Central Multi-Tenant Postgres (Neon) &bull; AWS Storage &bull; Edge Gateway</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-white mb-1 flex items-center gap-1.5">
                  <Lock size={12} className="text-amber-500" /> Absolute Data Isolation
                </h4>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Tenant records are cryptographically partitioned. Hotel A cannot view or access data belonging to Hotel B under any circumstance.
                </p>
              </div>
              <div>
                <h4 className="font-inter text-[10px] font-black uppercase text-white mb-1 flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-500" /> Elastic Scaling
                </h4>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Serverless database architecture scales automatically from 1 property to 1,000+ properties with zero infrastructure redesign.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 2: CORE SAAS DELIVERABLES */}
        <div className="a4-page">
          <DocHeader pageNum="02" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">Section 01 // Included in Base Build</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-white mt-1 mb-2">
                Core SaaS Deliverables (Base Scope)
              </h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                The foundational suite covering complete hotel front-desk operations, restaurant POS, kitchen routing, anti-theft recipe inventory, and API access.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              
              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <Utensils size={14} className="text-amber-500" /> F&amp;B Point of Sale (POS)
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Visual table floor plans, waiter mobile tablet ordering, kitchen/bar ticket routing (KDS), split billing, and direct charge-to-room folio settlement.
                </p>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <Hotel size={14} className="text-blue-400" /> Property Management (PMS)
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Live color-coded room tape chart, guest reservation calendar, automated night audit, and 4-tier housekeeping status management.
                </p>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <Database size={14} className="text-emerald-400" /> Recipe Inventory &amp; BOM
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Bill of Materials engine that automatically subtracts raw ingredients upon sale, with end-of-shift theft variance alerts.
                </p>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <WifiOff size={14} className="text-purple-400" /> Local Offline Resilience
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Terminals operate seamlessly during internet cuts over local Wi-Fi, silently synchronizing all records to the cloud when connectivity returns.
                </p>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <Network size={14} className="text-cyan-400" /> Developer API &amp; Webhooks
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Standardized JSON endpoints allowing external apps, accounting software, and third-party websites to integrate securely with tenant data.
                </p>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5">
                <h3 className="font-inter text-xs font-bold uppercase text-white mb-1 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-amber-500" /> Role-Based Access (RBAC)
                </h3>
                <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed">
                  Strict staff permission tiers ensuring blind cash drops and unalterable sales audit logs.
                </p>
              </div>

            </div>

            <div className="bg-white/5 border border-slate-800 p-4 rounded-lg">
              <h4 className="font-inter text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                No-Code &amp; Third-Party Compatibility
              </h4>
              <p className="font-inter text-[10px] text-slate-300 leading-relaxed">
                The API architecture is engineered with standard webhook protocols. This allows non-technical hotel operators to connect their property to automation platforms (such as Zapier or Make) with zero programming required.
              </p>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* PAGE 3: THIRD-PARTY UTILITY SCHEDULE */}
        <div className="a4-page">
          <DocHeader pageNum="03" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">Section 02 // Operational Utilities</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-white mt-1 mb-2">
                Third-Party Services &amp; Cloud Infrastructure
              </h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                To maintain a reliable SaaS, third-party cloud infrastructure is utilized on a direct pass-through model. These operational utility expenses are funded directly by the client.
              </p>
            </div>

            <div className="border border-slate-800 rounded-lg overflow-hidden text-[9px] font-inter">
              <div className="grid grid-cols-12 bg-white/10 text-white p-2.5 font-bold uppercase font-mono text-[8px] border-b border-slate-800">
                <div className="col-span-3">Provider</div>
                <div className="col-span-6">Function &amp; Operational Purpose</div>
                <div className="col-span-3 text-right">Billing Type</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-white/5 items-center">
                <div className="col-span-3 font-bold text-white">AWS (Amazon Web Services)</div>
                <div className="col-span-6 text-slate-400">Application host servers, S3 asset storage (logos, receipts, IDs), and security firewalls.</div>
                <div className="col-span-3 text-right font-mono text-amber-400 font-bold">Direct Client Account</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-transparent items-center">
                <div className="col-span-3 font-bold text-white">Neon Serverless Postgres</div>
                <div className="col-span-6 text-slate-400">High-speed multi-tenant relational database with auto-scaling storage and branch isolation.</div>
                <div className="col-span-3 text-right font-mono text-amber-400 font-bold">Direct Client Account</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-white/5 items-center">
                <div className="col-span-3 font-bold text-white">SMS Gateway (Termii / Twilio)</div>
                <div className="col-span-6 text-slate-400">Automated guest booking confirmation SMS, manager fraud alerts, and staff OTP logins.</div>
                <div className="col-span-3 text-right font-mono text-slate-300 font-bold">Usage-Based (Per SMS)</div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-transparent items-center">
                <div className="col-span-3 font-bold text-white">Payment Gateway (Paystack / Flutterwave)</div>
                <div className="col-span-6 text-slate-400">Collection of monthly SaaS tenant subscription fees and online guest card settlements.</div>
                <div className="col-span-3 text-right font-mono text-slate-300 font-bold">Per Transaction Fee</div>
              </div>

              <div className="grid grid-cols-12 p-3 bg-white/5 items-center">
                <div className="col-span-3 font-bold text-white">IoT Gateway Bridge (TTLock / Tuya)</div>
                <div className="col-span-6 text-slate-400">Cloud API relay connecting room reservations to physical smart door lock hardware.</div>
                <div className="col-span-3 text-right font-mono text-slate-300 font-bold">Tier / Direct API</div>
              </div>
            </div>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="font-inter text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                Client-Direct Billing Notice
              </h4>
              <p className="font-inter text-[10px] text-slate-300 leading-relaxed">
                All cloud and third-party API accounts will be registered directly under the client&apos;s legal entity. The engineering fee covers complete integration, architecture, and deployment; monthly server usage fees scale with platform growth and are billed directly by the respective providers.
              </p>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 4: MODULAR ADD-ON SUITE */}
        <div className="a4-page">
          <DocHeader pageNum="04" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">Section 03 // Specialized Extensions</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-white mt-1 mb-2">
                Modular Add-On Enhancements
              </h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                Specialized sub-systems engineered as modular plug-ins. These capabilities can be deployed independently based on client rollout phases.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5 flex gap-3.5 items-start">
                <div className="w-8 h-8 bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Lock size={16} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-white">Smart Locks, Card Encoders &amp; Elevator Relays</h3>
                    <span className="font-mono text-[8px] bg-purple-950 text-purple-300 border border-purple-700 px-1.5 py-0.5 rounded font-bold">IoT Bridge</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed mt-1">
                    USB desktop RFID card writer integration, mobile Bluetooth unlock key generation, real-time lock battery telemetry, access audit logs, and hardware elevator floor restriction relays.
                  </p>
                </div>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5 flex gap-3.5 items-start">
                <div className="w-8 h-8 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Building2 size={16} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-white">Venue &amp; Conference Hall Management</h3>
                    <span className="font-mono text-[8px] bg-blue-950 text-blue-300 border border-blue-700 px-1.5 py-0.5 rounded font-bold">Event Module</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed mt-1">
                    Hourly and daily banquet hall bookings, stage layout selection, AV equipment rentals, and consolidated master event invoices.
                  </p>
                </div>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5 flex gap-3.5 items-start">
                <div className="w-8 h-8 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Shirt size={16} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-white">Laundry Operations &amp; Room Folio Posting</h3>
                    <span className="font-mono text-[8px] bg-amber-950 text-amber-300 border border-amber-700 px-1.5 py-0.5 rounded font-bold">Valet Module</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed mt-1">
                    Barcode-tagged garment intake, dry-cleaning status tracking, and automated service fee posting directly to the guest room checkout bill.
                  </p>
                </div>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5 flex gap-3.5 items-start">
                <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <Dumbbell size={16} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-white">Gym &amp; Wellness Membership Engine</h3>
                    <span className="font-mono text-[8px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-1.5 py-0.5 rounded font-bold">Membership</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed mt-1">
                    Recurring monthly/annual member subscriptions, automated expiry alerts, class scheduling, and turnstile access control integration.
                  </p>
                </div>
              </div>

              <div className="border border-slate-800 p-3.5 rounded-lg bg-white/5 flex gap-3.5 items-start">
                <div className="w-8 h-8 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg flex items-center justify-center font-bold shrink-0">
                  <ShoppingCart size={16} />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-inter text-xs font-bold uppercase text-white">WooCommerce 2-Way E-Commerce Relay</h3>
                    <span className="font-mono text-[8px] bg-cyan-950 text-cyan-300 border border-cyan-700 px-1.5 py-0.5 rounded font-bold">2-Way Sync</span>
                  </div>
                  <p className="font-inter text-[9.5px] text-slate-400 leading-relaxed mt-1">
                    Real-time order synchronization between client WordPress websites and the central kitchen POS for online delivery ordering.
                  </p>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* PAGE 5: INVESTMENT, 3 MILESTONES & SIGN-OFF */}
        <div className="a4-page">
          <DocHeader pageNum="05" />
          <main className="grow flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">Section 04 // Commercial Framework</span>
              <h2 className="font-playfair text-2xl font-black uppercase text-white mt-1 mb-2">
                Investment &amp; 3-Stage Milestone Schedule
              </h2>
              <p className="font-inter text-xs text-slate-400 leading-relaxed">
                Total professional engineering and design investment structured into three performance-based milestone disbursements.
              </p>
            </div>

            <div className="border-2 border-amber-500 bg-amber-950/20 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-inter text-xs font-bold text-amber-400 uppercase tracking-widest">Total Engineering &amp; Design Investment</p>
                <p className="font-inter text-[10px] text-slate-400 mt-0.5">Complete Multi-Tenant SaaS Platform &amp; Core Module Suite</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-white">₦1,500,000</span>
                <span className="block font-mono text-[8px] text-slate-400 uppercase">Fixed Commercial Fee</span>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Structured Milestone Disbursements</p>
              <div className="border border-slate-800 rounded-lg overflow-hidden text-[9px] font-inter">
                <div className="grid grid-cols-12 bg-white/10 text-white p-2.5 font-bold uppercase font-mono text-[8px] border-b border-slate-800">
                  <div className="col-span-3">Milestone</div>
                  <div className="col-span-6">Key Deliverables &amp; Verification Criteria</div>
                  <div className="col-span-3 text-right">Disbursement</div>
                </div>

                <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-white/5 items-center">
                  <div className="col-span-3 font-bold text-white">Milestone 1 (40%)</div>
                  <div className="col-span-6 text-slate-300">Project initiation, multi-tenant database schema architecture, UI/UX design system completion, and core administrative setup.</div>
                  <div className="col-span-3 text-right font-mono font-bold text-amber-400">₦600,000</div>
                </div>

                <div className="grid grid-cols-12 p-3 border-b border-slate-800 bg-transparent items-center">
                  <div className="col-span-3 font-bold text-white">Milestone 2 (40%)</div>
                  <div className="col-span-6 text-slate-300">Working F&amp;B POS engine, table management, front-desk PMS calendar, recipe inventory depletion, and live staging demonstration.</div>
                  <div className="col-span-3 text-right font-mono font-bold text-amber-400">₦600,000</div>
                </div>

                <div className="grid grid-cols-12 p-3 bg-white/5 items-center">
                  <div className="col-span-3 font-bold text-white">Milestone 3 (20%)</div>
                  <div className="col-span-6 text-slate-300">Offline delta-sync engine, API endpoints, payment gateway integration, complete quality assurance, and production deployment.</div>
                  <div className="col-span-3 text-right font-mono font-bold text-emerald-400">₦300,000</div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-800 pt-4 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Architectural Verification</p>
                <h3 className="font-playfair text-lg font-bold text-white uppercase tracking-wide">
                  Lead Technical Architecture &amp; Design Group
                </h3>
                <p className="font-inter text-[9.5px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">
                  Titanium Dynamics Engineering Group
                </p>
                <p className="font-mono text-[8px] text-slate-500 mt-1">Issue Date: {currentDate}</p>
              </div>

              <div className="border border-slate-800 p-2.5 rounded-lg text-center bg-white/5 w-36">
                <p className="font-mono text-[7.5px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Status</p>
                <div className="flex items-center justify-center gap-1 text-[8.5px] font-black text-emerald-400">
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
