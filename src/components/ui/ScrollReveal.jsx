"use client";
import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, width = "100%" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        type: "spring", 
        bounce: 0.2 
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
