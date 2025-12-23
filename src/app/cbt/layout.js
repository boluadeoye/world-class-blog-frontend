"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CBTLayout({ children }) {
  
  // === BRUTE FORCE HEADER REMOVAL ===
  useEffect(() => {
    // 1. Find all potential global headers
    const headers = document.querySelectorAll('body > header, nav, .navbar, [role="banner"]');
    
    // 2. Hide them
    headers.forEach(el => {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
    });

    // 3. Restore on unmount (when leaving CBT)
    return () => {
      headers.forEach(el => {
        el.style.removeProperty('display');
        el.style.removeProperty('visibility');
      });
    };
  }, []);

  return (
    <div className={`cbt-isolation ${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
      
      {/* CSS Backup just in case JS is slow */}
      <style jsx global>{`
        body:has(.cbt-isolation) > header,
        body:has(.cbt-isolation) > nav {
          display: none !important;
        }
        body:has(.cbt-isolation) {
          background-color: #f9fafb !important;
          color: #111827 !important;
        }
      `}</style>

      {children}
    </div>
  );
}
