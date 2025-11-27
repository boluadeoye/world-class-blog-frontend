// src/components/home/StartHereNewsletter.jsx — form-only studio panel
import NewsletterCTA from "../public/NewsletterCTA";

export default function StartHereNewsletter() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-6xl studio-banner rounded-3xl border border-white/10 p-5 sm:p-6">
        <div className="studio-noise pointer-events-none absolute inset-0 rounded-3xl" />
        <div className="mx-auto max-w-2xl">
          <NewsletterCTA />
        </div>
      </div>
    </section>
  );
}
