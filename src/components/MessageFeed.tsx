"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Terminal, AlertTriangle, User } from "lucide-react";

const CodeBlock = memo(function CodeBlock({ inline, className, children, ...props }: any) {
  const[copied, setCopied] = useState(false);
  const lang = (className ?? "").replace("language-", "").split(" ")[0];
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [codeString]);

  if (inline) return <code className="bg-[#1e1e1e] text-emerald-300 px-1.5 py-0.5 rounded text-[13px] font-mono border border-white/10 break-words" {...props}>{children}</code>;

  return (
    <div className="my-6 bg-[#0d0d0d] rounded-xl border border-white/10 w-full overflow-hidden flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold">{lang || 'terminal'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all p-1 bg-white/5 hover:bg-white/10 rounded-md border border-white/5">
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          <span className="text-[10px] uppercase font-bold tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto touch-pan-x scrollbar-hide">
        <pre className="text-[13px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre float-left min-w-full">
          <code className={className} {...props}>{children}</code>
        </pre>
      </div>
    </div>
  );
});

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  },[]);

  useLayoutEffect(() => { scrollToBottom(); }, [messages, streamingContent, isThinking, scrollToBottom]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: "end" }); },[]);

  return (
    <div className="flex flex-col relative" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
      <div className="px-4 pt-8 pb-32 max-w-3xl mx-auto w-full flex flex-col gap-8">
        {messages.length === 0 && (
          <div className="text-xl font-medium text-white/20 mt-20 text-center tracking-tight">
            Awaiting Strategic Input...
          </div>
        )}

        {messages.map((msg: any) => (
          <div key={msg.id} className="flex gap-4 w-full">
            <div className="shrink-0 mt-1">
              {msg.role === 'user' ? (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white"><User size={16}/></div>
              ) : msg.role === 'system_error' ? (
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500"><AlertTriangle size={16}/></div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white"><Terminal size={16}/></div>
              )}
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] w-full">
              <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
                {msg.role === 'user' ? 'You' : msg.role === 'system_error' ? 'System Error' : 'Principal Architect'}
              </div>
              <div className="text-[15px] leading-relaxed text-[#e3e3e3]">
                {msg.role === 'system_error' ? (
                  <div className="text-red-400 font-mono text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">{msg.content}</div>
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:leading-[1.7] prose-p:mb-4 last:prose-p:mb-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0" components={{ code: CodeBlock as any }}>
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}

        {(isThinking || streamingContent) && (
          <div className="flex gap-4 w-full">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white animate-pulse"><Terminal size={16}/></div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] w-full">
              <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Principal Architect</div>
              <div className="text-[15px] leading-relaxed text-[#e3e3e3]">
                {streamingContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:leading-[1.7] prose-p:mb-4 last:prose-p:mb-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0" components={{ code: CodeBlock as any }}>
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
