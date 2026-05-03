"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Terminal, AlertTriangle } from "lucide-react";

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
    <div className="group relative my-4 rounded-xl overflow-hidden border border-white/[0.06] bg-[#111318] max-w-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#0d0f14]">
        <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest">{lang || "terminal"}</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-mono text-white/40 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.08] transition-all">
          {copied ? <><Check size={12} className="text-emerald-500"/><span>Copied</span></> : <><Copy size={12}/><span>Copy</span></>}
        </button>
      </div>
      <div className="overflow-x-auto touch-pan-x">
        <pre className="p-4 text-[13px] leading-relaxed font-mono text-emerald-400/90 whitespace-pre float-left min-w-full">
          <code className={className} {...props}>{children}</code>
        </pre>
      </div>
    </div>
  );
});

const markdownComponents = {
  code({ inline, className, children, ...props }: any) {
    if (inline) return <code className="px-1.5 py-0.5 rounded bg-white/[0.07] text-emerald-300 font-mono text-[13px] break-words" {...props}>{children}</code>;
    return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
  }
};

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useLayoutEffect(() => { scrollToBottom(); },[messages, streamingContent, isThinking, scrollToBottom]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: "end" }); },[]);

  return (
    <div className="flex flex-col" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
      <div className="px-4 pt-6 pb-32 max-w-3xl mx-auto w-full">
        {messages.length === 0 && <div className="text-2xl font-medium text-white/20 mt-10">Awaiting Strategic Input...</div>}
        
        {messages.map((msg: any) => (
          <div key={msg.id} className="mb-8 flex flex-col gap-2 w-full">
            <div className="flex items-center gap-3 mb-1">
              {msg.role === 'user' ? <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[12px] font-bold text-white">U</div> : msg.role === 'system_error' ? <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white"><AlertTriangle size={14}/></div> : <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white"><Terminal size={14}/></div>}
              <span className="text-[14px] font-medium text-white">{msg.role === 'user' ? 'User' : msg.role === 'system_error' ? 'System Error' : 'Principal Architect'}</span>
            </div>
            <div className="pl-10 text-[15px] leading-relaxed text-[#e3e3e3] w-full">
              {msg.role === 'system_error' ? <div className="text-red-400 font-mono text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{msg.content}</div> : <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-p:mb-4 last:prose-p:mb-0" components={markdownComponents as any}>{msg.content}</ReactMarkdown>}
            </div>
          </div>
        ))}

        {(isThinking || streamingContent) && (
          <div className="mb-8 flex flex-col gap-2 w-full">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white animate-pulse"><Terminal size={14}/></div>
              <span className="text-[14px] font-medium text-white">Principal Architect</span>
            </div>
            <div className="pl-10 text-[15px] leading-relaxed text-[#e3e3e3] w-full">
              {streamingContent ? <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-p:mb-4 last:prose-p:mb-0" components={markdownComponents as any}>{streamingContent}</ReactMarkdown> : <div className="flex gap-1.5 py-3"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce[animation-delay:0.2s]" /><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" /></div>}
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
});
