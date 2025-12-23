"use client";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CBTLayout({ children }) {
  return (
    <div className={`cbt-isolation ${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
      
      {/* === THE ISOLATION CHAMBER === */}
      <style jsx global>{`
        /* 1. Hide Global Portfolio Header/Footer */
        body:has(.cbt-isolation) > header,
        body:has(.cbt-isolation) > footer,
        body:has(.cbt-isolation) > nav {
          display: none !important;
        }

        /* 2. FORCE CBT HEADER TO SHOW */
        /* This targets the header inside the CBT exam page specifically */
        .cbt-isolation header {
          display: flex !important;
          visibility: visible !important;
        }

        /* 3. Force Light Mode Background */
        body:has(.cbt-isolation) {
          background-color: #f9fafb !important;
          color: #111827 !important;
          overflow: auto !important;
        }
      `}</style>

      {children}
    </div>
  );
}
