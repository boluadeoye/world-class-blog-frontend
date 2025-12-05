"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, Copy, Check, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MediaPage() {
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
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY); // Need this env
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("folder", "blog_assets");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      
      // Refresh list
      setImages(prev => [data, ...prev]);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 3. Copy to Clipboard
  const copyToClipboard = (url, id) => {
    const markdown = `![Image](${url})`;
    navigator.clipboard.writeText(markdown);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 font-sans">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">Media Command</h1>
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Asset Management System</p>
        </div>
        <button 
          onClick={fetchImages}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === UPLOAD ZONE (Left Column) === */}
        <div className="lg:col-span-1">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group h-[300px] rounded-3xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/50 hover:bg-indigo-900/10 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleUpload} 
            />
            
            {/* Animated Pulse */}
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            
            {uploading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 size={48} className="text-indigo-500 animate-spin" />
                <span className="font-mono text-xs text-indigo-300 uppercase tracking-widest">Uploading Data...</span>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-full bg-slate-800 group-hover:bg-indigo-600 transition-colors mb-6 shadow-xl">
                  <Upload size={32} className="text-slate-400 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Upload Asset</h3>
                <p className="text-sm text-slate-500 text-center px-8">
                  Tap to select from gallery. <br/> Auto-optimization enabled.
                </p>
              </>
            )}
          </div>
        </div>

        {/* === GALLERY GRID (Right Column) === */}
        <div className="lg:col-span-2">
          {loading && images.length === 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => <div key={i} className="h-40 bg-slate-900 rounded-2xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div
                    key={img.public_id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    layout
                    className="group relative aspect-square rounded-2xl bg-slate-900 border border-white/5 overflow-hidden cursor-pointer"
                    onClick={() => copyToClipboard(img.secure_url, img.public_id)}
                  >
                    <img 
                      src={img.secure_url} 
                      alt="Asset" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-mono text-slate-400 uppercase">{img.format}</p>
                          <p className="text-[10px] font-mono text-slate-500">
                            {Math.round(img.bytes / 1024)} KB
                          </p>
                        </div>
                        <div className="p-2 rounded-full bg-white text-black shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          {copiedId === img.public_id ? <Check size={14} /> : <Copy size={14} />}
                        </div>
                      </div>
                    </div>

                    {/* Copied Toast */}
                    {copiedId === img.public_id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <span className="text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded-full">
                          Copied!
                        </span>
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
