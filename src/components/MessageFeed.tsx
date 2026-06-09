"use client";
import React, { useCallback, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, AlertTriangle } from "lucide-react";

const CodeBlock = memo(function CodeBlock({ children, className, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const lang = (className ?? "").replace("language-", "").split(" ")[0];
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [codeString]);

  return (
    <div className="my-4 bg-[#050505] border border-white/10 w-full overflow-hidden flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0f0f0f] border-b border-white/5 select-none">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono font-bold">{lang || 'terminal'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-white/40 hover:text-white transition-all p-1 font-mono text-[9px] uppercase tracking-wider cursor-pointer">
          {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto touch-pan-x bg-[#020202]">
        <pre className="text-[13px] font-mono text-[#e3e3e3] leading-relaxed whitespace-pre float-left min-w-full">
          <code className={className} {...props}>{children}</code>
        </pre>
      </div>
    </div>
  );
});

const markdownComponents = {
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <CodeBlock className={className} {...props}>{children}</CodeBlock>
    ) : (
      <code className="bg-white/10 text-emerald-400 px-1.5 py-0.5 rounded-sm text-[12px] font-mono border border-white/5 break-words" {...props}>
        {children}
      </code>
    );
  }
};

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, []);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, isThinking, scrollToBottom]);

  return (
    <div className="flex-1 overflow-y-auto relative w-full select-text scroll-smooth" style={{ overscrollBehaviorY: 'contain' }}>
      <div className="px-4 md:px-12 pt-6 pb-32 max-w-4xl mx-auto w-full flex flex-col">
        {messages.map((msg: any) => (
          <div key={msg.id} className="grid grid-cols-[44px_1fr] gap-2 w-full py-4 border-b border-white/5 last:border-b-0 align-top">
            <div className="shrink-0 mt-1 select-none">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold border ${
                msg.role === 'user' 
                  ? "bg-[#1a1a1a] border-white/20 text-white/70" 
                  : msg.role === 'system_error'
                  ? "bg-red-500/20 border-red-500/40 text-red-500"
                  : "bg-[#111] border-emerald-500/30 text-emerald-400"
              }`}>
                {msg.role === 'user' ? 'OP' : msg.role === 'system_error' ? '!' : 'Ω'}
              </div>
            </div>
            
            <div className="min-w-0">
              <div className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-white/20 mb-1 select-none">
                {msg.role === 'user' ? 'Operator' : 'Principal Architect'}
              </div>
              <div className="text-[14px] leading-[1.6] text-[#d1d1d1] font-normal tracking-tight">
                {msg.role === 'system_error' ? (
                  <div className="text-red-400 font-mono text-xs bg-red-500/5 p-3 border-l border-red-500/50">{msg.content}</div>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-p:mb-3 last:prose-p:mb-0 prose-pre:m-0 prose-headings:text-white prose-headings:mb-2 prose-headings:mt-4" 
                    components={markdownComponents as any}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}

        {(isThinking || streamingContent) && (
          <div className="grid grid-cols-[44px_1fr] gap-2 w-full py-4 align-top">
            <div className="shrink-0 mt-1 select-none">
              <div className="w-8 h-8 rounded-sm bg-[#111] border border-emerald-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-400 animate-pulse">
                Ω
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-white/20 mb-1 select-none">Principal Architect</div>
              <div className="text-[14px] leading-[1.6] text-[#d1d1d1]">
                {streamingContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:mb-3 last:prose-p:mb-0" components={markdownComponents as any}>
                    {streamingContent}
                  </ReactMarkdown>
                ) : (
                  <div className="flex gap-1 py-2 items-center">
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-ping" />
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-ping [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-ping [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4 shrink-0" />
      </div>
    </div>
  );
});
