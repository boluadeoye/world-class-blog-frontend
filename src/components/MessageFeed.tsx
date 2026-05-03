"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Check, Copy, Terminal, AlertTriangle, User, ThumbsUp, ThumbsDown, RotateCw } from "lucide-react";

// --- ISOLATED CODE BLOCK ---
const CodeBlock = memo(function CodeBlock({ inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'terminal';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [codeString]);

  if (inline) {
    return <code className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-emerald-500/20 break-words" {...props}>{children}</code>;
  }

  return (
    <div className="my-6 bg-[#0b0b0b] rounded-xl border border-white/10 w-full overflow-hidden flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#151515] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="ml-2 text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold">{lang}</span>
        </div>
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

// --- CLAUDE-STYLE ACTION BAR ---
const MessageActionBar = memo(function MessageActionBar({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/5 opacity-60 hover:opacity-100 transition-opacity">
      <button onClick={handleCopy} className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all flex items-center gap-1.5">
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        <span className="text-[11px] font-medium">{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <div className="w-px h-3 bg-white/10 mx-1" />
      <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all"><ThumbsUp size={14} /></button>
      <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all"><ThumbsDown size={14} /></button>
      <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all"><RotateCw size={14} /></button>
    </div>
  );
});

export const MessageFeed = memo(function MessageFeed({ messages, isThinking, streamingContent }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  },[]);

  useLayoutEffect(() => { scrollToBottom(); },[messages, streamingContent, isThinking, scrollToBottom]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: "end" }); },[]);

  return (
    <div className="flex flex-col relative" style={{ flex: "1 1 0px", minHeight: 0, overflowY: "auto" }}>
      {/* Custom Scrollbar Injection */}
      <style dangerouslySetOrigin={{__html: `
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />

      <div className="px-4 pt-8 pb-32 max-w-3xl mx-auto w-full flex flex-col gap-8">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-medium text-white/20 mt-20 text-center tracking-tight">
            Awaiting Strategic Input...
          </motion.div>
        )}
        
        {messages.map((msg: any, i: number) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex gap-4 w-full"
          >
            <div className="shrink-0 mt-1">
              {msg.role === 'user' ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg flex items-center justify-center text-white"><User size={16}/></div>
              ) : msg.role === 'system_error' ? (
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-500"><AlertTriangle size={16}/></div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center text-white"><Terminal size={16}/></div>
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
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-p:leading-[1.7] prose-p:mb-4 last:prose-p:mb-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0 prose-li:marker:text-white/30 prose-a:text-emerald-400 prose-strong:text-white" 
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
              {msg.role === 'assistant' && <MessageActionBar content={msg.content} />}
            </div>
          </motion.div>
        ))}

        {(isThinking || streamingContent) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 w-full">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-500 animate-pulse"><Terminal size={16}/></div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)] w-full">
              <div className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Principal Architect</div>
              <div className="text-[15px] leading-relaxed text-[#e3e3e3]">
                {streamingContent ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    className="prose prose-invert max-w-none prose-p:leading-[1.7] prose-p:mb-4 last:prose-p:mb-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0" 
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
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity:[0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ scale:[1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ scale:[1, 1.2, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
});
