"use client";
import { Download, ArrowLeft, Ruler, Droplets, Layers, Construction, Anchor } from "lucide-react";
import Link from "next/link";

export default function AgriProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Project_20K_Farm_Blueprint";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50 bg-green-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white border-4 border-green-600 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Construction size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-black text-green-900 mb-2 uppercase">Project 20K</h1>
          <p className="text-slate-500 text-sm mb-8 font-bold">Aquaculture Facility Blueprint</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl transition-all shadow-xl uppercase tracking-widest text-xs"
          >
            <Download size={18} />
            <span>Download Architectural Plan</span>
          </button>

          <Link href="/" className="block mt-6 text-xs font-bold text-slate-400 hover:text-green-600 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: SITE LAYOUT ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-[6px] border-green-700 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-1">Civil & Structural Design</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-green-900">
                Project<br/><span className="text-yellow-500">20K</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-green-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Approved Draft</div>
              <p className="text-xs font-mono font-bold">DATE: FEB 14, 2026</p>
            </div>
          </div>

          {/* 1. Project Specs */}
          <section className="mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border-2 border-green-700 p-3 bg-green-50">
                <p className="text-[10px] font-bold uppercase text-green-800">Total Capacity</p>
                <p className="text-2xl font-black text-green-900">20,000</p>
                <p className="text-[9px] font-bold">Fishes</p>
              </div>
              <div className="border-2 border-green-700 p-3 bg-green-50">
                <p className="text-[10px] font-bold uppercase text-green-800">Pond Units</p>
                <p className="text-2xl font-black text-green-900">10</p>
                <p className="text-[9px] font-bold">Concrete (4m x 5m)</p>
              </div>
              <div className="border-2 border-green-700 p-3 bg-green-50">
                <p className="text-[10px] font-bold uppercase text-green-800">Water Reserve</p>
                <p className="text-2xl font-black text-green-900">8,000L</p>
                <p className="text-[9px] font-bold">Overhead Gravity</p>
              </div>
            </div>
          </section>

          {/* 2. ARCHITECTURAL SITE PLAN (The Drawing) */}
          <section className="flex-1 border-4 border-black p-6 relative">
            <h2 className="absolute -top-3 left-4 bg-white px-2 text-sm font-black uppercase text-black">Site Layout Plan (Top View)</h2>
            
            {/* THE FARM DRAWING */}
            <div className="h-full flex flex-col gap-4">
              
              {/* WATER TOWER ZONE */}
              <div className="flex justify-center items-center gap-8 mb-4 border-b-2 border-dashed border-slate-300 pb-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-yellow-500 bg-yellow-100 flex items-center justify-center font-bold text-[10px] text-yellow-800">TANK A<br/>4000L</div>
                  <div className="h-8 w-1 bg-black"></div>
                </div>
                <div className="border-2 border-black px-4 py-2 bg-slate-200 text-[10px] font-bold text-center">
                  PUMP HOUSE<br/>(2x Machines)
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-yellow-500 bg-yellow-100 flex items-center justify-center font-bold text-[10px] text-yellow-800">TANK B<br/>4000L</div>
                  <div className="h-8 w-1 bg-black"></div>
                </div>
              </div>

              {/* MAIN SUPPLY LINE */}
              <div className="w-full h-1 bg-blue-500 mb-2 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-blue-600">1.5" PRESSURE LINE</span>
              </div>

              {/* POND GRID (2 Rows of 5) */}
              <div className="grid grid-cols-5 gap-3 flex-1">
                {/* ROW 1 */}
                {[1,2,3,4,5].map(n => (
                  <div key={n} className="border-4 border-green-800 bg-green-50 relative h-24 flex items-center justify-center">
                    <span className="font-black text-green-900 text-lg opacity-20">{n}</span>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div> {/* Inlet */}
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div> {/* Outlet */}
                  </div>
                ))}

                {/* CENTRAL WALKWAY / DRAINAGE */}
                <div className="col-span-5 h-8 bg-slate-200 border-y-2 border-slate-400 flex items-center justify-center">
                  <span className="text-[8px] font-bold tracking-[0.5em] text-slate-500">CENTRAL DRAINAGE CANAL (SLOPE 1:50)</span>
                </div>

                {/* ROW 2 */}
                {[6,7,8,9,10].map(n => (
                  <div key={n} className="border-4 border-green-800 bg-green-50 relative h-24 flex items-center justify-center">
                    <span className="font-black text-green-900 text-lg opacity-20">{n}</span>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div> {/* Outlet */}
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div> {/* Inlet */}
                  </div>
                ))}
              </div>

              {/* EFFLUENT PIT */}
              <div className="mt-4 border-2 border-dashed border-red-500 p-2 text-center bg-red-50">
                <p className="text-[10px] font-bold text-red-700 uppercase">Wastewater Collection / Sedimentation Pit</p>
              </div>

            </div>
          </section>

          <div className="text-right text-xs font-black text-slate-400 mt-4">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: STRUCTURAL SPECS ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          <h2 className="text-2xl font-black uppercase border-l-[10px] border-green-700 pl-4 mb-8 text-slate-900">3. Structural Specifications</h2>

          <div className="space-y-6">
            
            {/* A. CONCRETE SPECS */}
            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="font-black text-lg uppercase mb-2">A. Pond Construction (Reinforced Concrete)</h3>
              <ul className="list-disc pl-5 text-sm font-medium text-slate-800 space-y-2">
                <li><strong>Mix Ratio:</strong> 1:2:4 (Cement : Sharp Sand : Granite).</li>
                <li><strong>Wall Thickness:</strong> 6 inches (150mm) solid block filled with concrete.</li>
                <li><strong>Floor:</strong> 4-inch German floor with <strong>Iron Mesh (BRC)</strong> reinforcement.</li>
                <li><strong>Plastering:</strong> Waterproof cement finish (Smooth) to prevent fish injury.</li>
                <li><strong>Slope:</strong> 2-inch slope towards the outlet for easy drainage.</li>
              </ul>
            </div>

            {/* B. PLUMBING */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-black text-lg uppercase mb-2">B. Hydraulic System</h3>
              <ul className="list-disc pl-5 text-sm font-medium text-slate-800 space-y-2">
                <li><strong>Inlet Pipes:</strong> 1-inch Pressure Pipe (PVC). Control valve at each pond.</li>
                <li><strong>Drainage Pipes:</strong> 4-inch Waste Pipe (PVC). Must handle "Flash Drain" (emptying pond in &lt;15 mins).</li>
                <li><strong>Overflow:</strong> Screened overflow pipe at 1.1m height to prevent flooding during rain.</li>
              </ul>
            </div>

            {/* C. TOWER */}
            <div className="border-l-4 border-black pl-6">
              <h3 className="font-black text-lg uppercase mb-2">C. Water Tower Stand</h3>
              <ul className="list-disc pl-5 text-sm font-medium text-slate-800 space-y-2">
                <li><strong>Height:</strong> Minimum 3.5 meters (for gravity pressure).</li>
                <li><strong>Load Bearing:</strong> Must support 8,000kg (8 Tons) of water + Tank weight.</li>
                <li><strong>Columns:</strong> 4 Reinforced Concrete Columns (9x9 inches).</li>
              </ul>
            </div>

          </div>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t-[6px] border-green-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Designed By</p>
              <div className="font-serif italic text-5xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1.5 w-48 bg-green-700 mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-slate-600">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-green-900 text-white flex items-center justify-center font-black text-4xl rounded-xl shadow-2xl">
                BA
              </div>
            </div>
          </footer>
          
          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 2/2</div>
        </div>

      </div>
    </div>
  );
}
