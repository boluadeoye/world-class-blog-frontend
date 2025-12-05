"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, Copy, Check, Loader2, RefreshCw, ArrowLeft, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MediaTool() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  // 1. Fetch Images
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

  useEffect(() => { fetchImages(); }, []);

  // 2. Handle Upload
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Get Signature
      const sigRes = await fetch("/api/media", { method: "POST" });
      const { signature, timestamp } = await sigRes.json();

      // Upload to Cloudinary
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
      alert("Upload failed. Check API Keys.");
    } finally {
      setUploading(false);
    }
  };

  // 3. Copy Logic
  const copyToClipboard = (url, id) => {
    const markdown = `![Image](${url})`;
    navigator.clipboard.writeText(markdown);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* === APP HEADER === */}
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
        
        <button 
          onClick={fetchImages}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
          title="Refresh Library"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* === UPLOAD HERO === */}
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
            
            {/* Background Grid Animation */}
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

        {/* === ASSET GRID === */}
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
                    
                    {/* Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-mono text-indigo-300 uppercase">{img.format}</p>
                          <p className="text-[10px] font-mono text-slate-400">
                            {Math.round(img.bytes / 1024)} KB
                          </p>
                        </div>
                        <div className="p-2 rounded-full bg-white text-black shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {copiedId === img.public_id ? <Check size={14} /> : <Copy size={14} />}
                        </div>
                      </div>
                    </div>

                    {/* Copied Toast */}
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
