import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutShell from "../components/LayoutShell";

// 1. Technical Sans (UI, Body)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 2. Editorial Serif (Headlines)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "Bolu Adeoye | Full-Stack Engineer",
  description: "Building world-class digital experiences with precision and soul.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950 selection:bg-amber-500/30">
        {/* Global Grain Texture for "Film" Look */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
        
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
