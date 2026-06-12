"use client";
import React, { useCallback, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Trash2, ChevronRight } from "lucide-react";

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
    <div className="my-4 bg-[#050505] border-y border-neutral-800 w-[calc(100%+16px)] -mx-2 overflow-hidden flex flex-col rounded-none">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a0a0a] border-b border-neutral-800 select-none">
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400">{lang || 'terminal'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-neutral-400 hover:text-white transition-all font-mono text-[9px] uppercase tracking-wider cursor-pointer">
          {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-3 overflow-x-auto bg-[#000000]">
        <pre className="text-[12px] font-mono text-[#e3e3e3] leading-relaxed whitespace-pre">
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
      <code className="bg-[#111111] text-emerald-400 px-1 py-0.5 text-[11px] font-mono border border-neutral-800 rounded-none break-words" {...props}>
        {children}
      </code>
    );
  }
};

const ReasoningTrace = ({ thoughts }: { thoughts: string[] }) => {
  if (!thoughts || thoughts.length === 0) return null;
  return (
    <details className="mb-4 group">
      <summary className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 cursor-pointer select-none list-none flex items-center gap-1.5">
        <ChevronRight size={10} className="group-open:rotate-90 transition-transform text-emerald-500/50" />
        Reasoning Trace
      </summary>
      <div className="mt-2 pl-3 border-l border-neutral-800 text-[11px] font-mono text-neutral-400 space-y-1.5">
        {thoughts.map((t, i) => <div key={i} className="leading-relaxed">&gt; {t}</div>)}
      </div>
    </details>
  );
};

export const MessageFeed = memo(function MessageFeed({ messages, isStreaming, streamingContent, streamingThoughts, onDelete, onCopy }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, []);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, streamingThoughts, scrollToBottom]);

  return (
    <div className="flex-1 overflow-y-auto relative w-full select-text bg-[#000000]" style={{ overscrollBehaviorY: 'contain' }}>
      <div className="w-full flex flex-col">
        {messages.map((msg: any) => (
          <div key={msg.id} className="grid grid-cols-[40px_minmax(0,1fr)] w-full border-b border-neutral-900 align-top py-4 group">
            {/* The Sovereign Gutter */}
            <div className="flex flex-col items-center pt-0.5 select-none border-r border-neutral-900 bg-[#030303]/45 h-full">
              <div className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono font-bold border rounded-none shrink-0 ${
                msg.role === 'user' ? "bg-[#111111] border-neutral-800 text-neutral-400" : "bg-[#111111] border-emerald-950 text-emerald-500"
              }`}>
                {msg.role === 'user' ? 'OP' : 'Ω'}
              </div>
              
              {/* Message Sovereignty Controls (Hidden during streaming) */}
              {!isStreaming && (
                <div className="flex flex-col gap-4 mt-4 opacity-30 hover:opacity-100 transition-opacity">
                  <button onClick={() => onCopy(msg.content)} className="text-neutral-500 hover:text-emerald-400 transition-colors" title="Copy Message">
                    <Copy size={12} />
                  </button>
                  <button onClick={() => onDelete(msg.id)} className="text-neutral-500 hover:text-red-500 transition-colors" title="Delete Message">
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="px-3 min-w-0 overflow-x-hidden break-words">
              <ReasoningTrace thoughts={msg.thoughts} />
              <div className="text-[13px] leading-[1.6] text-[#d1d1d1] font-normal tracking-tight">
                {msg.role === 'system_error' ? (
                  <div className="text-red-400 font-mono text-xs bg-red-950/10 p-3 border-l-2 border-red-500 rounded-none">
                    {msg.content}
                  </div>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-p:mb-3 last:prose-p:mb-0 prose-headings:text-white prose-strong:text-emerald-400" 
                    components={markdownComponents as any}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="grid grid-cols-[40px_minmax(0,1fr)] w-full align-top py-4">
            <div className="flex justify-center pt-0.5 select-none border-r border-neutral-900 bg-[#030303]/45">
              <div className="w-6 h-6 bg-[#111111] border border-emerald-950 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-400 animate-pulse rounded-none">
                Ω
              </div>
            </div>
            <div className="px-3 min-w-0 overflow-x-hidden break-words">
              <ReasoningTrace thoughts={streamingThoughts} />
              <div className="text-[13px] leading-[1.6] text-[#d1d1d1]">
                {streamingContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert max-w-none prose-p:mb-3 last:prose-p:mb-0" components={markdownComponents as any}>
                    {streamingContent}
                  </ReactMarkdown>
                ) : (
                  <div className="flex gap-1 py-2">
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-none animate-ping" />
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-none animate-ping [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-emerald-500/50 rounded-none animate-ping [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-6 shrink-0" />
      </div>
    </div>
  );
});
