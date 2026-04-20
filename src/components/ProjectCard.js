"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ title, tag, link, image, className, isHero }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover="hover"
      className={`group relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(139,38,50,0.15)] transition-shadow duration-700 flex flex-col ${className}`}
    >
      {/* Guaranteed Image Render */}
      <div className="absolute inset-0 w-full h-full bg-[#E2E8F0]">
        <motion.img 
          variants={{ hover: { scale: 1.1 } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Heavy Glassmorphic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <motion.div 
            variants={{ hover: { scale: 1.1, backgroundColor: "#8B2632", color: "#ffffff", rotate: 45 } }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl"
          >
            <ArrowUpRight size={24} strokeWidth={1.5} />
          </motion.div>
        </div>
        
        <motion.div 
          variants={{ hover: { y: -10 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-coral animate-pulse shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-white/80">
              {tag}
            </span>
          </div>
          <h3 className={`${isHero ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-serif text-white leading-[1.1] tracking-tighter`}>
            {title}
          </h3>
        </motion.div>
      </div>
    </motion.a>
  );
}
