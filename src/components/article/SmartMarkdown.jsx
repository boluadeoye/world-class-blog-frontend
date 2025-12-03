"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

/* === YOUTUBE HELPER === */
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/* === CUSTOM RENDERERS === */
const renderers = {
  // 1. Images: Full width, rounded, shadow
  img: ({ node, ...props }) => (
    <div className="my-8 relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
      <img 
        {...props} 
        className="w-full h-auto object-cover" 
        loading="lazy" 
      />
    </div>
  ),

  // 2. Links: Check if it's a YouTube link, otherwise standard link
  a: ({ node, href, children, ...props }) => {
    const youtubeId = getYoutubeId(href);
    
    // If it's a YouTube link and the text is the URL itself (raw link)
    if (youtubeId && children[0] === href) {
      return (
        <div className="my-10 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
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

    // Standard Link
    return (
      <Link 
        href={href} 
        {...props} 
        className="text-amber-400 hover:text-amber-300 underline decoration-amber-500/30 underline-offset-4 transition-colors"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </Link>
    );
  },

  // 3. Paragraphs: Check for standalone YouTube links in text
  p: ({ node, children }) => {
    if (typeof children[0] === "string") {
      const text = children[0];
      const youtubeId = getYoutubeId(text);
      if (youtubeId && text.trim().match(/^https?:\/\//)) {
        return (
          <div className="my-10 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
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

  // 4. Headings
  h2: ({ node, ...props }) => <h2 {...props} className="text-3xl font-serif font-medium text-white mt-12 mb-6" />,
  h3: ({ node, ...props }) => <h3 {...props} className="text-2xl font-serif font-medium text-slate-100 mt-8 mb-4" />,
  blockquote: ({ node, ...props }) => (
    <blockquote {...props} className="border-l-4 border-amber-500 pl-6 py-2 my-8 italic text-xl text-slate-400 bg-white/5 rounded-r-lg" />
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
