import "./globals.css";
import { Inter, Sora } from "next/font/google";
import LayoutShell from "../components/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "World‑Class Blog",
  description: "Essays by Adeoye Boluwatife — health, finance, technology, education, and the systems that connect them.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
