"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Portrait() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <motion.div 
        whileHover={{ scale: 1.05, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative w-full aspect-square max-w-[280px] morph-shape overflow-hidden border-2 border-burgundy/10 shadow-2xl"
      >
        <Image
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg"
          alt="Adeoye Boluwatife"
          fill
          className="object-cover saturate-[1.4] contrast-[1.1] brightness-[1.05]"
          priority
        />
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="text-[9px] font-sans font-bold uppercase tracking-[0.5em] text-burgundy bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-burgundy/5 shadow-sm">
          The Architect
        </span>
      </div>
    </div>
  );
}
