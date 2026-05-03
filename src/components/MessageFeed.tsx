"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Terminal, AlertTriangle, User } from "lucide-react";

// --- ISOLATED CODE BLOCK ---
const CodeBlock = memo(function CodeBlock({ inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [codeString]);

  // Inline code styling (prevents normal sentences from becoming blocks)
  if (inline) {
    return <code className="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded-md text-[13px] font-mono break-words" {...props}>{children}</code>;
  }

  // Block code styling
  return (
    <div className="my-5 bg-[#1e1f20] rounded-xl border border-white/10 w-full overflow-hidden flex flex-col shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2a2b2f] border-b border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono">{lang}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/50 hover:text-white transition-all p-1">
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto touch-pan-x">
        <pre className="text-[13px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre">
          <code className={className} {...props}>{children}</code>
        </pre>
      </div>
    </div>
  );
});

// --- MESSAGE ACTION BAR (COPY ALL) ---
const MessageActionBar = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-2 mt-2 pt-2">
      <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 hover:text-white/80 transition-colors">
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
        {copied ? 'Copied' : 'Copy Response'}
      </button>
    </div>
  );
};

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  },[]);

  useLayoutEffect(() => { scrollToBottom(); }, [messages, streamingContent, isThinking, scrollToBottom]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: "end" }); },[]);

  return (
    <div className="flex flex-col" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
      <div className="px-4 pt-8 pb-32 max-w-3xl mx-auto w-full flex flex-col gap-8">
        
        {messages.length === 0 && (
          <div className="text-2xl font-medium text-white/20 mt-10 text-center">
            Awaiting Strategic Input...
          </div>
        )}
        
        {messages.map((msg: any) => (
          <div key={msg.id} className="flex gap-4 w-full">
            {/* Avatar */}
            <div className="shrink-0 mt-1">
              {msg.role === 'user' ? (
                <div className="w-8 h-8 rounded-full bg-[#2a2b2f] border border-white/10 flex items-center justify-center text-white"><User size={16}/></div>
              ) : msg.role === 'system_error' ? (
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500"><AlertTriangle size={16}/></div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-500"><Terminal size={16}/></div>
              )}
            </div>

            {/* Content Area (Grid Minmax prevents blowout) */}
            <div className="grid grid-cols-[minmax(0,1fr)] w-full">
              <div className="text-[13px] font-bold text-white/40 uppercase tracking-widest mb-1">
                {msg.role === 'user' ? 'You' : msg.role === 'system_error' ? 'System Error' : 'Shannon Architect'}
              </div>
              
              <div className="text-[15px] leading-relaxed text-[#e3e3e3]">
                {msg.role === 'system_error' ? (
                  <div className="text-red-400 font-mono text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">{msg.content}</div>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-p:mb-4 last:prose-p:mb-0" 
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        return <CodeBlock inline={inline} className={className} {...props}>{children}</CodeBlock>;
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
              
              {/* Copy All Action Bar (Only for AI responses) */}
              {msg.role === 'assistant' && <MessageActionBar content={msg.content} />}
            </div>
          </div>
        ))}

        {/* Streaming / Thinking State */}
        {(isThinking || streamingContent) && (
          <div className="flex gap-4 w-full">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-500 animate-pulse"><Terminal size={16}/></div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] w-full">
              <div className="text-[13px] font-bold text-white/40 uppercase tracking-widest mb-1">Shannon Architect</div>
              <div className="text-[15px] leading-relaxed text-[#e3e3e3]">
                {streamingContent ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-p:mb-4 last:prose-p:mb-0" 
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        return <CodeBlock inline={inline} className={className} {...props}>{children}</CodeBlock>;
                      }
                    }}
                  >
                    {streamingContent}
                  </ReactMarkdown>
                ) : (
                  <div className="flex gap-1.5 py-3">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce[animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
});
