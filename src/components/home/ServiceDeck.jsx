"use client";
import { motion } from "framer-motion";
import { Code, Bot, Database, PenTool, ArrowUpRight, Terminal } from "lucide-react";

const services = [
  {
    id: "01",
    title: "AI Agents & Chatbots",
    description: "Intelligent WhatsApp Bots & Custom Agents. I build systems that handle sales, support, and transactions 24/7 using Llama 3 & Groq.",
    icon: Bot,
    color: "from-emerald-400 to-cyan-500",
    bg: "group-hover:bg-emerald-500/5",
    border: "group-hover:border-emerald-500/50"
  },
  {
    id: "02",
    title: "Premium Web Engineering",
    description: "High-performance, SEO-optimized corporate platforms built on Next.js 14. Pixel-perfect implementations of complex designs.",
    icon: Code,
    color: "from-indigo-400 to-purple-500",
    bg: "group-hover:bg-indigo-500/5",
    border: "group-hover:border-indigo-500/50"
  },
  {
    id: "03",
    title: "SaaS Architecture",
    description: "Scalable backend systems using Supabase and PostgreSQL. Secure authentication, real-time databases, and edge functions.",
    icon: Database,
    color: "from-amber-400 to-orange-500",
    bg: "group-hover:bg-amber-500/5",
    border: "group-hover:border-amber-500/50"
  },
  {
    id: "04",
    title: "Technical Writing",
    description: "Clear, compelling technical documentation and articles that bridge the gap between complex code and human understanding.",
    icon: PenTool,
    color: "from-pink-400 to-rose-500",
    bg: "group-hover:bg-pink-500/5",
    border: "group-hover:border-pink-500/50"
  }
];

export default function ServiceDeck() {
  return (
    <section className="py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
              <Terminal size={18} className="text-indigo-400" />
            </div>
            <span className="text-indigo-400 font-mono text-xs md:text-sm tracking-widest uppercase font-bold">Engineering Excellence</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white"
          >
            Services & <span className="italic text-slate-500">Solutions</span>
          </motion.h2>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`group relative p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.border}`}
          >
            {/* Hover Glow Background */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 ${service.bg}`} />

            {/* Shiny Gradient Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              {/* Icon & ID */}
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-slate-950 border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon size={32} className={`bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} />
                </div>
                <span className="font-mono text-slate-700 text-xl font-bold group-hover:text-slate-500 transition-colors">{service.id}</span>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-600 group-hover:text-white transition-colors">
                <span>Initiate Protocol</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
