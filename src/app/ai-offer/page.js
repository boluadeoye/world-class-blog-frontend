"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, ShieldAlert, Zap, BrainCircuit, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AIOfferPage() {
  // Simulated Chat Animation State
  const [chatStep, setChatStep] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const chatMessages = [
    { role: "user", text: "How much is the iPhone 15?" },
    { role: "bot", text: "It's ₦1.2M. But I can give you a 5% discount if you pay now." },
    { role: "user", text: "Okay, send account details." },
    { role: "bot", text: "Sent! I'm verifying your payment..." }
  ];

  return (
    // Z-INDEX 9999 forces this page to cover the global header/footer (Leaky Bucket Rule)
    <main className="fixed inset-0 z-[9999] bg-[#050505] text-white overflow-y-auto font-sans selection:bg-green-500/30">
      
      {/* === SECTION A: MINIMALIST HEADER === */}
      <nav className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter">Bolu.Dev</div>
        <a href="tel:+2348106293674" className="flex items-center gap-2 text-sm font-bold text-green-400 bg-green-400/10 px-4 py-2 rounded-full hover:bg-green-400/20 transition-colors">
          <Phone size={16} /> 0810 629 3674
        </a>
      </nav>

      {/* === SECTION B: HERO (THE HOOK) === */}
      <section className="px-6 pt-16 pb-20 text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-3 py-1 mb-6 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest"
        >
          ⚠️ Attention Business Owners
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Stop Losing Sales <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">While You Sleep.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          I build Custom AI Sales Agents that answer questions, negotiate prices, and verify payments 24/7.
        </p>

        {/* Simulated Chat Visual */}
        <div className="max-w-sm mx-auto bg-slate-900 rounded-2xl border border-white/10 p-4 mb-10 shadow-2xl shadow-green-900/20">
          <div className="space-y-3 text-left text-sm">
            {chatMessages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: i <= chatStep ? 1 : 0.3, x: 0 }}
                className={`p-3 rounded-xl max-w-[85%] ${msg.role === 'user' ? 'bg-slate-800 ml-auto text-slate-200' : 'bg-green-600 text-white mr-auto'}`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
        </div>

        <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Get Your AI Proposal (Free) <ArrowRight size={20} />
        </a>
      </section>

      {/* === SECTION C: PAIN & SOLUTION === */}
      <section className="px-6 py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-red-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Tired of Fake Alerts?</h3>
            <p className="text-slate-400 leading-relaxed">
              My AI integrates with your wallet to verify payments <span className="text-white font-bold">before</span> releasing products. Stop getting scammed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-amber-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Missed DM = Missed Sale</h3>
            <p className="text-slate-400 leading-relaxed">
              My AI replies in 1 second, day or night. Never lose a customer to a slow response again. Speed kills competition.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-green-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Your Digital Salesman</h3>
            <p className="text-slate-400 leading-relaxed">
              Not just a chatbot. It knows your inventory, your prices, and can negotiate deals based on your rules.
            </p>
          </div>

        </div>
      </section>

      {/* === SECTION D: PORTFOLIO PROOF === */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Enterprise Deployments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="group relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <span className="text-slate-600 font-mono text-xs">PROJECT_SCREENSHOT_1</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="font-bold text-lg">The E-Learning Citadel</h3>
              <p className="text-slate-300 text-sm">Full-stack educational platform.</p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <span className="text-slate-600 font-mono text-xs">PROJECT_SCREENSHOT_2</span>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="font-bold text-lg">Nexus-Commerce</h3>
              <p className="text-slate-300 text-sm">Multi-vendor architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION F: THE CLOSE (CTA) === */}
      <section id="contact" className="px-6 py-24 bg-green-900/10 border-t border-green-500/20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Automate Your Business?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            I only take 3 clients per month to ensure quality. Secure your slot now.
          </p>
          
          <a 
            href="https://wa.me/2348106293674?text=Hi%20Bolu%2C%20I%20saw%20your%20ad%20about%20AI%20Chatbots.%20I%27m%20interested."
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-green-500/20"
          >
            <MessageCircle size={24} fill="white" className="text-[#25D366]" />
            Chat on WhatsApp
          </a>
          
          <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest">
            <CheckCircle size={12} className="inline mr-1 text-green-500" /> 
            Response time: Under 5 mins
          </p>
        </div>
      </section>

      {/* === FLOATING WIDGET === */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/2348106293674?text=Hi%20Bolu%2C%20I%20have%20a%20question."
          className="flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </a>
      </div>

    </main>
  );
}
