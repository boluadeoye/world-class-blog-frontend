import "./globals.css";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import LayoutShell from "../components/LayoutShell";

// 1. The "Sharp" Tech Font (Body)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 2. The "Luxury" Editorial Font (Headings)
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"], // Load multiple weights for richness
  display: "swap",
});

export const metadata = {
  title: "World‑Class Blog",
  description: "Essays by Adeoye Boluwatife — health, finance, technology, education, and the systems that connect them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
