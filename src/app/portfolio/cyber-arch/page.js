"use client";
import { useState, useEffect } from "react";
import { 
  Download, Shield, Server, Database, Lock, 
  Network, Globe, Cpu, Activity, QrCode, CheckCircle2 
} from "lucide-react";

export default function CyberArchitecture() {
  const[isReady, setIsReady] = useState(false);
  const [cryptoHash, setCryptoHash] = useState("");

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
    const generateHash = async () => {
      const data = `CYBER_ARCH_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setCryptoHash(hashHex);
    };
    generateHash();
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "CYBERSECURITY_ARCHITECTURE_PORTFOLIO";
    window.print();
    document.title = originalTitle;
  };

  const imgShield = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774507148/blog_assets/evoaongpcpeb0hrkfm9y.png";
  const imgNetwork = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774507158/blog_assets/h8v0heyomsk0zsatwy4g.png";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-[#10B981]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #050505; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #050505; box-sizing: border-box; overflow: hidden; }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* CYBER GLOWS - Print Safe */
        .glow-emerald { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
        .glow-blue { box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
        .text-glow { text-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#050505]">
        <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] p-12 text-center shadow-2xl border-t-4 border-[#10B981]">
          <Shield size={48} className="text-[#10B981] mx-auto mb-6" />
          <h1 className="font-inter text-3xl font-black text-white mb-2 uppercase tracking-tighter">Cyber Architecture</h1>
          <p className="font-mono text-[#10B981] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Enterprise Schematics</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#10B981]">COMPILING TOPOLOGY...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#10B981] text-[#050505] font-inter font-black uppercase tracking-widest transition-all hover:bg-white glow-emerald">Extract Schematics</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOCUMENT (HARDCODED MILLIMETERS) === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page">
          <div className="absolute top-0 left-0 w-full h-[160mm] overflow-hidden">
            <img src={imgShield} alt="Cyber Shield" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute top-[160mm] left-0 w-full h-[137mm] bg-[#050505] p-[20mm] flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] font-black text-[#10B981] uppercase tracking-[0.4em] mb-4">Enterprise Infrastructure</p>
              <h1 className="font-inter text-[55px] font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 text-glow">
                Cybersecurity<br/>Solution<br/>Architecture
              </h1>
              <div className="h-[2px] w-16 bg-[#10B981] mb-6"></div>
              <p className="font-mono text-sm text-slate-400 leading-relaxed max-w-md">
                High-fidelity technical schematics translating complex security flows, logical zones, and integration points into executive-ready visuals.
              </p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-inter text-2xl font-black text-white uppercase tracking-[0.2em]">Bolu Adeoye</h2>
                <p className="font-mono text-[8px] font-bold text-[#10B981] uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
              </div>
              <div className="w-10 h-10 border border-[#10B981] flex items-center justify-center bg-[#0A0A0A]">
                <Shield size={16} className="text-[#10B981]" />
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: ZERO-TRUST SCHEMATIC */}
        <div className="a4-page">
          <div className="absolute top-[15mm] left-[15mm] w-[180mm] border-b border-white/10 pb-4 flex justify-between items-end">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.4em] text-[#10B981]">Diagram 01 // Logical Zones</span>
            <span className="font-mono text-[10px] font-black text-slate-500">PAGE 02</span>
          </div>

          <div className="absolute top-[35mm] left-[15mm] w-[180mm]">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-tighter mb-2">Zero-Trust Data Flow</h2>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Customer-Facing Problem: Secure Multi-Tenant Access</p>
          </div>

          <div className="absolute top-[70mm] left-[15mm] w-[180mm] h-[180mm] bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)', backgroundSize: '10mm 10mm' }}></div>
            
            <div className="absolute top-[5mm] left-[5mm] font-mono text-[8px] text-slate-500 uppercase">Public Internet</div>
            <div className="absolute top-[5mm] left-[65mm] font-mono text-[8px] text-yellow-500 uppercase">DMZ / Edge</div>
            <div className="absolute top-[5mm] left-[125mm] font-mono text-[8px] text-[#10B981] uppercase">Secure Core</div>

            <div className="absolute top-0 left-[60mm] w-px h-full bg-white/10 border-l border-dashed border-slate-600"></div>
            <div className="absolute top-0 left-[120mm] w-px h-full bg-white/10 border-l border-dashed border-slate-600"></div>

            <div className="absolute top-[70mm] left-[10mm] w-[40mm] h-[20mm] bg-black border border-slate-600 flex items-center justify-center gap-2 z-10">
              <Globe size={14} className="text-slate-400"/>
              <span className="font-mono text-[8px] text-white font-bold">Client Request</span>
            </div>

            <div className="absolute top-[80mm] left-[50mm] w-[20mm] h-px bg-yellow-500 z-0"></div>

            <div className="absolute top-[70mm] left-[70mm] w-[40mm] h-[20mm] bg-black border border-yellow-500 flex items-center justify-center gap-2 z-10 glow-emerald">
              <Shield size={14} className="text-yellow-500"/>
              <span className="font-mono text-[8px] text-white font-bold">Cloudflare WAF</span>
            </div>

            <div className="absolute top-[80mm] left-[110mm] w-[20mm] h-px bg-[#10B981] z-0"></div>

            <div className="absolute top-[70mm] left-[130mm] w-[40mm] h-[20mm] bg-black border border-[#10B981] flex items-center justify-center gap-2 z-10 glow-emerald">
              <Server size={14} className="text-[#10B981]"/>
              <span className="font-mono text-[8px] text-white font-bold">API Gateway</span>
            </div>

            <div className="absolute top-[90mm] left-[150mm] w-px h-[20mm] bg-[#10B981] z-0"></div>

            <div className="absolute top-[110mm] left-[130mm] w-[40mm] h-[20mm] bg-black border border-[#10B981] flex items-center justify-center gap-2 z-10">
              <Lock size={14} className="text-[#10B981]"/>
              <span className="font-mono text-[8px] text-white font-bold">IAM / OAuth</span>
            </div>

            <div className="absolute top-[130mm] left-[150mm] w-px h-[20mm] bg-[#10B981] z-0"></div>

            <div className="absolute top-[150mm] left-[130mm] w-[40mm] h-[20mm] bg-black border border-[#10B981] flex items-center justify-center gap-2 z-10">
              <Database size={14} className="text-[#10B981]"/>
              <span className="font-mono text-[8px] text-white font-bold">RLS Database</span>
            </div>
          </div>

          <div className="absolute bottom-[20mm] left-[15mm] w-[180mm] border-l-2 border-[#10B981] pl-4">
            <p className="font-inter text-[10px] text-slate-400 leading-relaxed">
              <strong className="text-white">Architectural Note:</strong> The WAF intercepts Layer 7 attacks at the edge. Only sanitized payloads reach the API Gateway, where Identity and Access Management (IAM) issues short-lived tokens for Row-Level Security (RLS) database queries.
            </p>
          </div>
        </div>

        {/* PAGE 3: EDGE-TO-CORE PIPELINE (FIXED BLUR) */}
        <div className="a4-page">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src={imgNetwork} alt="Network" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#050505]/60"></div>
          </div>

          <div className="absolute top-[15mm] left-[15mm] w-[180mm] border-b border-white/10 pb-4 flex justify-between items-end z-10">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">Diagram 02 // Integration Points</span>
            <span className="font-mono text-[10px] font-black text-slate-500">PAGE 03</span>
          </div>

          <div className="absolute top-[35mm] left-[15mm] w-[180mm] z-10">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-tighter mb-2">Edge-to-Core Telemetry</h2>
            <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">Scope: Global Security Monitoring & SIEM Integration</p>
          </div>

          {/* ABSOLUTE POSITIONED CSS DIAGRAM - BLUR REMOVED, SOLID BG ADDED */}
          <div className="absolute top-[70mm] left-[15mm] w-[180mm] h-[180mm] bg-[#0A0A0A] border border-[#3B82F6]/50 rounded-xl overflow-hidden z-10">
            
            <div className="absolute top-[20mm] left-[10mm] w-[40mm] h-[15mm] bg-black border border-slate-600 flex items-center justify-center gap-2 z-10">
              <Activity size={12} className="text-slate-400"/><span className="font-mono text-[7px] text-white">US-EAST Node</span>
            </div>
            <div className="absolute top-[80mm] left-[10mm] w-[40mm] h-[15mm] bg-black border border-slate-600 flex items-center justify-center gap-2 z-10">
              <Activity size={12} className="text-slate-400"/><span className="font-mono text-[7px] text-white">EU-WEST Node</span>
            </div>
            <div className="absolute top-[140mm] left-[10mm] w-[40mm] h-[15mm] bg-black border border-slate-600 flex items-center justify-center gap-2 z-10">
              <Activity size={12} className="text-slate-400"/><span className="font-mono text-[7px] text-white">AP-SOUTH Node</span>
            </div>

            <div className="absolute top-[27mm] left-[50mm] w-[20mm] h-[60mm] border-t border-r border-[#3B82F6] rounded-tr-lg z-0"></div>
            <div className="absolute top-[87mm] left-[50mm] w-[20mm] h-px bg-[#3B82F6] z-0"></div>
            <div className="absolute top-[87mm] left-[50mm] w-[20mm] h-[60mm] border-b border-r border-[#3B82F6] rounded-br-lg z-0"></div>

            <div className="absolute top-[75mm] left-[70mm] w-[40mm] h-[25mm] bg-black border border-[#3B82F6] flex flex-col items-center justify-center z-10 glow-blue">
              <Network size={14} className="text-[#3B82F6] mb-1"/>
              <span className="font-mono text-[8px] text-white font-bold">Log Aggregator</span>
            </div>

            <div className="absolute top-[87mm] left-[110mm] w-[20mm] h-px bg-[#3B82F6] z-0"></div>

            <div className="absolute top-[65mm] left-[130mm] w-[40mm] h-[45mm] bg-black border-2 border-[#3B82F6] flex flex-col items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Shield size={20} className="text-[#3B82F6] mb-2"/>
              <span className="font-mono text-[9px] text-white font-bold">Core SIEM</span>
              <span className="font-mono text-[6px] text-slate-400 mt-1">Threat Analysis</span>
            </div>
          </div>

          <div className="absolute bottom-[20mm] left-[15mm] w-[180mm] border-l-2 border-[#3B82F6] pl-4 z-10">
            <p className="font-inter text-[10px] text-slate-300 leading-relaxed">
              <strong className="text-white">Data Flow Context:</strong> Distributed edge nodes stream telemetry via encrypted tunnels to a centralized Log Aggregator. The Core SIEM processes this data for anomaly detection, providing a unified pane of glass for the Security Operations Center (SOC).
            </p>
          </div>
        </div>

        {/* PAGE 4: THE FINAL SEAL */}
        <div className="a4-page">
          <div className="absolute top-[60mm] left-[75mm] w-[60mm] h-[60mm] bg-white p-[2mm]">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://boluadeoye.com.ng/portfolio/cyber-arch" className="w-full h-full" />
          </div>
          <div className="absolute top-[125mm] left-[55mm] w-[100mm] text-center">
            <p className="font-mono text-[8px] font-bold text-[#10B981] uppercase tracking-[0.3em]">Scan to Verify Live Architecture</p>
          </div>

          <div className="absolute top-[160mm] left-[45mm] w-[120mm] border-4 border-[#10B981] text-[#10B981] font-inter font-black text-3xl tracking-[0.3em] py-4 text-center transform -rotate-6 opacity-90">
            VERIFIED SCHEMATIC
          </div>

          <div className="absolute top-[220mm] left-[20mm] w-[170mm] border-t border-white/20 pt-[5mm] flex justify-between items-end">
            <div>
              <h2 className="font-inter text-2xl font-black text-white uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-mono text-[8px] font-bold text-[#10B981] uppercase tracking-[0.4em] mt-1">Systems & Security Architect</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[6px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Hash</p>
              <p className="font-mono text-[8px] text-slate-300">{cryptoHash}</p>
            </div>
          </div>
          <div className="absolute bottom-[15mm] left-[20mm]">
            <p className="font-mono text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">PAGE 04</p>
          </div>
        </div>

      </div>
    </div>
  );
}
