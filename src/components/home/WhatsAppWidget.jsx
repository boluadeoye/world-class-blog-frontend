"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  // Your number: 08106293674 -> 2348106293674
  const whatsappUrl = "https://wa.me/2348106293674?text=Hello%20Bolu%2C%20I%27m%20interested%20in%20your%20services.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-[10000]"
    >
      <Link 
        href={whatsappUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping"></span>
        
        {/* Icon */}
        <MessageCircle size={28} fill="currentColor" className="relative z-10" />
      </Link>
    </motion.div>
  );
}
