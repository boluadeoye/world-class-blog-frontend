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
    <div className="my-4 bg-[#050505] border border-white/10 w-full overflow-hidden flex flex-col rounded-none">
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border-b border-white/10">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">{lang || 'terminal'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/30 hover:text-white transition-all font-mono text-[10px] uppercase tracking-wider cursor-pointer">
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-[#000000]">
        <pre className="text-[13px] font-mono text-[#e3e3e3] leading-relaxed whitespace-pre">
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
      <code className="bg-white/10 text-emerald-400 px-1.5 py-0.5 text-[12px] font-mono border border-white/10 rounded-none" {...props}>
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
    <div className="flex-1 overflow-y-auto relative w-full select-text bg-[#000000]" style={{ overscrollBehaviorY: 'contain' }}>
      <div className="w-full flex flex-col">
        {messages.map((msg: any) => (
          <div key={msg.id} className="flex w-full border-b border-white/10 align-top">
            {/* The Hard Gutter */}
            <div className="w-[56px] shrink-0 border-r border-white/10 bg-[#050505] flex flex-col items-center pt-5">
              <div className={`w-7 h-7 flex items-center justify-center text-[11px] font-mono font-bold border rounded-none ${
                msg.role === 'user' ? "bg-[#0a0a0a] border-white/20 text-white/50" : "bg-[#0a0a0a] border-emerald-500/30 text-emerald-500"
              }`}>
                {msg.role === 'user' ? 'OP' : 'Ω'}
              </div>
            </div>
            
            {/* The Content Area */}
            <div className="flex-1 min-w-0 p-5 bg-[#000000]">
              <div className="text-[14px] leading-[1.7] text-[#d1d1d1] font-normal tracking-tight">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  className="prose prose-invert max-w-none prose-p:mt-0 prose-p:mb-4 last:prose-p:mb-0 prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3 prose-headings:text-[15px] prose-strong:text-emerald-400" 
                  components={markdownComponents as any}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {(isThinking || streamingContent) && (
          <div className="flex w-full border-b border-white/10 align-top">
            <div className="w-[56px] shrink-0 border-r border-white/10 bg-[#050505] flex flex-col items-center pt-5">
              <div className="w-7 h-7 bg-[#0a0a0a] border border-emerald-500/50 flex items-center justify-center text-[11px] font-mono font-bold text-emerald-500 animate-pulse rounded-none">
                Ω
              </div>
            </div>
            <div className="flex-1 min-w-0 p-5 bg-[#000000]">
              <div className="text-[14px] leading-[1.7] text-[#d1d1d1]">
                {streamingContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:mt-0 prose-p:mb-4 last:prose-p:mb-0" components={markdownComponents as any}>
                    {streamingContent}
                  </ReactMarkdown>
                ) : (
                  <div className="flex gap-1.5 py-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-none animate-ping" />
                    <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-none animate-ping [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-none animate-ping [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-12 shrink-0" />
      </div>
    </div>
  );
});
