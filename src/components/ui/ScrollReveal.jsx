"use client";
import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, width = "100%", className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }} // Triggers slightly earlier
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20, 
        mass: 1,
        delay: delay 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
