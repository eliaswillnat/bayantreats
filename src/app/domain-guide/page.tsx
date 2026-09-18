'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Check, Copy, Terminal, Shield, Sparkles, ExternalLink } from 'lucide-react';

export default function DomainGuidePage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      {/* Header */}
      <header className="border-b border-[#E5E5EA] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1D1D1F] hover:text-[#0038A8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0038A8]" />
            <span className="text-xs font-semibold text-[#1D1D1F]">bayantreats.com Setup Guide</span>
          </div>
        </div>
      </header>

      {/* Main Guide Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FF] text-[#0038A8] text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Custom Domain & Firebase Hosting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            Connecting <span className="text-[#0038A8]">bayantreats.com</span> to Firebase
          </h1>
          <p className="text-sm text-[#86868B] mt-2">
            Follow this simple step-by-step checklist to connect your purchased domain and deploy your store live.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          
          {/* Step 1: Firebase Console Custom Domain */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#E5E5EA] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0038A8] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Add Custom Domain in Firebase Console</h3>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed mb-4">
              Go to your Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-[#0038A8] underline inline-flex items-center gap-0.5">Firebase Console <ExternalLink className="w-3 h-3" /></a>, select <strong>Hosting</strong> from the sidebar, and click <strong>Add custom domain</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-white border border-[#E5E5EA] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#1D1D1F]">Domain to enter:</span>
                <span className="font-mono font-bold text-[#0038A8]">bayantreats.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#1D1D1F]">Also redirect www:</span>
                <span className="text-[#86868B]">Checked (www.bayantreats.com → bayantreats.com)</span>
              </div>
            </div>
          </div>

          {/* Step 2: DNS Records */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#E5E5EA] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#CE1126] text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Add DNS Records in Your Domain Registrar</h3>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed mb-4">
              In the DNS management settings where you purchased <strong>bayantreats.com</strong> (e.g. Namecheap, GoDaddy, Cloudflare, Google Domains), add the two Firebase Hosting <strong>A Records</strong>:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs bg-white rounded-2xl border border-[#E5E5EA] overflow-hidden">
                <thead className="bg-[#F5F5F7] text-[#1D1D1F] border-b border-[#E5E5EA]">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Host / Name</th>
                    <th className="p-3">Value / IP Address</th>
                    <th className="p-3">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F2] font-mono">
                  <tr>
                    <td className="p-3 font-bold text-[#0038A8]">A</td>
                    <td className="p-3">@</td>
                    <td className="p-3 font-semibold text-[#1D1D1F]">199.36.158.100</td>
                    <td className="p-3 text-[#86868B]">Automatic / 3600</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#0038A8]">A</td>
                    <td className="p-3">@</td>
                    <td className="p-3 font-semibold text-[#1D1D1F]">199.36.158.95</td>
                    <td className="p-3 text-[#86868B]">Automatic / 3600</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 3: Deploy via CLI */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#E5E5EA] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#E5B800] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Deploy from Your MacBook Terminal</h3>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed mb-4">
              Run this single command inside the project directory to build and deploy everything straight to Firebase Hosting:
            </p>

            <div className="relative p-4 rounded-2xl bg-[#1D1D1F] text-white font-mono text-xs">
              <button
                onClick={() =>
                  copyToClipboard(
                    'npm run build && npx firebase deploy --only hosting',
                    'deploy'
                  )
                }
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Copy Command"
              >
                {copiedSection === 'deploy' ? (
                  <Check className="w-4 h-4 text-[#FCD116]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <code>npm run build && npx firebase deploy --only hosting</code>
            </div>
          </div>

          {/* Step 4: Stripe Live Keys */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFAFC] border border-[#E5E5EA] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="text-lg font-bold text-[#1D1D1F]">Stripe Production Keys (.env.local)</h3>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed mb-4">
              To accept live credit cards, Apple Pay, and Google Pay with Stripe, add your Stripe API keys into <code className="bg-[#E5E5EA] px-1.5 py-0.5 rounded text-[11px]">.env.local</code>:
            </p>

            <div className="p-4 rounded-2xl bg-[#1D1D1F] text-white font-mono text-xs space-y-1">
              <p className="text-[#86868B]"># Stripe API Credentials</p>
              <p>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key</p>
              <p>STRIPE_SECRET_KEY=sk_live_your_secret_key</p>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-semibold shadow-md transition-all"
          >
            <span>Return to Bayan Treats Boutique</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
