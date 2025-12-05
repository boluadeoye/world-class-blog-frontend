"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Copy, Check, Loader2, RefreshCw, ArrowLeft, Cloud, Lock, Key, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ACCESS_KEY = "access!granted#";

export default function MediaTool() {
  // Auth State
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [authError, setAuthError] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // App State
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  // 1. Check Auth on Mount
  useEffect(() => {
    const savedKey = localStorage.getItem("media_access_key");
    if (savedKey === ACCESS_KEY) {
      setIsAuthorized(true);
      fetchImages();
    }
    setCheckingAuth(false);
  }, []);

  // 2. Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputKey === ACCESS_KEY) {
      localStorage.setItem("media_access_key", inputKey);
      setIsAuthorized(true);
      setAuthError(false);
      fetchImages();
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000); // Reset shake
    }
  };

  // 3. Fetch Images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Upload
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const sigRes = await fetch("/api/media", { method: "POST" });
      const { signature, timestamp } = await sigRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", "blog_assets");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      setImages(prev => [data, ...prev]);
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url, id) => {
    const markdown = `![Image](${url})`;
    navigator.clipboard.writeText(markdown);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // === RENDER: LOCK SCREEN ===
  if (!isAuthorized) {
    if (checkingAuth) return null; // Prevent flash
    return (
      <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-sans">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Lock size={32} className="text-indigo-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-serif text-white text-center mb-2">Security Clearance</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Enter your personal access key to enter the Media Command Center.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 transition duration-500 blur ${authError ? 'from-red-500 to-orange-500 opacity-50' : ''}`}></div>
              <div className="relative flex items-center bg-slate-950 rounded-xl border border-white/10">
                <Key size={18} className="ml-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="Access Key" 
                  className="w-full bg-transparent text-white placeholder-slate-600 px-4 py-3.5 outline-none text-sm font-mono"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} /> Authenticate
            </button>
          </form>

          {authError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wide"
            >
              <AlertCircle size={14} /> Access Denied
            </motion.div>
          )}
        </motion.div>
      </main>
    );
  }

  // === RENDER: APP INTERFACE ===
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Cloud size={16} className="text-indigo-400" />
            </div>
            <span className="font-serif text-lg text-white tracking-tight">Media Cloud</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              localStorage.removeItem("media_access_key");
              setIsAuthorized(false);
            }}
            className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 text-slate-400 transition-colors"
            title="Lock System"
          >
            <Lock size={18} />
          </button>
          <button 
            onClick={fetchImages}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Refresh Library"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* Upload Hero */}
        <div className="mb-12">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group w-full h-[240px] rounded-[2rem] border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/20 hover:bg-indigo-500/5 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload} 
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {uploading ? (
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                  <Loader2 size={48} className="text-indigo-500 animate-spin relative z-10" />
                </div>
                <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">Encrypting & Uploading...</span>
              </div>
            ) : (
              <div className="text-center relative z-10">
                <div className="inline-flex p-4 rounded-2xl bg-slate-800 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300 mb-4 shadow-xl">
                  <Upload size={28} className="text-slate-400 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Upload New Asset</h3>
                <p className="text-sm text-slate-500">Tap to browse gallery</p>
              </div>
            )}
          </div>
        </div>

        {/* Asset Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Uploads</h2>
            <span className="text-xs font-mono text-slate-600">{images.length} ASSETS</span>
          </div>

          {loading && images.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-slate-900 rounded-2xl animate-pulse border border-white/5" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    key={img.public_id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    layout
                    className="group relative aspect-square rounded-2xl bg-slate-900 border border-white/5 overflow-hidden cursor-pointer shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all"
                    onClick={() => copyToClipboard(img.secure_url, img.public_id)}
                  >
                    <img 
                      src={img.secure_url} 
                      alt="Asset" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-mono text-indigo-300 uppercase">{img.format}</p>
                          <p className="text-[10px] font-mono text-slate-400">{Math.round(img.bytes / 1024)} KB</p>
                        </div>
                        <div className="p-2 rounded-full bg-white text-black shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {copiedId === img.public_id ? <Check size={14} /> : <Copy size={14} />}
                        </div>
                      </div>
                    </div>
                    {copiedId === img.public_id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-full shadow-xl flex items-center gap-2"
                        >
                          <Check size={12} /> Copied
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
