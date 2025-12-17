import "./globals.css";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import LayoutShell from "../components/LayoutShell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  // CRITICAL: This enables social media images to work
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: {
    default: "Boluwatife Adeoye | Senior Full-Stack Engineer",
    template: "%s | Bolu Adeoye"
  },
  description: "High-performance digital ecosystems, AI architecture, and engineering strategy.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boluadeoye.com.ng',
    siteName: 'Boluwatife Adeoye',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Tech_babby',
  },
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
