import ReadTimer from '@/components/post/ReadTimer';

export default function PostLayout({ children }) {
  return (
    <main className="article-studio min-h-dvh text-slate-100">
      {/* ambient studio */}
      <div className="article-aurora a" aria-hidden />
      <div className="article-aurora b" aria-hidden />
      <div className="article-vignette" aria-hidden />
      <div className="article-grain" aria-hidden />

      <div className="article-shell max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ReadTimer containerSelector="#article-body" />
        <div id="article-body" className="article-card">
          {children}
        </div>
      </div>
    </main>
  );
}
