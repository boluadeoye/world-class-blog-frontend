import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import SmoothScroller from "../components/ui/SmoothScroller";

// 1. Editorial Serif (Headlines)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// 2. Technical Sans (Body/UI)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Bolu Adeoye | Digital Broadcast",
  description: "Full-Stack Engineer & Creative Technologist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {/* Cinematic Noise Overlay (Fixed) */}
        <div className="bg-noise"></div>
        
        {/* Physics Scroll Wrapper */}
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
