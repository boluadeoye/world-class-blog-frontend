"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function ProjectCard({ title, tag, link, image, className, isHero }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`group relative rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col ${className}`}
    >
      {/* Full Bleed Background Image */}
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
      />
      
      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
        <div className="flex justify-end">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>
        
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white/70">
              {tag}
            </span>
          </div>
          <h3 className={`${isHero ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} font-serif text-white leading-tight tracking-tighter`}>
            {title}
          </h3>
        </div>
      </div>
    </motion.a>
  );
}
