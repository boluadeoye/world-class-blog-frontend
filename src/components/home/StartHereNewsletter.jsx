// src/components/home/StartHereNewsletter.jsx
import { Playfair_Display } from "next/font/google";
import NewsletterCTA from "../public/NewsletterCTA";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700","800","900"],
});

export default function StartHereNewsletter() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl studio-banner rounded-3xl border border-white/10 p-6 sm:p-8">
        <div className="studio-noise pointer-events-none absolute inset-0 rounded-3xl" />
        <div className={`${playfair.className} text-white text-2xl sm:text-3xl font-extrabold tracking-tight`}>
          Join the brief
        </div>
        <p className="mt-2 max-w-2xl text-slate-300">
          Fast, practical notes on building products, clean engineering, and writing in public —
          delivered occasionally.
        </p>

        {/* Your existing form (keeps its own button/validation) */}
        <div className="mt-5">
          <NewsletterCTA />
        </div>
      </div>
    </section>
  );
}
