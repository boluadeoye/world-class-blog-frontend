"use client";
import { useState } from "react";
import { Link as LinkIcon, ArrowRight, Copy, Check, Settings, Zap, QrCode } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function QuantumLinks() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alias: showCustom ? alias : null }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResult(data.shortUrl);
      } else {
        setError(data.error || "Failed to shorten link");
      }
    } catch (err) {
      setError("System Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* HIDE GLOBAL HEADER */}
      <style jsx global>{`header { display: none !important; }`}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
            ← Back to Portfolio
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Shorten. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Customize.</span> Share.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A powerful link management engine. Transform long URLs into branded, trackable assets instantly.
          </p>
        </div>

        {/* THE INPUT ENGINE */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl shadow-indigo-900/20">
          <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-2">
            
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <LinkIcon size={20} />
              </div>
              <input 
                type="url" 
                placeholder="Paste a long URL here..." 
                className="w-full h-16 bg-slate-950/50 rounded-[1.5rem] pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="h-16 px-8 rounded-[1.5rem] bg-white text-slate-950 font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            >
              {loading ? (
                <span className="animate-pulse">Forging...</span>
              ) : (
                <>Shorten <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          {/* CUSTOMIZATION TOGGLE */}
          <div className="px-4 py-3">
            <button 
              type="button"
              onClick={() => setShowCustom(!showCustom)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors"
            >
              <Settings size={14} /> {showCustom ? "Hide Options" : "Customize Link"}
            </button>

            <AnimatePresence>
              {showCustom && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex items-center gap-4">
                    <div className="flex-1 flex items-center bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 font-mono text-sm">
                      <span>boluadeoye.com.ng/go/</span>
                      <input 
                        type="text" 
                        placeholder="alias" 
                        className="bg-transparent text-white focus:outline-none ml-1 w-full placeholder-slate-600"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm font-bold">
            {error}
          </motion.div>
        )}

        {/* RESULT CARD */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-8 p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex-1 min-w-0 text-center md:text-left">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Your Short Link</p>
                <a href={result} target="_blank" className="text-2xl md:text-3xl font-serif text-white hover:underline truncate block">
                  {result.replace('https://', '')}
                </a>
              </div>
              
              <div className="flex gap-3">
                <button className="p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-white/5" title="QR Code">
                  <QrCode size={24} />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/20"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
