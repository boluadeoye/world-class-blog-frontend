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
  metadataBase: new URL('https://boluadeoye.com.ng'),
  title: {
    default: "Bolu Adeoye | World-Class Software Engineer",
    template: "%s | Bolu Adeoye"
  },
  description: "Full-Stack Engineer specializing in high-performance web systems, AI integration, and scalable architecture.",
  keywords: ["Software Engineer", "Nigeria", "Next.js Developer", "AI Integration", "Web Development"],
  authors: [{ name: "Boluwatife Adeoye" }],
  creator: "Boluwatife Adeoye",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boluadeoye.com.ng",
    siteName: "Bolu Adeoye",
    images: [
      {
        url: "https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg", // Your portrait as default OG
        width: 1200,
        height: 630,
        alt: "Bolu Adeoye - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bolu Adeoye | Software Engineer",
    description: "Building world-class digital ecosystems.",
    images: ["https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased text-slate-100 bg-slate-950">
        <Schema />
        <LayoutShell>{children}</LayoutShell>
        <NotificationPrompt />
      </body>
    </html>
  );
}
