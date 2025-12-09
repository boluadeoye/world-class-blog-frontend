"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

const getYoutubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const renderers = {
  img: ({ node, ...props }) => (
    <div className="my-12 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
      <img {...props} className="w-full h-auto object-cover" loading="lazy" alt={props.alt || "Article Image"} />
    </div>
  ),

  a: ({ node, href, children, ...props }) => {
    const youtubeId = getYoutubeId(href);
    if (youtubeId) {
      return (
        <div className="my-16 relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title="YouTube video player" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
        </div>
      );
    }
    return <Link href={href} {...props} className="text-amber-400 hover:text-amber-300 border-b border-amber-500/30 hover:border-amber-400 transition-all no-underline">{children}</Link>;
  },

  p: ({ node, children }) => {
    if (children && children[0] && typeof children[0] === 'string') {
       const text = children[0];
       const youtubeId = getYoutubeId(text);
       if (youtubeId && text.trim().match(/^https?:\/\//)) {
         return (
            <div className="my-16 relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} title="YouTube video player" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
            </div>
         );
       }
    }
    return <p className="mb-8 text-[1.15rem] leading-[1.8] text-slate-300 font-light">{children}</p>;
  },

  // H2 with ID for TOC
  h2: ({ node, children, ...props }) => {
    const text = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return <h2 id={text} {...props} className="text-3xl font-serif font-medium text-white mt-16 mb-6 scroll-mt-32">{children}</h2>;
  },

  h3: ({ node, ...props }) => <h3 {...props} className="text-xl font-serif font-medium text-amber-100 mt-10 mb-4" />,
  
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-2 border-amber-500 pl-6 py-4 my-10 italic text-xl text-slate-400 bg-white/5 rounded-r-lg" />
  ),
  
  ul: ({ node, ...props }) => <ul {...props} className="mb-10 space-y-3 list-disc pl-5 text-slate-300" />,
  ol: ({ node, ...props }) => <ol {...props} className="mb-10 space-y-3 list-decimal pl-5 text-slate-300" />,
  li: ({ node, ...props }) => <li {...props} className="pl-1 text-lg" />,
  strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
};

export default function SmartMarkdown({ content }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>{content}</ReactMarkdown>
    </div>
  );
}
