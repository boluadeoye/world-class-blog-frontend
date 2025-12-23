"use client";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CBTLayout({ children }) {
  return (
    <div className={`cbt-isolation ${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
      
      {/* === THE ISOLATION CHAMBER === */}
      <style jsx global>{`
        /* 1. Nuclear Option: Hide Global Header/Footer/Nav */
        body:has(.cbt-isolation) header,
        body:has(.cbt-isolation) footer,
        body:has(.cbt-isolation) nav,
        body:has(.cbt-isolation) .fixed.z-\[9999\] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        /* 2. Force Light Mode Background */
        body:has(.cbt-isolation) {
          background-color: #f9fafb !important; /* Gray-50 */
          color: #111827 !important; /* Gray-900 */
          overflow: auto !important; /* Restore scrolling if locked */
        }

        /* 3. Reset Selection Color */
        body:has(.cbt-isolation) ::selection {
          background-color: #15803d; /* Green-700 */
          color: white;
        }
      `}</style>

      {children}
    </div>
  );
}
