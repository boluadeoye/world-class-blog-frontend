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
    <div className="my-10 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <img 
        {...props} 
        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" 
        loading="lazy" 
        alt={props.alt || "Article Image"}
      />
    </div>
  ),

  a: ({ node, href, children, ...props }) => {
    const youtubeId = getYoutubeId(href);
    if (youtubeId) {
      return (
        <div className="my-12 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group ring-1 ring-white/10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title="YouTube video player"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return (
      <Link 
        href={href} 
        {...props} 
        className="text-amber-400 hover:text-amber-200 font-medium underline decoration-amber-500/40 underline-offset-4 transition-colors"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </Link>
    );
  },

  p: ({ node, children }) => {
    if (children && children[0] && typeof children[0] === 'string') {
       const text = children[0];
       const youtubeId = getYoutubeId(text);
       if (youtubeId && text.trim().match(/^https?:\/\//)) {
         return (
            <div className="my-12 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
         );
       }
    }
    // LEFT ALIGNED, MODERN SPACING
    return <p className="mb-6 text-lg md:text-[1.15rem] leading-[1.8] text-slate-300 text-left font-normal tracking-normal">{children}</p>;
  },

  h1: ({ node, ...props }) => <h1 {...props} className="text-4xl font-serif font-medium text-white mt-16 mb-8 tracking-tight" />,
  h2: ({ node, ...props }) => <h2 {...props} className="text-2xl md:text-3xl font-serif font-medium text-white mt-12 mb-6 tracking-tight" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-xl md:text-2xl font-serif font-medium text-amber-100 mt-10 mb-4" />,
  
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-2 border-amber-500 pl-6 py-4 my-8 italic text-xl text-slate-400 bg-white/5 rounded-r-xl" />
  ),
  
  ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-6 space-y-2 text-lg text-slate-300" />,
  ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-6 space-y-2 text-lg text-slate-300" />,
  li: ({ node, ...props }) => <li {...props} className="pl-1" />,
  
  // Highlight Bold Text
  strong: ({ node, ...props }) => <strong {...props} className="font-semibold text-white" />,
};

export default function SmartMarkdown({ content }) {
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={renderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
