"use client";
import { useState, useEffect } from "react";
import { 
  Download, Building2, ShieldCheck, CheckCircle2, Zap, Clock, Database, 
  WifiOff, Key, FileText, Sparkles, Smartphone, Lock, Dumbbell, Shirt, 
  ShoppingCart, Users, ArrowRight, Globe, Utensils, Hotel, Layers, 
  Activity, Server, AlertTriangle, Cpu, Coins, Eye, ChevronRight
} from "lucide-react";
import Link from "next/link";

const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788790816/blog_assets/hiyhsdkblezih5vdzxdy.png";

// Subcomponents hoisted cleanly
function DocHeader({ pageNum }) {
  return (
    <header className="h-[14mm] flex items-end justify-between border-b-2 border-[#071D3D] pb-2 mb-3 relative z-10">
      <div className="flex items-center gap-2.5">
        <img src={logoUrl} alt="Eden Studios" className="h-6 object-contain" />
        <span className="font-inter text-[9.5px] font-black uppercase tracking-[0.2em] text-[#071D3D]">
          Eden Studios // Master Architectural Addendum
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9px]">
        <span className="text-slate-500 font-bold">ZURI-SOW-ADDENDUM-2026-V1</span>
        <span className="font-black text-[#071D3D] bg-slate-100 px-1.5 py-0.5 rounded">PAGE {pageNum}</span>
      </div>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="h-[10mm] flex items-center justify-between border-t-2 border-slate-200 text-[#000000] font-mono text-[8px] uppercase tracking-widest relative z-10 mt-auto pt-2">
      <span className="font-bold">CONFIDENTIAL // PREPARED BY EDEN STUDIOS ENGINEERING GROUP</span>
      <div className="flex items-center gap-2">
        <span className="text-[#0052CC] font-black">ZURI POS HUB</span>
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

export default function ZuriAddendum() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 800); }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Zuri_POS_Hub_Master_Architectural_Addendum_2026";
    window.print();
    document.title = originalTitle;
  };

  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-100 antialiased">
      
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />

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
          #addendum-render, #addendum-render * { visibility: visible; }
          #addendum-render { 
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
        .text-black-force { color: #000000 !important; }
      `}</style>

      {/* PORTAL (Screen View) */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl rounded-2xl border-t-8 border-[#071D3D]">
          <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center p-3 shadow-sm">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="font-display text-2xl font-black text-[#071D3D] mb-1 uppercase">Eden Studios</h1>
          <p className="font-inter text-[#0052CC] text-xs font-black uppercase tracking-widest mb-8">Zuri Master Architectural Addendum</p>

          {isReady ? (
            <button 
              onClick={handlePrint}
              className="w-full bg-[#071D3D] hover:bg-[#0A2F1D] text-white font-inter font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Download Master Addendum (PDF)</span>
            </button>
          ) : (
            <p className="text-slate-500 font-mono text-xs animate-pulse">Compiling Specification...</p>
          )}

          <Link href="/" className="block mt-6 text-xs text-slate-400 hover:text-slate-700 uppercase tracking-widest font-mono">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>

      {/* PRINT ENGINE */}
      <div id="addendum-render" className="hidden print:block text-[#000000]">
        
        {/* ========================================================= */}
        {/* PAGE 1: MASTER COVER & EXECUTIVE IDENTITY                */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="01" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoUrl} alt="Logo" className="h-12 object-contain" />
                <div className="h-8 w-[2px] bg-[#071D3D]"></div>
                <div>
                  <span className="bg-[#071D3D] text-white px-2.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest">
                    Production Addendum &amp; SOW
                  </span>
                  <p className="font-mono text-[9px] font-bold text-[#0052CC] mt-0.5">Ref: ZURI-SOW-ADDENDUM-2026-V1</p>
                </div>
              </div>

              <h1 className="font-display text-4xl font-black text-[#071D3D] uppercase tracking-tight leading-[1.05] mb-2">
                Zuri Point of Sales Hub<br/>
                <span className="text-[#0052CC]">&amp; Hospitality Operating System</span>
              </h1>
              <p className="font-inter text-xs text-[#000000] font-bold max-w-xl leading-relaxed">
                Complete Cloud-Native Architecture with 100% Local-First Offline POS, Property Management Engine (PMS), Multi-Property Tenancy, and IoT Smart Access Integration.
              </p>
              <div className="h-1 w-28 bg-[#10B981] my-3"></div>
            </div>

            {/* COMMERCIAL METRIC CARDS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-[#071D3D] bg-slate-50 p-4 rounded-xl">
                <p className="font-mono text-[9px] font-black uppercase text-[#0052CC] tracking-widest mb-1">Fixed Turnkey Investment</p>
                <p className="font-display text-3xl font-black text-[#071D3D]">₦1,000,000</p>
                <p className="font-inter text-[9.5px] font-bold text-slate-700 mt-1">Core Software Engineering + Complete UI/UX System</p>
              </div>

              <div className="border-2 border-[#071D3D] bg-slate-50 p-4 rounded-xl">
                <p className="font-mono text-[9px] font-black uppercase text-[#10B981] tracking-widest mb-1">Production Timeline</p>
                <p className="font-display text-3xl font-black text-[#071D3D]">8 Weeks</p>
                <p className="font-inter text-[9.5px] font-bold text-slate-700 mt-1">3 Weeks UI/UX Design + 5 Weeks Core Engineering</p>
              </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="border-2 border-slate-300 bg-white p-4 rounded-xl">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] tracking-wider mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-[#0052CC]" /> Executive Summary
              </h3>
              <p className="font-inter text-[11.5px] font-semibold leading-[1.7] text-[#000000] text-justify">
                This document serves as the formal engineering addendum and authoritative technical blueprint for the **Zuri Point of Sales Hub**. Commissioned by Eden Studios, this platform unifies front-of-house restaurant and bar sales, lodging reservations, recipe-level stock depletion, and automated hardware access control. Engineered to operate with zero downtime over local mesh networks, the system guarantees 100% operational continuity regardless of external internet or power grid volatility.
              </p>
            </div>

            {/* TABLE OF CONTENTS QUICK-INDEX */}
            <div className="border-t-2 border-slate-200 pt-3">
              <p className="font-mono text-[8.5px] font-black uppercase text-slate-500 tracking-widest mb-2">Architectural Section Index</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-inter text-[9px] font-bold text-[#000000]">
                <p>1.0 Visual Standards &amp; Typography Tokens</p>
                <p>2.0 Client Inquiries (Hardware &amp; Physics)</p>
                <p>3.0 Multi-Tenant Topology &amp; PostgreSQL RLS</p>
                <p>4.0 F&amp;B POS &amp; Order Routing Matrix</p>
                <p>5.0 Anti-Theft Recipe BOM Depletion</p>
                <p>6.0 Lodging PMS &amp; Housekeeping Lifecycle</p>
                <p>7.0 Local-First Offline Mesh Architecture</p>
                <p>8.0 $0 Cloud Infrastructure Strategy</p>
                <p>9.0 Third-Party Accounts &amp; Financials</p>
                <p>10.0 Store Deployment Protocol (Decoupled)</p>
                <p>11.0 Scope Boundary (Core vs Add-ons)</p>
                <p>12.0 3-Stage Milestone Disbursement Schedule</p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 2: TYPOGRAPHY STANDARDS & PRD INQUIRIES (PART I)     */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="02" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 1.0 // UI/UX Architecture</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                1.0 Visual Design &amp; Typography Standards
              </h2>
              <p className="font-inter text-[11.5px] font-semibold text-[#000000] leading-relaxed">
                Hospitality touchscreens operate in high-stress, low-light environments. To eliminate cashier mis-clicks, the interface employs rigid typographic geometry and 56px touch boundaries.
              </p>
            </div>

            {/* TYPOGRAPHY TOKEN TABLE */}
            <div className="border-2 border-[#071D3D] rounded-xl overflow-hidden">
              <table className="w-full border-collapse text-left font-inter text-[10px]">
                <thead className="bg-[#071D3D] text-white font-mono font-black uppercase text-[8.5px]">
                  <tr>
                    <th className="p-2.5">Element</th>
                    <th className="p-2.5">Font Family</th>
                    <th className="p-2.5">Size / Weight</th>
                    <th className="p-2.5">Color Token</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-semibold text-[#000000]">
                  <tr>
                    <td className="p-2 font-bold">Screen Master Titles</td>
                    <td className="p-2 font-display">Plus Jakarta Sans</td>
                    <td className="p-2 font-mono">26pt / Bold 800</td>
                    <td className="p-2 font-mono text-[#071D3D]">#071D3D (Obsidian)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2 font-bold">POS Currency &amp; Numbers</td>
                    <td className="p-2 font-mono">JetBrains Mono</td>
                    <td className="p-2 font-mono">16pt / Bold 700</td>
                    <td className="p-2 font-mono text-[#0052CC]">#0052CC (Cobalt)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Body Text &amp; Forms</td>
                    <td className="p-2">Inter (v4.0)</td>
                    <td className="p-2 font-mono">12pt / Medium 500</td>
                    <td className="p-2 font-mono">#000000 (Pure Black)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2 font-bold">Operational Status Tags</td>
                    <td className="p-2 font-mono">JetBrains Mono</td>
                    <td className="p-2 font-mono">10pt / Black 900</td>
                    <td className="p-2 font-mono text-emerald-700">#10B981 (Success Green)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CLIENT QUESTION 1: EXISTING HOTEL LOCKS */}
            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Key size={18} className="text-[#0052CC]" />
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D]">
                  2.1 Client Inquiry: Integrating Existing Hotel Door Locks
                </h3>
              </div>
              <p className="font-mono text-[9px] text-[#0052CC] font-bold mb-2">
                PRD Inquiry: &ldquo;What happens to existing hotels who already use smart locks or elevators? How will they integrate?&rdquo;
              </p>
              
              <div className="space-y-2 font-inter text-[11px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  Existing hotels will <strong>not</strong> discard their hardware. Zuri introduces an extensible <strong>Hardware Abstraction Layer (HAL)</strong> supporting three integration tiers:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="border border-slate-300 bg-white p-2.5 rounded-lg">
                    <p className="font-bold text-[#071D3D] text-[10px] uppercase">1. Standalone RFID Locks (Vingcard / Orbita / Adel)</p>
                    <p className="text-[9.5px] mt-1 text-slate-800">
                      Zuri runs a native Windows service talking directly to the front-desk USB Card Encoder via standard <strong>FIAS/Fidelio protocols</strong>. When reception clicks check-in, the encoder writes the keycard instantly.
                    </p>
                  </div>
                  <div className="border border-slate-300 bg-white p-2.5 rounded-lg">
                    <p className="font-bold text-[#071D3D] text-[10px] uppercase">2. Modern IP/BLE Smart Locks (TTLock / Tuya / Salto)</p>
                    <p className="text-[9.5px] mt-1 text-slate-800">
                      Connected over secure network gateways to issue mobile Bluetooth keys, dynamic passcodes, or remote room unlock permissions automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 border-slate-300 bg-white p-3 rounded-lg flex items-center justify-between text-[10px] font-bold">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-[#071D3D]" />
                <span>Smart Elevator Relays: Floor access is restricted to guest room level via network relay boards.</span>
              </div>
              <span className="font-mono text-[#0052CC]">Zero Lock Replacement</span>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 3: PRD INQUIRIES (PART II: PHYSICS, LICENSES, SCALE)  */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="03" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 2.0 // Architectural Answers</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                2.0 PRD Engineering Resolutions (Part II)
              </h2>
            </div>

            {/* CLIENT QUESTION 2: OFFLINE LOCK CONTINUITY */}
            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Lock size={18} className="text-emerald-700" />
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D]">
                  2.2 The Physics of Offline Keycards: Zero Lockout Guarantee
                </h3>
              </div>
              <p className="font-mono text-[9px] text-emerald-800 font-bold mb-2">
                PRD Inquiry: &ldquo;Will previously issued physical credentials continue to function during temporary internet outages?&rdquo;
              </p>
              <div className="space-y-2 font-inter text-[11.5px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>Yes. 100% operational continuity is mathematically guaranteed.</strong> Hotel door locks do not query the internet when tapped. Zuri utilizes the industry-standard <strong>Data-on-Card Architecture</strong>:
                </p>
                <div className="bg-[#071D3D] text-white p-3 rounded font-mono text-[9px] space-y-1">
                  <p className="text-amber-400 font-bold">Encrypted Card Payload = HMAC-SHA256( Property_ID + Room_Number + Expiry_Timestamp + Floor_Mask )</p>
                  <p className="text-slate-300">Lock reads encrypted sectors &bull; Compares with its internal Real-Time Clock (RTC) chip &bull; Unlocks physically.</p>
                </div>
                <p className="text-[10.5px]">
                  Because the validation happens locally inside the battery-powered door lock, <strong>network outages cannot lock guests out of rooms</strong>.
                </p>
              </div>
            </div>

            {/* CLIENT QUESTION 3: PER-DEVICE LICENSING */}
            <div className="border-2 border-slate-300 bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Smartphone size={18} className="text-[#0052CC]" />
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D]">
                  2.3 Device Seat Tokens vs. Free Back-Office Access
                </h3>
              </div>
              <p className="font-inter text-[11px] font-semibold text-[#000000] leading-relaxed">
                Hardware terminal licensing is enforced via <strong>Cryptographic Machine Fingerprints</strong>. Each physical cashier POS tablet or reception PC registers its unique hardware identity to claim 1 licensed seat. Web dashboards for owners and accountants access the cloud backend with role-based authentication without consuming terminal seats.
              </p>
            </div>

            {/* CLIENT QUESTION 4: UNLIMITED ROOM SCALE */}
            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Database size={18} className="text-[#071D3D]" />
                <h3 className="font-display text-xs font-black uppercase text-[#071D3D]">
                  2.4 Scaling to Unlimited Rooms Without Cost Ballooning
                </h3>
              </div>
              <p className="font-inter text-[11px] font-semibold text-[#000000] leading-relaxed">
                Room inventory uses normalized relational indexing. In PostgreSQL, 10,000 rooms consume less than <strong>5MB of disk space</strong>. The Front-Desk Room Calendar (Tape Chart) uses date-range partition queries (`BETWEEN checkin AND checkout`), loading only visible screen dates into memory.
              </p>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 4: MULTI-TENANCY & F&B POS ENGINE                    */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="04" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 3.0 &amp; 4.0 // System Core</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                3.0 Multi-Tenancy &amp; 4.0 F&amp;B POS Engine
              </h2>
            </div>

            {/* TENANCY ARCHITECTURE & DIAGRAM 1 */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] mb-1 flex items-center gap-2">
                <Layers size={16} className="text-[#0052CC]" /> Diagram 1: Multi-Property Tenancy Hierarchy Matrix
              </h3>
              <p className="font-inter text-[10px] font-semibold text-slate-700 mb-2">
                Group management views consolidated analytics, while properties maintain strict operational data boundaries.
              </p>

              <div className="border-2 border-slate-300 bg-white p-3 rounded-lg text-[9px] font-inter text-center">
                <div className="border-2 border-[#071D3D] bg-[#071D3D] text-white p-1.5 rounded max-w-xs mx-auto font-black uppercase font-mono">
                  Master Enterprise Account (Holding Group)
                </div>
                <div className="h-2 w-px bg-slate-400 mx-auto my-1"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-[#0052CC] p-2 rounded bg-blue-50/50">
                    <p className="font-black text-[#071D3D] uppercase">Property 1: Victoria Island Resort</p>
                    <p className="text-[7.5px] font-mono text-slate-600 mt-0.5">Isolated Menus &bull; 120 Rooms &bull; 4 Terminals</p>
                  </div>
                  <div className="border-2 border-emerald-600 p-2 rounded bg-emerald-50/50">
                    <p className="font-black text-[#071D3D] uppercase">Property 2: Lekki Boutique Suites</p>
                    <p className="text-[7.5px] font-mono text-slate-600 mt-0.5">Isolated Menus &bull; 45 Rooms &bull; 2 Terminals</p>
                  </div>
                </div>
                <p className="font-mono text-[7.5px] text-[#0052CC] font-bold mt-2">
                  Enforced at Kernel: WHERE tenant_id = auth.tenant() AND property_id = auth.property()
                </p>
              </div>
            </div>

            {/* F&B POS SPECIFICATION */}
            <div className="border-2 border-slate-300 bg-white p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-2">
                <Utensils size={16} className="text-[#0052CC]" /> Section 4.0: Front-of-House Restaurant &amp; Bar Engine
              </h3>
              
              <div className="grid grid-cols-2 gap-3 font-inter text-[10.5px] font-semibold text-[#000000]">
                <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                  <p className="font-black text-[#071D3D] uppercase text-[10px]">Visual Table Sections</p>
                  <p className="mt-0.5 leading-snug">Dining maps for Main Floor, Pool Bar, and VIP Lounge with live color-coded table states.</p>
                </div>
                <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                  <p className="font-black text-[#071D3D] uppercase text-[10px]">Order-Only Handheld Mode</p>
                  <p className="mt-0.5 leading-snug">Checkout/Pay button is locked out on waiter tablets, restricting payment handling to cashiers.</p>
                </div>
                <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                  <p className="font-black text-[#071D3D] uppercase text-[10px]">KDS &amp; Network Routing</p>
                  <p className="mt-0.5 leading-snug">Bar drinks route to bar printer; food routes to kitchen screen with continuous order dockets.</p>
                </div>
                <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                  <p className="font-black text-[#071D3D] uppercase text-[10px]">Blind Shift Cash Drops</p>
                  <p className="mt-0.5 leading-snug">Cashiers must count and declare cash blind before the system reveals shift variance.</p>
                </div>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 5: RECIPE BOM & LODGING PMS ENGINE                   */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="05" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 5.0 &amp; 6.0 // Control &amp; Lodging</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                5.0 Anti-Theft Recipe BOM &amp; 6.0 Hotel PMS
              </h2>
            </div>

            {/* RECIPE BOM & DIAGRAM 3 */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] mb-1 flex items-center gap-2">
                <Database size={16} className="text-emerald-700" /> Diagram 3: Recipe BOM Depletion Mechanics
              </h3>
              <p className="font-inter text-[10px] font-semibold text-slate-700 mb-2">
                Every sale triggers automated, atomic deductions of raw ingredients across inventory stores.
              </p>

              <div className="border-2 border-slate-300 bg-white p-3 rounded-lg font-inter text-[9.5px]">
                <div className="flex items-center justify-between gap-2 text-center font-bold">
                  <div className="border-2 border-[#071D3D] bg-slate-100 p-2 rounded w-28">
                    <p className="font-black text-[#071D3D]">1 Cocktail Sold</p>
                    <p className="text-[7.5px] font-mono text-slate-500">POS Sale Event</p>
                  </div>
                  <ArrowRight size={14} className="text-[#0052CC] shrink-0" />
                  <div className="grid grid-cols-4 gap-1.5 grow">
                    <div className="bg-slate-50 border p-1 rounded font-mono text-[8px]">
                      <span className="font-black text-red-700">-50ml</span> Rum
                    </div>
                    <div className="bg-slate-50 border p-1 rounded font-mono text-[8px]">
                      <span className="font-black text-red-700">-10ml</span> Syrup
                    </div>
                    <div className="bg-slate-50 border p-1 rounded font-mono text-[8px]">
                      <span className="font-black text-red-700">-1 Unit</span> Lime
                    </div>
                    <div className="bg-slate-50 border p-1 rounded font-mono text-[8px]">
                      <span className="font-black text-red-700">-6</span> Mint Leaves
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOTEL PMS & HOUSEKEEPING */}
            <div className="border-2 border-slate-300 bg-white p-4 rounded-xl space-y-3">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-2">
                <Hotel size={16} className="text-[#0052CC]" /> Section 6.0: Lodging PMS &amp; Unified Room Folio
              </h3>

              <div className="space-y-2 font-inter text-[11px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>Visual Tape Chart Matrix:</strong> Drag-and-drop calendar for room allocations, extensions, and walk-ins.
                </p>
                <p>
                  <strong>Enforced Housekeeping States:</strong> Un-skippable room transitions (`Vacant Dirty` &rarr; `Cleaning` &rarr; `Inspected` &rarr; `Ready To Book`). Receptionists cannot book uninspected rooms.
                </p>
                <p>
                  <strong>Zero-Fraud Room Folio:</strong> Guests charge food, laundry, and drinks to their room. POS verifies active check-in and remaining credit limit in real-time, outputting one consolidated checkout invoice.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>
        {/* ========================================================= */}
        {/* PAGE 6: OFFLINE MESH RELAY & $0 CLOUD HOSTING             */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="06" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 7.0 &amp; 8.0 // Infrastructure</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                7.0 Local-First Mesh &amp; 8.0 Zero-Cost Cloud Strategy
              </h2>
            </div>

            {/* DIAGRAM 2: OFFLINE SYNC MESH RELAY */}
            <div className="border-2 border-[#071D3D] rounded-xl p-3.5 bg-slate-50">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] mb-1 flex items-center gap-2">
                <WifiOff size={16} className="text-[#0052CC]" /> Diagram 2: Continuous Local Terminal &amp; Cloud Sync Relay
              </h3>
              <p className="font-inter text-[10px] font-semibold text-slate-700 mb-2">
                Local Wi-Fi router coordinates terminals offline; auto-syncs to cloud when internet returns.
              </p>

              <div className="border-2 border-slate-300 bg-white p-3 rounded-lg text-center font-inter text-[9px]">
                <div className="flex items-center justify-between gap-3 font-bold">
                  <div className="border-2 border-blue-600 bg-blue-50 p-2 rounded w-1/3">
                    <p className="text-[#071D3D]">Local POS Terminals</p>
                    <p className="text-[7px] font-mono text-slate-500">Waiter Tablets &bull; Kitchen KDS</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[7.5px] font-mono text-emerald-700 font-bold">&lt; 50ms LAN Relay</span>
                    <div className="h-0.5 w-16 bg-[#10B981] my-1"></div>
                    <span className="text-[7.5px] font-mono text-slate-500">Auto Delta Sync</span>
                  </div>
                  <div className="border-2 border-[#071D3D] bg-[#071D3D] text-white p-2 rounded w-1/3">
                    <p className="text-white">Central Cloud DB</p>
                    <p className="text-[7px] font-mono text-slate-300">PostgreSQL (Neon)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 8: ZERO-COST CLOUD STRATEGY TABLE */}
            <div className="border-2 border-slate-300 bg-white p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-2">
                <Zap size={16} className="text-[#0052CC]" /> Section 8.0: The Zero-Cost Cloud Strategy ($0 Startup)
              </h3>
              <p className="font-inter text-[10.5px] font-semibold text-[#000000] leading-snug">
                Production architecture leverages enterprise free-capacity tiers to keep monthly cloud overhead at <strong>$0 / month</strong> during the initial property onboarding phase:
              </p>

              <table className="w-full border-collapse text-left font-inter text-[9.5px]">
                <thead className="bg-[#071D3D] text-white font-mono font-bold text-[8px] uppercase">
                  <tr>
                    <th className="p-1.5">Layer</th>
                    <th className="p-1.5">Service</th>
                    <th className="p-1.5">Free Allocation</th>
                    <th className="p-1.5">Scales When?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold text-[#000000]">
                  <tr>
                    <td className="p-1.5 font-bold">Database</td>
                    <td className="p-1.5">Neon Postgres</td>
                    <td className="p-1.5 font-mono">0.5 GB Storage</td>
                    <td className="p-1.5 text-slate-600">&gt; 500k records</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-1.5 font-bold">Hosting</td>
                    <td className="p-1.5">Vercel / Cloudflare</td>
                    <td className="p-1.5 font-mono">Unlimited CDN</td>
                    <td className="p-1.5 text-slate-600">&gt; 1M requests/mo</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold">Storage</td>
                    <td className="p-1.5">Cloudflare R2</td>
                    <td className="p-1.5 font-mono">10 GB Free Storage</td>
                    <td className="p-1.5 text-slate-600">&gt; 10k receipts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 7: THIRD-PARTY UTILITIES & DECOUPLED STORES          */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="07" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 9.0 &amp; 10.0 // Operations</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                9.0 Third-Party Accounts &amp; 10.0 Store Protocol
              </h2>
            </div>

            {/* THIRD-PARTY COST SCHEDULE */}
            <div className="border-2 border-slate-300 bg-white p-3.5 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D]">
                Section 9.0: Direct Client Third-Party Utility Accounts
              </h3>
              <p className="font-inter text-[10.5px] font-semibold text-[#000000] leading-snug">
                The ₦1,000,000 engineering investment covers 100% of software labor. Third-party utility licenses are billed directly to client accounts:
              </p>

              <table className="w-full border-collapse text-left font-inter text-[9.5px]">
                <thead className="bg-[#071D3D] text-white font-mono font-bold text-[8px] uppercase">
                  <tr>
                    <th className="p-1.5">Utility Service</th>
                    <th className="p-1.5">Estimated Cost</th>
                    <th className="p-1.5">Billing Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-semibold text-[#000000]">
                  <tr>
                    <td className="p-1.5 font-bold">Google Play Developer Account</td>
                    <td className="p-1.5 font-mono">$25</td>
                    <td className="p-1.5 text-slate-700">One-time (Paid to Google)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-1.5 font-bold">Apple Developer Program</td>
                    <td className="p-1.5 font-mono">$99</td>
                    <td className="p-1.5 text-slate-700">Annual (Paid to Apple)</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold">Custom Domains (.com / .ng)</td>
                    <td className="p-1.5 font-mono">~₦15,000</td>
                    <td className="p-1.5 text-slate-700">Annual registration</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-1.5 font-bold">SMS Notifications (Termii)</td>
                    <td className="p-1.5 font-mono">~₦4.50 / SMS</td>
                    <td className="p-1.5 text-slate-700">Usage wallet funded by client</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* STORE DEPLOYMENT DECOUPLING */}
            <div className="border-2 border-slate-300 bg-slate-50 p-4 rounded-xl space-y-2">
              <h3 className="font-display text-xs font-black uppercase text-[#071D3D] flex items-center gap-2">
                <Globe size={16} className="text-[#0052CC]" /> Section 10.0: Store Deployment Decoupling Protocol
              </h3>
              <div className="space-y-2 font-inter text-[11px] font-semibold text-[#000000] leading-relaxed">
                <p>
                  <strong>Instant Operations (Day 1):</strong> Hotels do not wait for app store review times. Android waiter tablets run on verified standalone APKs, and Windows front-desks run on direct native executables (`.exe`), enabling immediate deployment.
                </p>
                <p>
                  <strong>Decoupled Review Cycle:</strong> Public Google Play (14-day 20-tester requirement) and Apple App Store review cycles proceed independently without blocking client property operations.
                </p>
              </div>
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 8: SCOPE BOUNDARY & 3-STAGE MILESTONE SCHEDULE        */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="08" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 11.0 &amp; 12.0 // Governance</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                11.0 Scope Boundary &amp; 12.0 Milestone Schedule
              </h2>
            </div>

            {/* SCOPE BOUNDARY TABLE */}
            <div className="border-2 border-[#071D3D] rounded-xl overflow-hidden font-inter text-[10px]">
              <div className="bg-[#071D3D] text-white p-2 font-mono font-bold text-[8.5px] uppercase">
                Included in ₦1,000,000 Core Investment vs. Phase 2 Add-ons
              </div>
              <div className="p-3 bg-white space-y-1.5 font-semibold text-[#000000]">
                <p className="text-emerald-700 font-bold">&check; INCLUDED: Full F&amp;B POS, Kitchen KDS, Offline Mesh, Recipe BOM Depletion, PMS Tape Chart, Multi-Tenant Hierarchy, Windows (.exe) &amp; Android (.apk) packages.</p>
                <p className="text-red-700 font-bold">&times; PHASE 2 ADD-ONS: Physical Smart Door Lock Integration, Elevator Relays, Gym Membership Turnstiles, Laundry Barcodes, Event Hall Reservations, WooCommerce Sync.</p>
              </div>
            </div>

            {/* 3 MILESTONE SCHEDULE */}
            <div className="border-2 border-slate-300 rounded-xl overflow-hidden font-inter text-[10px]">
              <div className="bg-slate-900 text-white p-2 font-mono font-bold text-[8.5px] uppercase">
                Section 12.0: 3-Stage Milestone Payment Schedule
              </div>
              <div className="divide-y divide-slate-200 bg-white font-semibold text-[#000000]">
                <div className="p-3 flex justify-between items-center bg-slate-50">
                  <div>
                    <p className="font-bold text-[#071D3D]">Milestone 1 (40%) &mdash; Architecture &amp; UI/UX</p>
                    <p className="text-[9px] text-slate-600">Complete Figma design system, multi-tenant database deployment, user roles.</p>
                  </div>
                  <span className="font-mono font-black text-sm text-[#0052CC]">₦400,000</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#071D3D]">Milestone 2 (40%) &mdash; F&amp;B POS &amp; Recipe BOM</p>
                    <p className="text-[9px] text-slate-600">Working POS, KDS routing, offline SQLite engine, recipe stock depletion demo.</p>
                  </div>
                  <span className="font-mono font-black text-sm text-[#0052CC]">₦400,000</span>
                </div>
                <div className="p-3 flex justify-between items-center bg-slate-50">
                  <div>
                    <p className="font-bold text-[#071D3D]">Milestone 3 (20%) &mdash; PMS Tape Chart &amp; Handover</p>
                    <p className="text-[9px] text-slate-600">Room availability calendar, unified folio billing, Windows/Android production builds.</p>
                  </div>
                  <span className="font-mono font-black text-sm text-emerald-700">₦200,000</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border-l-4 border-[#D4AF37] rounded-r text-[10.5px] font-semibold text-slate-800">
              <strong>Total Investment: ₦1,000,000 (One Million Naira)</strong> &bull; Fixed turnkey commitment covering engineering and design execution.
            </div>
          </main>
          <DocFooter />
        </div>

        {/* ========================================================= */}
        {/* PAGE 9: DIAGRAM INDEX & VERIFICATION SEAL                 */}
        {/* ========================================================= */}
        <div className="a4-page">
          <Watermark />
          <DocHeader pageNum="09" />

          <main className="grow flex flex-col justify-between relative z-10">
            <div>
              <span className="font-mono text-[9px] font-black text-[#0052CC] uppercase tracking-widest">Section 13.0 // Final Authorization</span>
              <h2 className="font-display text-2xl font-black uppercase text-[#071D3D] mt-0.5 mb-2">
                13.0 Architectural Verification &amp; Seal
              </h2>
            </div>

            <div className="border-2 border-slate-300 bg-slate-50 p-5 rounded-xl space-y-3 font-inter text-[11px] font-semibold text-[#000000]">
              <p>
                This Master Architectural Addendum establishes the complete, un-compromised scope of work for the Zuri Point of Sales Hub. By executing this blueprint, all operational leakages are systematically eliminated through closed-loop engineering.
              </p>
              <p>
                The system architecture balances mathematical certainty, local-first offline continuity, and enterprise multi-tenancy at a predictable ₦0 bootstrap hosting cost.
              </p>
            </div>

            {/* CORPORATE VERIFICATION STAMP */}
            <div className="border-4 border-[#071D3D] p-6 rounded-2xl bg-white space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <img src={logoUrl} alt="Eden Studios" className="h-10 object-contain" />
                  <div>
                    <h3 className="font-display text-base font-black uppercase text-[#071D3D]">
                      Eden Studios Engineering Group
                    </h3>
                    <p className="font-mono text-[9px] font-bold text-[#0052CC] uppercase tracking-widest">
                      Commercial Solutions Architecture
                    </p>
                  </div>
                </div>
                <div className="border-2 border-emerald-600 bg-emerald-50 px-3 py-1 rounded text-center">
                  <p className="font-mono text-[8px] font-black uppercase text-emerald-800">Status</p>
                  <p className="font-mono text-xs font-black text-emerald-700">APPROVED</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-[9.5px] font-bold text-slate-800">
                <p>DOCUMENT ID: ZURI-SOW-ADDENDUM-2026-V1</p>
                <p>TOTAL TIMELINE: 8 WEEKS EXACT</p>
                <p>FIXED VALUATION: ₦1,000,000 NGN</p>
                <p>ISSUE DATE: {currentDate}</p>
              </div>
            </div>

            <div className="text-center font-mono text-[9px] font-bold text-slate-500 uppercase tracking-widest py-2">
              End of Master Architectural Addendum Payload
            </div>
          </main>
          <DocFooter />
        </div>

      </div>
    </div>
  );
}
