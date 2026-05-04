"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Terminal, AlertTriangle, User, Sparkles } from "lucide-react";

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
    <div className="my-4 bg-[#0d0d0d] rounded-xl border border-white/10 w-full overflow-hidden flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono font-bold">{lang || 'terminal'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all p-1">
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          <span className="text-[10px] uppercase font-bold tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto touch-pan-x">
        <pre className="text-[13px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre float-left min-w-full">
          <code className={className} {...props}>{children}</code>
        </pre>
      </div>
    </div>
  );
});

const markdownComponents = {
  code({ inline, className, children, ...props }: any) {
    // THE BACKTICK TRAP FIX: Strictly distinguish inline vs block
    if (inline || !className) {
      return <code className="bg-white/10 text-emerald-400 px-1.5 py-0.5 rounded text-[13px] font-mono border border-white/5 break-words" {...props}>{children}</code>;
    }
    return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
  }
};

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  },[]);

  useLayoutEffect(() => { scrollToBottom(); }, [messages, streamingContent, isThinking, scrollToBottom]);

  return (
    <div className="flex flex-col relative" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
      <div className="px-4 md:px-8 pt-8 pb-40 max-w-4xl mx-auto w-full flex flex-col gap-12">
        {messages.map((msg: any) => (
          <div key={msg.id} className="grid grid-cols-[40px_1fr] gap-4 w-full group">
            <div className="shrink-0">
              {msg.role === 'user' ? (
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400"><User size={16}/></div>
              ) : msg.role === 'system_error' ? (
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500"><AlertTriangle size={16}/></div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400"><Sparkles size={16}/></div>
              )}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                {msg.role === 'user' ? 'Operator' : 'Principal Architect'}
              </div>
              <div className="text-[15px] leading-[1.6] text-[#e3e3e3] font-normal tracking-tight">
                {msg.role === 'system_error' ? (
                  <div className="text-red-400 font-mono text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">{msg.content}</div>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:mb-4 last:prose-p:mb-0 prose-pre:m-0" components={markdownComponents as any}>
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}

        {(isThinking || streamingContent) && (
          <div className="grid grid-cols-[40px_1fr] gap-4 w-full">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse"><Sparkles size={16}/></div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Principal Architect</div>
              <div className="text-[15px] leading-[1.6] text-[#e3e3e3]">
                {streamingContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none" components={markdownComponents as any}>
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
