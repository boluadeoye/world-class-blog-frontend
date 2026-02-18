"use client";
import { useState, useEffect } from "react";
import { Shield, Zap, Cpu, Lock, ChevronRight, Layers, Activity, DollarSign, ArrowLeft, Menu, X, Hash, Terminal } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "security", title: "Cryptography", icon: <Lock size={16} /> },
  { id: "execution", title: "Intent Engine", icon: <Zap size={16} /> },
  { id: "ai", title: "AI Audit Layer", icon: <Cpu size={16} /> },
  { id: "economics", title: "Tokenomics", icon: <DollarSign size={16} /> }
];

export default function OnyxDocs() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-red-900 selection:text-white flex flex-col md:flex-row">
      
      {/* === MOBILE HEADER (Sticky) === */}
      <div className="md:hidden sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <ArrowLeft size={14} /> BACK
          </Link>
          <span className="font-black text-lg tracking-tighter text-white">ONYX<span className="text-red-600">.</span>DOCS</span>
        </div>
        {/* Quick Jump Bar */}
        <div className="flex overflow-x-auto px-4 pb-3 gap-4 scrollbar-hide">
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollToSection(s.id)} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap hover:text-white">
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* === DESKTOP SIDEBAR (Fixed) === */}
      <aside className="hidden md:flex w-72 bg-black border-r border-white/10 flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft size={14} /> Return Home
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-1">ONYX<span className="text-red-600">.</span>DOCS</h1>
          <p className="text-xs text-slate-500 font-mono">Architecture v2.0</p>
        </div>
        <nav className="p-4 space-y-1">
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollToSection(s.id)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all text-left">
              {s.icon} <span className="uppercase tracking-wide">{s.title}</span>
            </button>
          ))}
        </nav>
        <div className="p-8 mt-auto">
          <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono border border-emerald-500/30 bg-emerald-900/10 p-2 rounded">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            STATUS: OPTIMAL
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT (Scrolling) === */}
      <main className="flex-1 p-6 md:p-16">
        <div className="max-w-3xl mx-auto space-y-24 pb-24">
          
          {/* 01. SECURITY */}
          <section id="security" className="scroll-mt-32">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">01. Cryptography</h2>
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest">Client-Side Enclave</p>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
              Unlike Telegram bots which store private keys on centralized servers (creating a massive honeypot), Onyx Sovereign utilizes a <strong>Client-Side Only</strong> architecture protected by hardware biometrics.
            </p>
            <div className="bg-[#050505] border border-white/10 p-6 rounded-xl font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-slate-500">
                <Terminal size={12} /> <span>vault_worker.ts</span>
              </div>
              <p className="mb-2 text-slate-600">// Step 1: Hardware Auth</p>
              <p className="mb-2"><span className="text-purple-400">const</span> credential = <span className="text-blue-400">await</span> navigator.credentials.get(options);</p>
              <p className="mb-2 text-slate-600">// Step 2: Decrypt in Worker</p>
              <p className="mb-2"><span className="text-purple-400">const</span> key = <span className="text-yellow-400">AES</span>.decrypt(encryptedVault, credential.key);</p>
              <p className="mb-2 text-slate-600">// Step 3: Sign & Wipe</p>
              <p className="mb-2"><span className="text-purple-400">const</span> sig = <span className="text-blue-400">await</span> wallet.sign(tx);</p>
              <p className="text-red-500 font-bold">memory.wipe(key); // Immediate destruction</p>
            </div>
          </section>

          {/* 02. EXECUTION */}
          <section id="execution" className="scroll-mt-32">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">02. Intent Engine</h2>
              <p className="text-blue-500 font-mono text-xs uppercase tracking-widest">Routing & Solvers</p>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
              Onyx does not execute "Swaps." It broadcasts "Intents." We aggregate liquidity from <strong>CowSwap, UniswapX, and 1inch Fusion</strong> to find the optimal execution path off-chain, protecting you from MEV.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 p-6 rounded-xl bg-white/5">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Activity size={16} className="text-blue-500"/> MEV Protection</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Transactions are routed through private RPCs (Flashbots Protect), bypassing the public mempool where sandwich attacks occur.</p>
              </div>
              <div className="border border-white/10 p-6 rounded-xl bg-white/5">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Layers size={16} className="text-blue-500"/> Gas Abstraction</h4>
                <p className="text-xs text-slate-400 leading-relaxed">ERC-4337 Paymasters allow users to pay gas in USDC/USDT. No need to hold ETH/SOL for fees.</p>
              </div>
            </div>
          </section>

          {/* 03. AI AUDIT */}
          <section id="ai" className="scroll-mt-32">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">03. AI Audit Layer</h2>
              <p className="text-purple-500 font-mono text-xs uppercase tracking-widest">Groq LPU Inference</p>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
              We utilize <strong>Groq LPU</strong> hardware to achieve sub-200ms inference times. Before a user signs a transaction, the contract bytecode is analyzed against a RAG database of known exploit patterns.
            </p>
            <div className="bg-red-950/10 border-l-4 border-red-600 p-6 rounded-r-xl">
              <h4 className="text-red-500 font-bold text-sm uppercase mb-3">Detection Scope</h4>
              <ul className="text-xs text-slate-300 space-y-3 font-mono">
                <li className="flex items-center gap-3"><span className="text-red-600 font-bold">[x]</span> Honeypot Logic (Transfer disable functions)</li>
                <li className="flex items-center gap-3"><span className="text-red-600 font-bold">[x]</span> Hidden Tax Modifiers (&gt;50%)</li>
                <li className="flex items-center gap-3"><span className="text-red-600 font-bold">[x]</span> Renounced Ownership Verification</li>
                <li className="flex items-center gap-3"><span className="text-red-600 font-bold">[x]</span> Proxy Contract Vulnerabilities</li>
              </ul>
            </div>
          </section>

          {/* 04. ECONOMICS */}
          <section id="economics" className="scroll-mt-32">
            <div className="mb-6 border-b border-white/10 pb-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">04. Tokenomics</h2>
              <p className="text-yellow-500 font-mono text-xs uppercase tracking-widest">The Success Model</p>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
              Traditional exchanges charge volume fees (you pay even if you lose). Onyx charges a <strong>2% Performance Fee</strong> on realized profits only.
            </p>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-xs md:text-sm text-left">
                <thead className="bg-white/10 text-white">
                  <tr>
                    <th className="p-4 font-bold">Scenario</th>
                    <th className="p-4 font-bold text-right">User PnL</th>
                    <th className="p-4 font-bold text-right">Onyx Fee</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-white/5">
                    <td className="p-4">Trade Loss</td>
                    <td className="p-4 text-right text-red-500">-$500</td>
                    <td className="p-4 text-right text-white opacity-50">$0.00</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4">Break Even</td>
                    <td className="p-4 text-right text-slate-500">$0</td>
                    <td className="p-4 text-right text-white opacity-50">$0.00</td>
                  </tr>
                  <tr className="bg-emerald-900/10">
                    <td className="p-4 font-bold text-white">Trade Win</td>
                    <td className="p-4 text-right text-emerald-400">+$1,000</td>
                    <td className="p-4 text-right text-emerald-400 font-bold">$20.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
