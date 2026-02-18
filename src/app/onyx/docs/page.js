"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Cpu, Lock, Terminal, ChevronRight, Layers, Activity, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    id: "security",
    title: "01. Cryptography & Custody",
    icon: <Lock size={18} />,
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">The Non-Custodial Enclave</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Unlike Telegram bots (Unibot/Maestro) which store private keys on centralized servers, Onyx Sovereign utilizes a <strong>Client-Side Only</strong> architecture.
          </p>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto">
            <p className="mb-2 text-slate-500">// Architecture: Key Isolation</p>
            <p>1. User authenticates via WebAuthn (FaceID/TouchID).</p>
            <p>2. Hardware Enclave releases wrapped encryption key.</p>
            <p>3. <span className="text-white">Web Worker</span> decrypts Private Key in isolated thread.</p>
            <p>4. Transaction signed in Worker.</p>
            <p>5. Only signed hash returns to UI thread.</p>
            <p className="mt-2 text-red-500">Result: Private Key never touches the DOM.</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Attack Vector Mitigation</h3>
          <ul className="list-disc pl-5 text-slate-400 space-y-2">
            <li><strong>XSS Attacks:</strong> Mitigated via Worker isolation. Even if the UI is compromised, the Worker memory is inaccessible.</li>
            <li><strong>Server Seizure:</strong> Impossible. We do not have a database of keys. We cannot freeze funds even if compelled.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "execution",
    title: "02. The Intent Engine",
    icon: <Zap size={18} />,
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Intent-Based Routing</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Onyx does not execute "Swaps." It broadcasts "Intents." We aggregate liquidity from <strong>CowSwap, UniswapX, and 1inch Fusion</strong> to find the optimal execution path off-chain.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-800 p-4 rounded-lg bg-slate-900/50">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Activity size={16} className="text-blue-500"/> MEV Protection</h4>
            <p className="text-xs text-slate-400">Transactions are routed through private RPCs (Flashbots Protect), bypassing the public mempool where sandwich attacks occur.</p>
          </div>
          <div className="border border-slate-800 p-4 rounded-lg bg-slate-900/50">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Layers size={16} className="text-blue-500"/> Gas Abstraction</h4>
            <p className="text-xs text-slate-400">ERC-4337 Paymasters allow users to pay gas in USDC/USDT. No need to hold ETH/SOL for fees.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "ai",
    title: "03. AI Audit Layer",
    icon: <Cpu size={18} />,
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Pre-Flight Heuristics</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            We utilize <strong>Groq LPU</strong> hardware to achieve sub-200ms inference times. Before a user signs a transaction, the contract bytecode is analyzed against a RAG database of known exploit patterns.
          </p>
          <div className="bg-slate-900 border-l-4 border-red-500 p-4">
            <h4 className="text-white font-bold text-sm uppercase mb-1">Detection Scope</h4>
            <ul className="text-xs text-slate-400 space-y-1 font-mono">
              <li>[x] Honeypot Logic (Transfer disable)</li>
              <li>[x] Hidden Tax Modifiers (>50%)</li>
              <li>[x] Renounced Ownership Verification</li>
              <li>[x] Proxy Contract Vulnerabilities</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "economics",
    title: "04. Tokenomics & Fees",
    icon: <DollarSign size={18} />,
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">The Success-Aligned Model</h2>
          <p className="text-slate-400 leading-relaxed">
            Traditional exchanges charge volume fees (you pay even if you lose). Onyx charges a <strong>2% Performance Fee</strong> on realized profits only.
          </p>
        </div>
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4">Scenario</th>
                <th className="p-4">User PnL</th>
                <th className="p-4 text-right">Onyx Fee</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="p-4">Trade Loss</td>
                <td className="p-4 text-red-500">-$500</td>
                <td className="p-4 text-right text-white">$0.00</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="p-4">Break Even</td>
                <td className="p-4 text-slate-500">$0</td>
                <td className="p-4 text-right text-white">$0.00</td>
              </tr>
              <tr className="bg-emerald-900/10">
                <td className="p-4 font-bold text-white">Trade Win</td>
                <td className="p-4 text-emerald-400">+$1,000</td>
                <td className="p-4 text-right text-emerald-400">$20.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
];

export default function OnyxDocs() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-red-900 selection:text-white flex flex-col md:flex-row">
      
      {/* === SIDEBAR NAVIGATION === */}
      <aside className="w-full md:w-80 bg-slate-950 border-r border-white/10 flex-shrink-0 md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest mb-6 transition-colors">
            <ArrowLeft size={14} /> Return Home
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-1">ONYX<span className="text-red-600">.</span>DOCS</h1>
          <p className="text-xs text-slate-500 font-mono">Technical Architecture v2.0</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeTab === section.id 
                  ? "bg-white text-black shadow-lg scale-[1.02]" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {section.icon}
              <span className="uppercase tracking-wide">{section.title}</span>
              {activeTab === section.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto">
          <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono border border-emerald-500/30 bg-emerald-900/10 p-2 rounded">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            SYSTEM STATUS: OPTIMAL
          </div>
        </div>
      </aside>

      {/* === MAIN CONTENT AREA === */}
      <main className="flex-1 p-6 md:p-16 md:overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {sections.map((section) => (
              activeTab === section.id && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">{section.title.split(". ")[1]}</h2>
                    <p className="text-red-500 font-mono text-xs uppercase tracking-widest">Technical Deep Dive</p>
                  </div>
                  
                  <div className="prose prose-invert prose-lg max-w-none">
                    {section.content}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
