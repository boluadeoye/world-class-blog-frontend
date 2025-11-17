import ArticlesClient from "../../components/public/ArticlesClient";

export const metadata = {
  title: "Articles | Adeoye Boluwatife",
};

export default function ArticlesPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-6 space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Articles</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          All essays by Adeoye Boluwatife
        </h1>
        <p className="max-w-2xl text-sm text-slate-300/90">
          Explore everything I write on health, finance, technology and education.
          Use the topic filters and search to find what matters most to you.
        </p>
      </header>

      <ArticlesClient />
    </div>
  );
}