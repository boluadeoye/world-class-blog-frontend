"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Cpu, Lock, ChevronRight, Layers, Activity, DollarSign, ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "security", title: "Cryptography", icon: <Lock size={16} /> },
  { id: "execution", title: "Intent Engine", icon: <Zap size={16} /> },
  { id: "ai", title: "AI Audit", icon: <Cpu size={16} /> },
  { id: "economics", title: "Tokenomics", icon: <DollarSign size={16} /> }
];

const contentData = {
  security: (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">01. The Non-Custodial Enclave</h2>
        <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
          Unlike Telegram bots which store private keys on centralized servers, Onyx Sovereign utilizes a <strong>Client-Side Only</strong> architecture protected by hardware biometrics.
        </p>
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto shadow-inner">
          <p className="mb-3 text-slate-600">// Architecture: Key Isolation</p>
          <p className="mb-1">1. User authenticates via <span className="text-white">WebAuthn</span> (FaceID).</p>
          <p className="mb-1">2. Hardware Enclave releases wrapped key.</p>
          <p className="mb-1">3. <span className="text-blue-400">Web Worker</span> decrypts in isolated thread.</p>
          <p className="mb-1">4. Transaction signed in Worker.</p>
          <p className="mt-3 text-red-500 font-bold">Result: Private Key never touches the UI.</p>
        </div>
      </div>
    </div>
  ),
  execution: (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">02. Intent-Based Routing</h2>
        <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
          Onyx does not execute "Swaps." It broadcasts "Intents." We aggregate liquidity from <strong>CowSwap, UniswapX, and 1inch Fusion</strong> to find the optimal execution path off-chain.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <div className="border border-white/10 p-5 rounded-xl bg-white/5">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Activity size={16} className="text-blue-500"/> MEV Protection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Transactions are routed through private RPCs (Flashbots Protect), bypassing the public mempool where sandwich attacks occur.</p>
          </div>
          <div className="border border-white/10 p-5 rounded-xl bg-white/5">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Layers size={16} className="text-blue-500"/> Gas Abstraction</h4>
            <p className="text-xs text-slate-400 leading-relaxed">ERC-4337 Paymasters allow users to pay gas in USDC/USDT. No need to hold ETH/SOL for fees.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  ai: (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">03. Pre-Flight Heuristics</h2>
        <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
          We utilize <strong>Groq LPU</strong> hardware to achieve sub-200ms inference times. Before a user signs a transaction, the contract bytecode is analyzed against a RAG database.
        </p>
        <div className="bg-red-950/10 border-l-4 border-red-600 p-6 rounded-r-xl">
          <h4 className="text-red-500 font-bold text-sm uppercase mb-3">Detection Scope</h4>
          <ul className="text-xs text-slate-300 space-y-2 font-mono">
            <li className="flex items-center gap-2"><span className="text-red-600">[x]</span> Honeypot Logic (Transfer disable)</li>
            <li className="flex items-center gap-2"><span className="text-red-600">[x]</span> Hidden Tax Modifiers (&gt;50%)</li>
            <li className="flex items-center gap-2"><span className="text-red-600">[x]</span> Renounced Ownership Verification</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  economics: (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">04. The Success Model</h2>
        <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
          Traditional exchanges charge volume fees (you pay even if you lose). Onyx charges a <strong>2% Performance Fee</strong> on realized profits only.
        </p>
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-xs md:text-sm text-left">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="p-4 font-bold">Scenario</th>
                <th className="p-4 font-bold text-right">Onyx Fee</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-white/5">
                <td className="p-4">Trade Loss (-$500)</td>
                <td className="p-4 text-right text-white opacity-50">$0.00</td>
              </tr>
              <tr className="bg-emerald-900/10">
                <td className="p-4 font-bold text-white">Trade Win (+$1,000)</td>
                <td className="p-4 text-right text-emerald-400 font-bold">$20.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default function OnyxDocs() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-red-900 selection:text-white flex flex-col md:flex-row">
      
      {/* === MOBILE HEADER (Sticky) === */}
      <div className="md:hidden sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <ArrowLeft size={14} /> BACK
          </Link>
          <span className="font-black text-lg tracking-tighter text-white">ONYX<span className="text-red-600">.</span>DOCS</span>
          <div className="w-4"></div> {/* Spacer */}
        </div>
        
        {/* Horizontal Scroll Menu */}
        <div className="flex overflow-x-auto px-4 pb-0 scrollbar-hide gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
                activeTab === section.id 
                  ? "text-white border-red-600" 
                  : "text-slate-600 border-transparent"
              }`}
            >
              {section.title.split(". ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* === DESKTOP SIDEBAR === */}
      <aside className="hidden md:flex w-72 bg-black border-r border-white/10 flex-col h-screen sticky top-0">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft size={14} /> Return Home
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-1">ONYX<span className="text-red-600">.</span>DOCS</h1>
          <p className="text-xs text-slate-500 font-mono">Architecture v2.0</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === section.id 
                  ? "bg-white text-black" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {section.icon}
              <span className="uppercase tracking-wide">{section.title}</span>
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

      {/* === MAIN CONTENT === */}
      <main className="flex-1 p-6 md:p-16 md:overflow-y-auto min-h-[80vh]">
        <div className="max-w-2xl mx-auto pt-4 md:pt-0">
          {contentData[activeTab]}
        </div>
      </main>

    </div>
  );
}
