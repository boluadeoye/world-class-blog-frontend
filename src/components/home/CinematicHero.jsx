"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVars = {
  hidden: { y: 50, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export default function CinematicHero() {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-900/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-amber-900/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl w-full mx-auto"
      >
        <motion.div variants={itemVars} className="flex items-center gap-3 mb-8">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="font-sans text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Live Broadcast • Lagos, NG
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1 variants={itemVars} className="font-serif text-6xl md:text-9xl font-medium leading-[0.9] tracking-tight text-zinc-100 mb-4">
            BOLU<br />ADEOYE
          </motion.h1>
        </div>

        <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
          <p className="font-sans text-lg md:text-xl text-zinc-400 max-w-md leading-relaxed">
            Full-Stack Engineer & Creative Technologist. <br/>
            Building digital ecosystems with <span className="text-zinc-200">precision</span> and <span className="text-zinc-200">soul</span>.
          </p>
          <div className="h-px w-24 bg-zinc-800 md:mb-2"></div>
        </motion.div>

        <motion.div variants={itemVars} className="flex flex-wrap gap-4">
          <Link href="/about" className="group relative px-8 py-4 bg-zinc-100 text-zinc-950 rounded-full font-sans font-semibold tracking-wide overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Initiate Contact <ArrowRight size={18} />
            </span>
            <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </Link>
          
          <Link href="/articles" className="px-8 py-4 border border-zinc-800 text-zinc-300 rounded-full font-sans hover:bg-zinc-900 transition-colors flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" />
            Read Transmission
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
