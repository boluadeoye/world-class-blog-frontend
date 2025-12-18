"use client";
import { useState } from "react";
import { Link as LinkIcon, ArrowRight, QrCode, Copy, Check, Zap } from "lucide-react";
import Link from "next/link";

export default function QuantumLinks() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);

    // Simulate API Call (We will build the real API next)
    setTimeout(() => {
      const shortCode = alias || Math.random().toString(36).substring(7);
      setResult(`https://boluadeoye.com.ng/go/${shortCode}`);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* HIDE HEADER */}
      <style jsx global>{`header { display: none !important; }`}</style>

      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            <Zap size={12} /> Internal Tool
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Quantum Links
          </h1>
          <p className="text-slate-400 text-lg">
            Transform long, ugly URLs into branded, trackable assets.
          </p>
        </div>

        {/* THE FORGE */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
          <form onSubmit={handleShorten} className="space-y-6">
            
            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Destination URL</label>
              <div className="relative flex items-center bg-slate-950 rounded-xl border border-white/10 focus-within:border-indigo-500 transition-colors">
                <div className="pl-4 text-slate-500"><LinkIcon size={18} /></div>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  className="w-full bg-transparent text-white px-4 py-4 outline-none text-sm font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Alias Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Custom Alias (Optional)</label>
              <div className="relative flex items-center bg-slate-950 rounded-xl border border-white/10 focus-within:border-indigo-500 transition-colors">
                <div className="pl-4 text-slate-500 text-sm font-mono">bolu.ng/go/</div>
                <input 
                  type="text" 
                  placeholder="my-link" 
                  className="w-full bg-transparent text-white px-2 py-4 outline-none text-sm font-medium"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              {loading ? "Forging..." : "Shorten Link"} <ArrowRight size={16} />
            </button>

          </form>

          {/* RESULT CARD */}
          {result && (
            <div className="mt-8 p-6 rounded-xl bg-indigo-900/20 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center md:text-left overflow-hidden w-full">
                <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold mb-1">Ready to deploy</p>
                <p className="text-white font-mono text-lg truncate">{result}</p>
              </div>
              <div className="flex gap-3">
                <button className="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors" title="QR Code">
                  <QrCode size={20} />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}

        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            ← Return to Base
          </Link>
        </div>

      </div>
    </main>
  );
}
