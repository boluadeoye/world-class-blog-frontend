"use client";
import { motion } from "framer-motion";
import { Bot, Code, Database, PenTool, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "AI Agents & Chatbots",
    desc: "Intelligent WhatsApp Bots & Custom Agents handling sales & support 24/7.",
    icon: Bot,
    accent: "text-emerald-400",
    gradient: "from-emerald-500/20 to-cyan-500/5",
  },
  {
    id: "02",
    title: "Web Engineering",
    desc: "High-performance, SEO-optimized corporate platforms built on Next.js 14.",
    icon: Code,
    accent: "text-indigo-400",
    gradient: "from-indigo-500/20 to-purple-500/5",
  },
  {
    id: "03",
    title: "SaaS Architecture",
    desc: "Scalable backend systems using Supabase. Secure auth & real-time databases.",
    icon: Database,
    accent: "text-amber-400",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
  {
    id: "04",
    title: "Technical Writing",
    desc: "Compelling documentation bridging complex code and human understanding.",
    icon: PenTool,
    accent: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/5",
  }
];

export default function ServiceDeck() {
  return (
    <section className="py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 flex justify-between items-end">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            Services & <span className="italic text-slate-500">Solutions</span>
          </h2>
        </div>
        <div className="hidden md:flex text-xs font-mono text-slate-500 gap-2">
          <span>SCROLL</span> <ArrowRight size={14} />
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 md:px-12 pb-8 scrollbar-none">
        {services.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="snap-center shrink-0 w-[85vw] md:w-[350px] h-[220px] relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-slate-950/50 border border-white/10 ${s.accent}`}>
                  <s.icon size={24} />
                </div>
                <span className="font-mono text-3xl font-bold text-white/5 group-hover:text-white/10 transition-colors">{s.id}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="w-6 shrink-0" />
      </div>
    </section>
  );
}
