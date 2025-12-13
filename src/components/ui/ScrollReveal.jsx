"use client";
import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0, width = "100%", className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-15% 0px" }} // Triggers when element is well inside view
      transition={{ 
        type: "spring", 
        stiffness: 200, // High tension for a "snap" effect
        damping: 25,    // Controlled friction to stop the bounce cleanly
        mass: 1.2,      // Adds "weight" to the movement
        delay: delay 
      }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
