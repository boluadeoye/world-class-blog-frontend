"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Portrait() {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-white p-4">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative w-full h-full rounded-[1.5rem] overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776665149/blog_assets/fw98pjm6elffhbuj3byc.jpg"
          alt="Adeoye Boluwatife"
          fill
          className="object-cover grayscale-[20%] contrast-[1.05]"
          priority
          unoptimized
        />
      </motion.div>
    </div>
  );
}
