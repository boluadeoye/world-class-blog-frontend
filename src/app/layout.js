import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const mono = GeistMono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata = {
  title: 'Boluwatife Adeoye | Systems Architect',
  description: 'Sovereign Infrastructure. Sub-200ms Latency.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.variable} min-h-screen flex flex-col`}>
        <div className="noise" />
        
        <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Operational</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-neutral-600">Groq Inference</span>
            <span className="text-xs font-bold text-emerald-500">178ms</span>
          </div>
        </nav>

        <main className="relative z-10 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
