"use client";
import { useState } from "react";
import {
  Download, Eye, EyeOff, ArrowLeft, ShieldCheck, Database,
  Globe, Smartphone, MessageSquare, CreditCard, Bot, CheckCircle2,
  Lock, AlertCircle, FileText, Check, ChevronRight, Server
} from "lucide-react";
import Link from "next/link";

export default function ARSInfrastructureSpec() {
  const [showScreenPreview, setShowScreenPreview] = useState(false);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ARS_Multiventures_Infrastructure_Specification";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-[#1E232A] selection:bg-[#B5853B]/20">
      {/* === GLOBAL PRINT ENGINE STYLES === */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            width: 210mm;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          body > header, body > nav, body > footer, .no-print {
            display: none !important;
          }
          #print-container, #print-container * {
            visibility: visible !important;
          }
          #print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            background: #ffffff !important;
          }
          .a4-sheet {
            width: 210mm !important;
            height: 296.8mm !important;
            max-height: 296.8mm !important;
            padding: 13mm 14mm !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            position: relative !important;
            background: #ffffff !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .a4-sheet:not(:last-child) {
            page-break-after: always !important;
            break-after: page !important;
          }
          .a4-sheet:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
        }
      `}</style>

      {/* === VIEW A: OBSIDIAN EXECUTIVE PORTAL (SCREEN ONLY) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0F5C38]/20 via-[#0F172A] to-[#0F172A]" />

        <div className="relative z-10 w-full max-w-lg bg-[#1E232A]/90 backdrop-blur-xl border border-[#B5853B]/30 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-[#0F5C38] border-2 border-[#B5853B] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[#0F5C38]/30">
            <Server size={30} className="text-[#B5853B]" />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#0F5C38]/20 border border-[#0F5C38]/40 px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#B5853B] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0F5C38] animate-ping" />
            ARS MULTIVENTURES SPECIFICATION
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-2">
            Cloud Infrastructure &amp; Compliance Specification
          </h1>
          <p className="text-[#64748B] text-xs font-mono mb-6 leading-relaxed">
            Enterprise Operating Portal, Cloud Database Engine, iOS &amp; Android Publisher Licenses &amp; Compliance
          </p>

          <div className="space-y-3">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-[#0F5C38] hover:bg-[#0c492c] text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.01] shadow-xl shadow-[#0F5C38]/40 uppercase tracking-wider text-xs border border-[#B5853B]/40"
            >
              <Download size={18} className="text-[#B5853B]" />
              <span>Download Executive Specification (PDF)</span>
            </button>

            <button
              onClick={() => setShowScreenPreview(!showScreenPreview)}
              className="w-full flex items-center justify-center gap-2 bg-[#1E232A] hover:bg-[#282f38] text-slate-200 font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all text-xs uppercase tracking-wider"
            >
              {showScreenPreview ? <EyeOff size={15} /> : <Eye size={15} />}
              <span>{showScreenPreview ? "Hide Document Preview" : "Inspect Document On-Screen"}</span>
            </button>
          </div>

          <Link href="/" className="inline-flex items-center gap-1.5 mt-6 text-xs text-slate-500 hover:text-slate-300 font-mono">
            <ArrowLeft size={13} /> Return to Portal Home
          </Link>
        </div>
      </div>

      {/* === VIEW B: THE A4 EXECUTIVE SPECIFICATION (PRINT / PREVIEW) === */}
      <div
        id="print-container"
        className={`${
          showScreenPreview
            ? "block py-10 space-y-10 bg-slate-900 print:py-0 print:space-y-0 print:bg-white"
            : "hidden print:block"
        } w-[210mm] mx-auto bg-white`}
      >
        {/* ================= PAGE 1 ================= */}
        <div className="a4-sheet w-[210mm] h-[296.8mm] p-[13mm_14mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col justify-between">
          <div>
            {/* Top Corporate Header */}
            <div className="border-b-2 border-[#0F5C38] pb-3 mb-3.5">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#0F5C38] rounded-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-[#B5853B] rounded-full" />
                  </div>
                  <span className="text-[10pt] font-black tracking-widest text-[#0F5C38] uppercase">
                    ARS MULTIVENTURES LTD
                  </span>
                </div>
                <div className="text-[8pt] font-bold text-[#64748B] tracking-wider uppercase font-mono">
                  DATE: NOVEMBER 2026
                </div>
              </div>

              <div className="h-[2px] w-full bg-gradient-to-r from-[#0F5C38] via-[#B5853B] to-[#0F5C38] mb-2.5" />

              <h1 className="text-[15pt] font-black uppercase tracking-tight text-[#1E232A] leading-snug">
                PRODUCTION CLOUD INFRASTRUCTURE, APP STORE LICENSING &amp; COMPLIANCE SPECIFICATION
              </h1>
            </div>

            {/* Executive Summary */}
            <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-xl p-3 mb-3.5 shadow-sm">
              <h2 className="text-[8pt] font-black uppercase tracking-wider text-[#0F5C38] mb-1 flex items-center gap-1.5">
                <FileText size={13} className="text-[#B5853B]" />
                EXECUTIVE SUMMARY
              </h2>
              <p className="text-[8pt] text-[#1E232A] leading-relaxed font-normal">
                This briefing outlines the complete cloud infrastructure, app store publisher licenses, automated messaging pipelines, payment gateways, and regulatory compliance documents required to launch the ARS Multiventures Web Operating Portal, Operations Back-Office, and Native Mobile Applications (iOS &amp; Android). Every item in this document represents an essential operational component of the platform ecosystem.
              </p>
            </div>

            {/* Section 1: Compulsory Cloud Infrastructure & Publisher Licenses */}
            <div className="mb-2">
              <div className="flex items-center justify-between border-b-2 border-[#B5853B] pb-1 mb-2">
                <h2 className="text-[10pt] font-black uppercase tracking-tight text-[#0F5C38]">
                  SECTION 1: COMPULSORY CLOUD INFRASTRUCTURE &amp; PUBLISHER LICENSES
                </h2>
                <span className="text-[7pt] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#0F5C38] border border-[#0F5C38]/20 px-2 py-0.5 rounded-full">
                  PLATFORM CORE
                </span>
              </div>

              <div className="space-y-2">
                {/* 1.1 Supabase Pro */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <Database size={13} className="text-[#0F5C38]" />
                      <h3 className="text-[8.5pt] font-bold text-[#1E232A]">1.1 Supabase Pro Database Engine</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-2 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY
                      </span>
                      <span className="font-mono text-[7.5pt] font-black text-[#1E232A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        $25.00 / mo (~₦37,500)
                      </span>
                    </div>
                  </div>
                  <p className="text-[7.5pt] text-[#1E232A] leading-snug mb-0.5">
                    <strong className="text-[#0F5C38]">What it is:</strong> The secure online digital vault where all platform information is saved, including customer accounts, material requisitions, granite prices, receipts, and truck dispatch records.
                  </p>
                  <p className="text-[7pt] text-[#64748B] leading-snug">
                    <strong className="text-[#1E232A]">Why it is required:</strong> The Pro tier guarantees 100% unpaused 24/7 database availability, 10,000 live connections for real-time tracking, and automated daily backups with 7-day disaster recovery.
                  </p>
                </div>

                {/* 1.2 Custom Domain */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <Globe size={13} className="text-[#0F5C38]" />
                      <h3 className="text-[8.5pt] font-bold text-[#1E232A]">1.2 Custom Corporate Web Domain (.com)</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-2 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY
                      </span>
                      <span className="font-mono text-[7.5pt] font-black text-[#1E232A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        ~$15.00 / yr (~₦22,500)
                      </span>
                    </div>
                  </div>
                  <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                    <strong className="text-[#0F5C38]">Purpose:</strong> Your official corporate web address on the internet (e.g., arsventures.com). This is the primary web address typed by clients and commercial partners to access your Web Portal and Back-Office Admin System.
                  </p>
                </div>

                {/* 1.3 Apple Developer Program Account */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <Smartphone size={13} className="text-[#0F5C38]" />
                      <h3 className="text-[8.5pt] font-bold text-[#1E232A]">1.3 Apple Developer Program Account (iOS App Store &amp; TestFlight)</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-2 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY FOR iOS
                      </span>
                      <span className="font-mono text-[7.5pt] font-black text-[#1E232A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        $99.00 / yr (~₦148,500)
                      </span>
                    </div>
                  </div>
                  <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                    <strong className="text-[#0F5C38]">Operational Role:</strong> The official corporate publisher license issued directly by Apple Inc. Apple strictly prohibits any mobile application from appearing on the Apple App Store or being installed on iPhones without an active corporate developer license.
                  </p>
                </div>

                {/* 1.4 Google Play Console */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <Smartphone size={13} className="text-[#0F5C38]" />
                      <h3 className="text-[8.5pt] font-bold text-[#1E232A]">1.4 Google Play Console Publisher Account (Android Play Store)</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-2 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY FOR ANDROID
                      </span>
                      <span className="font-mono text-[7.5pt] font-black text-[#1E232A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        $25.00 one-time (~₦37,500)
                      </span>
                    </div>
                  </div>
                  <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                    <strong className="text-[#0F5C38]">Operational Role:</strong> The official corporate publisher license issued directly by Google LLC. Google requires a registered publisher license to list, distribute, and update the ARS Multiventures mobile app on the Google Play Store.
                  </p>
                </div>

                {/* 1.5 Termii SMS */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2.5">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={13} className="text-[#0F5C38]" />
                      <h3 className="text-[8.5pt] font-bold text-[#1E232A]">1.5 Termii Local SMS Verification Engine</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-2 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY
                      </span>
                      <span className="font-mono text-[7.5pt] font-black text-[#1E232A] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                        ₦10,000 Setup + ~₦4 / SMS
                      </span>
                    </div>
                  </div>
                  <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                    <strong className="text-[#0F5C38]">Operational Role:</strong> Local telecommunications SMS pipeline that delivers text messages to Nigerian lines. Used to send security login codes (OTPs) to verify customer phone numbers and send critical alerts to drivers in low-data quarry zones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ================= PAGE 2 ================= */}
        <div className="a4-sheet w-[210mm] h-[296.8mm] p-[13mm_14mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col justify-between">
          <div>
            {/* Section 2: Payment Gateways */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between border-b-2 border-[#B5853B] pb-1 mb-2">
                <h2 className="text-[10pt] font-black uppercase tracking-tight text-[#0F5C38]">
                  SECTION 2: PAYMENT GATEWAY CREDENTIALS (PAYSTACK)
                </h2>
                <span className="text-[7pt] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#0F5C38] border border-[#0F5C38]/20 px-2 py-0.5 rounded-full">
                  SETTLEMENT PIPELINE
                </span>
              </div>

              <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-xl p-2.5">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-[#0F5C38]" />
                    <h3 className="text-[8.5pt] font-bold text-[#1E232A]">2.1 Online Payment Settlement Pipeline</h3>
                  </div>
                  <span className="font-mono text-[7.5pt] font-black text-[#0F5C38] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    ₦0.00 Setup Fee • 1.5% Capped at ₦2,000
                  </span>
                </div>
                <p className="text-[7.5pt] text-[#1E232A] leading-snug mb-1.5">
                  <strong className="text-[#0F5C38]">Operational Purpose:</strong> The secure digital cash register collecting card, USSD, and bank transfer payments online. Paystack automatically caps transaction fees at a maximum limit of ₦2,000 per transaction, protecting business profit margins on large ₦1M+ aggregate and granite supply orders.
                </p>
                <div className="bg-white rounded-lg p-2 border border-[#E2E8F0]">
                  <p className="text-[7pt] font-bold uppercase tracking-wider text-[#64748B] mb-1">
                    Required Configuration Credentials From Client:
                  </p>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[7pt]">
                    <div className="bg-[#F8FAF7] p-1 rounded border border-[#E2E8F0] text-center font-bold text-[#1E232A]">
                      1. Paystack Live Public Key (pk_live_...)
                    </div>
                    <div className="bg-[#F8FAF7] p-1 rounded border border-[#E2E8F0] text-center font-bold text-[#1E232A]">
                      2. Paystack Live Secret Key (sk_live_...)
                    </div>
                    <div className="bg-[#F8FAF7] p-1 rounded border border-[#E2E8F0] text-center font-bold text-[#1E232A]">
                      3. Webhook Setup Access
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Mandatory Intelligence & Communications */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between border-b-2 border-[#B5853B] pb-1 mb-2">
                <h2 className="text-[10pt] font-black uppercase tracking-tight text-[#0F5C38]">
                  SECTION 3: MANDATORY AUTOMATED INTELLIGENCE &amp; NOTIFICATIONS
                </h2>
                <span className="text-[7pt] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#0F5C38] border border-[#0F5C38]/20 px-2 py-0.5 rounded-full">
                  COMMUNICATIONS CORE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 3.1 OpenAI Assistant */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-xl p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1.5">
                        <Bot size={14} className="text-[#0F5C38]" />
                        <h3 className="text-[8.5pt] font-bold text-[#1E232A]">3.1 OpenAI AI Assistant</h3>
                      </div>
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-1.5 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY
                      </span>
                    </div>
                    <p className="font-mono text-[7.5pt] font-bold text-[#0F5C38] mb-1">~$10.00 / mo (~₦15,000)</p>
                    <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                      24/7 intelligent customer assistant embedded in the web and mobile apps to recommend aggregate types (granite sizes, sand grades), quote real-time pricing, and report delivery status (#REQ-XXXX) without human staff intervention.
                    </p>
                  </div>
                </div>

                {/* 3.2 WhatsApp Business API */}
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-xl p-2.5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare size={14} className="text-[#0F5C38]" />
                        <h3 className="text-[8.5pt] font-bold text-[#1E232A]">3.2 WhatsApp Business API</h3>
                      </div>
                      <span className="bg-[#ECFDF5] text-[#0F5C38] text-[6.5pt] font-black px-1.5 py-0.5 rounded-full uppercase border border-[#0F5C38]/20">
                        COMPULSORY
                      </span>
                    </div>
                    <p className="font-mono text-[7.5pt] font-bold text-[#0F5C38] mb-1">~₦10 - ₦13 / msg (1,000 Free)</p>
                    <p className="text-[7.5pt] text-[#1E232A] leading-snug">
                      Automated client communication pipeline delivering digital order receipts, quarry loading status updates, and live driver map tracking links directly to the customer&apos;s personal WhatsApp line.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Mandatory Corporate Documents */}
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#B5853B] pb-1 mb-2">
                <h2 className="text-[10pt] font-black uppercase tracking-tight text-[#0F5C38]">
                  SECTION 4: MANDATORY CORPORATE DOCUMENTS REQUIRED
                </h2>
                <span className="text-[7pt] font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#0F5C38] border border-[#0F5C38]/20 px-2 py-0.5 rounded-full">
                  LEGAL &amp; COMPLIANCE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2 text-[7.5pt]">
                  <strong className="text-[#0F5C38]">1. CAC Certificate of Incorporation (RC):</strong> Legally verifies to Paystack, Apple, and Google that ARS Multiventures Ltd is an officially registered corporate entity.
                </div>
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2 text-[7.5pt]">
                  <strong className="text-[#0F5C38]">2. CAC Status Report / Form CO7:</strong> Formally identifies executive company directors and corporate ownership structures for Anti-Money Laundering (AML) verification.
                </div>
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2 text-[7.5pt]">
                  <strong className="text-[#0F5C38]">3. Corporate Bank Account Details:</strong> Ensures online sales collected via Paystack settle directly into the official ARS Multiventures Ltd commercial bank account.
                </div>
                <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2 text-[7.5pt]">
                  <strong className="text-[#0F5C38]">5. Company Tax ID Number (TIN):</strong> Required by financial settlement gateways for corporate tax compliance verification under federal banking regulations.
                </div>
              </div>

              {/* Dedicated Privacy Shield Box for Item 4 */}
              <div className="bg-[#ECFDF5] border-l-4 border-[#0F5C38] border-y border-r border-[#0F5C38]/20 rounded-lg p-2.5 mb-2">
                <div className="flex items-center gap-1.5 mb-0.5 text-[8pt] font-black uppercase text-[#0F5C38]">
                  <ShieldCheck size={14} className="text-[#0F5C38]" />
                  <span>4. DIRECTOR GOVERNMENT ID + BVN (EXECUTIVE PRIVACY GUARANTEE)</span>
                </div>
                <p className="text-[7.5pt] text-[#1E232A] leading-relaxed">
                  Mandated by Central Bank of Nigeria (CBN) Anti-Money Laundering regulations before live payment collection is activated. <strong>Privacy Guarantee:</strong> To guarantee absolute privacy, you do not need to transmit these credentials to any external party; they can be uploaded directly into Paystack&apos;s encrypted compliance gateway.
                </p>
              </div>

              <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-lg p-2 text-[7.5pt]">
                <strong className="text-[#0F5C38]">6. D-U-N-S® International Identifier:</strong> A free 9-digit international corporate identifier issued by Dun &amp; Bradstreet, required by Apple and Google Play to list and verify mobile applications under the legal entity name ARS Multiventures Ltd.
              </div>
            </div>
          </div>
        </div>
        {/* ================= PAGE 3 ================= */}
        <div className="a4-sheet w-[210mm] h-[296.8mm] p-[13mm_14mm] bg-white mx-auto shadow-2xl print:shadow-none flex flex-col justify-between">
          <div>
            {/* Section 5: Financial Summary */}
            <div className="mb-6">
              <div className="flex items-center justify-between border-b-2 border-[#B5853B] pb-1 mb-3">
                <h2 className="text-[11pt] font-black uppercase tracking-tight text-[#0F5C38]">
                  SECTION 5: FINANCIAL SUMMARY TABLE
                </h2>
                <span className="text-[7.5pt] font-bold uppercase tracking-wider bg-[#F8FAF7] text-[#1E232A] border border-[#E2E8F0] px-2 py-0.5 rounded-full font-mono">
                  BENCHMARK: ~$1 / ₦1,500
                </span>
              </div>

              {/* High-Density Enterprise Table (Zero Totals, Individual Rates Only) */}
              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm mb-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0F5C38] text-white text-[8pt] font-black uppercase tracking-wider">
                      <th className="py-2.5 px-3">Service Item</th>
                      <th className="py-2.5 px-3 text-center">Category / Type</th>
                      <th className="py-2.5 px-3">Cost (USD / NGN)</th>
                      <th className="py-2.5 px-3 text-right">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="text-[8pt] divide-y divide-[#E2E8F0]">
                    <tr className="bg-[#FFFFFF]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Supabase Pro Database Engine</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">$25.00 / mo (~₦37,500)</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">Monthly</td>
                    </tr>
                    <tr className="bg-[#F8FAF7]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Custom Corporate Domain (.com)</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">~$15.00 / yr (~₦22,500)</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">Annual</td>
                    </tr>
                    <tr className="bg-[#FFFFFF]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Apple Developer Program Account (iOS)</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">$99.00 / yr (~₦148,500)</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">Annual</td>
                    </tr>
                    <tr className="bg-[#F8FAF7]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Google Play Console Publisher License</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">$25.00 (~₦37,500)</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">One-Time</td>
                    </tr>
                    <tr className="bg-[#FFFFFF]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Termii Local SMS Setup &amp; Pipeline</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">₦10,000 + ~₦4 / SMS</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">One-Time / Usage</td>
                    </tr>
                    <tr className="bg-[#F8FAF7]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">OpenAI AI Customer Assistant</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">~$10.00 / mo (~₦15,000)</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">Monthly</td>
                    </tr>
                    <tr className="bg-[#FFFFFF]">
                      <td className="py-2.5 px-3 font-bold text-[#1E232A]">Automated WhatsApp Business API</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="bg-[#ECFDF5] text-[#0F5C38] text-[7pt] font-black px-2 py-0.5 rounded-full">COMPULSORY</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F5C38]">~₦10 – ₦13 / delivered msg</td>
                      <td className="py-2.5 px-3 font-mono text-[#64748B] text-right">Per Message</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Implementation Governance Box */}
              <div className="bg-[#F8FAF7] border border-[#E2E8F0] rounded-xl p-4">
                <h3 className="text-[9pt] font-black uppercase tracking-wider text-[#0F5C38] mb-2.5 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#B5853B]" />
                  DEPLOYMENT GOVERNANCE &amp; ARCHITECTURAL INTEGRITY
                </h3>
                <div className="grid grid-cols-2 gap-4 text-[8pt] text-[#1E232A] leading-relaxed">
                  <div className="flex gap-2">
                    <CheckCircle2 size={14} className="text-[#0F5C38] shrink-0 mt-0.5" />
                    <span><strong>Direct Corporate Ownership:</strong> All developer and publisher accounts (Apple Developer Program, Google Play Console, Paystack, Termii) are enrolled directly under ARS Multiventures Ltd to ensure institutional ownership and sovereign control.</span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 size={14} className="text-[#0F5C38] shrink-0 mt-0.5" />
                    <span><strong>Fee Cap Profit Protection:</strong> Online payment settlement via Paystack activates automated transaction fee caps (₦2,000 maximum ceiling), fully insulating business profit margins on commercial aggregate sales.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
