"use client";
import { motion } from "framer-motion";
import { Smartphone, Globe, Server, Bot, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "mobile",
    title: "Mobile Engineering",
    desc: "Native-grade performance for iOS and Android using React Native and Expo. Fluid animations and offline-first architecture.",
    icon: <Smartphone size={40} />,
    color: "from-blue-500 to-cyan-400",
    bg: "group-hover:shadow-blue-500/20"
  },
  {
    id: "web",
    title: "Web Platforms",
    desc: "High-performance Next.js applications. SEO-optimized, server-rendered, and designed for global scale.",
    icon: <Globe size={40} />,
    color: "from-indigo-500 to-purple-500",
    bg: "group-hover:shadow-indigo-500/20"
  },
  {
    id: "api",
    title: "API Systems",
    desc: "Robust backend infrastructure. REST & GraphQL APIs designed for security, speed, and third-party integration.",
    icon: <Server size={40} />,
    color: "from-slate-400 to-white",
    bg: "group-hover:shadow-white/10"
  },
  {
    id: "ai",
    title: "AI Integration",
    desc: "Embedding intelligence into apps. Chatbots, RAG systems, and autonomous agents powered by LLMs.",
    icon: <Bot size={40} />,
    color: "from-amber-400 to-orange-500",
    bg: "group-hover:shadow-amber-500/20"
  },
  {
    id: "data",
    title: "Data Architecture",
    desc: "Scalable database design using Postgres and Vector stores. Optimized for complex queries and real-time data.",
    icon: <Database size={40} />,
    color: "from-emerald-400 to-teal-500",
    bg: "group-hover:shadow-emerald-500/20"
  }
];

export default function ServiceRail() {
  return (
    <section className="py-20 bg-[#020617] relative overflow-hidden border-b border-white/5">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">Core Expertise</h2>
          <p className="font-sans text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">
            Engineering • Intelligence • Scale
          </p>
        </div>
        
        {/* Scroll Hint */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-600 uppercase tracking-widest">
          <span>Scroll to Explore</span>
          <ArrowRight size={14} />
        </div>
      </div>

      {/* Horizontal Rail */}
      <div className="flex gap-6 overflow-x-auto pb-16 px-6 md:px-12 snap-x scroll-pl-6 md:scroll-pl-12 scrollbar-hide">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative min-w-[280px] md:min-w-[320px] h-[420px] snap-start rounded-[2.5rem] bg-slate-900/50 border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.bg}`}
          >
            {/* Internal Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 h-full p-8 flex flex-col">
              
              {/* Icon Illustration */}
              <div className="mb-auto">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-3xl text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {service.title}
                </h3>
                <p className="font-sans text-slate-400 text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-4 group-hover:border-white/30 transition-colors">
                  {service.desc}
                </p>
                
                <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  <span>View Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
