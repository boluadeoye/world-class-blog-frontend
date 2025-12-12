import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchLatestArticles, fetchFeaturedPosts, fetchVideoPosts, fetchFeaturedVideo } from "../lib/homeData";
import ModernHero from "../components/home/ModernHero";
import ScrollReveal from "../components/ui/ScrollReveal";
import NewsUpdates from "../components/home/NewsUpdates";
import Newsletter from "../components/home/Newsletter";
import ServiceDeck from "../components/home/ServiceDeck";

export const revalidate = 3600;

export default async function Page() {
  return (
    // Z-INDEX 9999 COVERS THE GLOBAL HEADER
    <main className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950 text-slate-200 selection:bg-amber-500/30">
      
      <ModernHero />
      
      {/* SERVICES IMMEDIATELY AFTER HERO */}
      <ServiceDeck />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
      </div>

      {/* REST OF PAGE */}
      <NewsUpdates />
      <Newsletter />
    </main>
  );
}
