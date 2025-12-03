"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

/* === YOUTUBE HELPER === */
const getYoutubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/* === CUSTOM RENDERERS === */
const renderers = {
  // 1. Images: Full width, rounded, shadow
  img: ({ node, ...props }) => (
    <div className="my-10 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
      <img 
        {...props} 
        className="w-full h-auto object-cover" 
        loading="lazy" 
        alt={props.alt || "Article Image"}
      />
    </div>
  ),

  // 2. Links: Detect YouTube and render Player
  a: ({ node, href, children, ...props }) => {
    const youtubeId = getYoutubeId(href);
    
    if (youtubeId) {
      return (
        <div className="my-12 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
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
        className="text-amber-400 hover:text-amber-300 underline decoration-amber-500/30 underline-offset-4 transition-colors font-medium"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </Link>
    );
  },

  // 3. Paragraphs: Check for standalone YouTube links
  p: ({ node, children }) => {
    // If paragraph contains just a link (common in markdown)
    if (children && children[0] && typeof children[0] === 'string') {
       const text = children[0];
       // Check if the text itself is a youtube URL
       const youtubeId = getYoutubeId(text);
       if (youtubeId && text.trim().match(/^https?:\/\//)) {
         return (
            <div className="my-12 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
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
    return <p className="mb-6 text-lg leading-relaxed text-slate-300">{children}</p>;
  },

  // 4. Headings: Editorial Typography
  h1: ({ node, ...props }) => <h1 {...props} className="text-4xl font-serif font-medium text-white mt-16 mb-8" />,
  h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-serif font-medium text-white mt-14 mb-6 border-l-4 border-amber-500 pl-4" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-2xl font-serif font-medium text-slate-100 mt-10 mb-4" />,
  
  // 5. Blockquotes
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-2 border-amber-500 pl-6 py-4 my-10 italic text-xl text-slate-300 bg-white/5 rounded-r-xl" />
  ),
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
