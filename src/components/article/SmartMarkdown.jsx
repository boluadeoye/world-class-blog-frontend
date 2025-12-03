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
    <div className="my-12 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
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
        <div className="my-16 relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group ring-1 ring-white/10">
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
        className="text-amber-400 hover:text-amber-200 font-bold underline decoration-amber-500/40 underline-offset-4 transition-colors"
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
            <div className="my-16 relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black ring-1 ring-white/10">
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
    // JUSTIFIED TEXT, BRIGHTER COLOR
    return <p className="mb-8 text-xl leading-loose text-slate-200 text-justify font-light tracking-wide">{children}</p>;
  },

  h1: ({ node, ...props }) => <h1 {...props} className="text-5xl font-serif font-medium text-white mt-20 mb-10 text-center tracking-tight" />,
  h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-serif font-medium text-white mt-16 mb-8 border-b border-white/10 pb-4" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-2xl font-serif font-medium text-amber-100 mt-12 mb-6" />,
  
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-4 border-amber-500 pl-8 py-6 my-12 italic text-2xl text-slate-300 bg-slate-900/40 rounded-r-2xl shadow-inner" />
  ),
  
  ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-6 mb-8 space-y-3 text-lg text-slate-300" />,
  ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-6 mb-8 space-y-3 text-lg text-slate-300" />,
  li: ({ node, ...props }) => <li {...props} className="pl-2" />,
};

export default function SmartMarkdown({ content }) {
  return (
    <div className="prose prose-xl prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={renderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
