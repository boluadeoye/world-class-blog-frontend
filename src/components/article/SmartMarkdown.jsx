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
  // 1. Cinematic Images
  img: ({ node, ...props }) => (
    <div className="my-14 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <img 
        {...props} 
        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" 
        loading="lazy" 
        alt={props.alt || "Article Image"}
      />
    </div>
  ),

  // 2. Gold Links & Video Embeds
  a: ({ node, href, children, ...props }) => {
    const youtubeId = getYoutubeId(href);
    if (youtubeId) {
      return (
        <div className="my-16 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group ring-1 ring-white/10">
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
        className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 font-bold border-b border-amber-500/30 hover:border-amber-400 transition-all no-underline"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </Link>
    );
  },

  // 3. Paragraphs (Plus Jakarta Sans - Sharp & Bright)
  p: ({ node, children }) => {
    if (children && children[0] && typeof children[0] === 'string') {
       const text = children[0];
       const youtubeId = getYoutubeId(text);
       if (youtubeId && text.trim().match(/^https?:\/\//)) {
         return (
            <div className="my-16 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black ring-1 ring-white/10">
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
    // !text-slate-100 forces Platinum brightness
    // font-sans uses Plus Jakarta Sans
    return <p className="mb-8 text-[1.15rem] md:text-[1.25rem] leading-[1.8] !text-slate-100 font-sans font-normal tracking-wide">{children}</p>;
  },

  // 4. Editorial Headings (Cormorant Garamond)
  h1: ({ node, ...props }) => <h1 {...props} className="text-5xl md:text-6xl font-serif font-semibold !text-white mt-24 mb-12 tracking-tight leading-[1.1]" />,
  h2: ({ node, ...props }) => <h2 {...props} className="text-3xl md:text-4xl font-serif font-semibold !text-white mt-20 mb-8 pb-4 border-b border-white/10" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-2xl md:text-3xl font-serif font-medium !text-amber-100 mt-14 mb-6" />,
  
  // 5. Glass Blockquotes
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="relative pl-10 py-8 my-14 italic text-2xl md:text-3xl font-serif !text-slate-200 bg-gradient-to-r from-white/5 to-transparent rounded-r-3xl border-l-4 border-amber-500 shadow-2xl backdrop-blur-sm not-italic" />
  ),
  
  // 6. Luxury Lists
  ul: ({ node, ...props }) => <ul {...props} className="mb-12 space-y-5 list-none pl-0" />,
  ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-8 mb-12 space-y-5 text-xl !text-slate-200 marker:text-amber-500 marker:font-serif marker:font-bold" />,
  
  li: ({ node, ...props }) => (
    <li className="flex items-start gap-4 text-[1.15rem] !text-slate-100 leading-relaxed pl-2 font-sans">
      {/* The Diamond Icon */}
      <span className="mt-3 w-2 h-2 rotate-45 bg-amber-400 shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.8)]"></span>
      <span className="flex-1">{props.children}</span>
    </li>
  ),
  
  // 7. Gold Bold Text
  strong: ({ node, ...props }) => <strong {...props} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400" />,
};

export default function SmartMarkdown({ content }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={renderers}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
