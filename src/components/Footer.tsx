'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Globe, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5EA] text-[#86868B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#FCD116]" />
              </div>
              <span className="font-semibold text-sm text-[#1D1D1F]">Bayan Treats</span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Ultra-minimal Philippine artisanal goods, heirloom pantry staples, and beloved delicacies delivered worldwide from <strong>bayantreats.com</strong>.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#1D1D1F]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#0038A8]" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#CE1126]" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#FCD116]" />
              <span className="ml-1 font-mono text-[10px] text-[#86868B]">Mabuhay Pilipinas</span>
            </div>
          </div>

          {/* Curations */}
          <div>
            <h4 className="font-semibold text-[#1D1D1F] text-xs mb-3 uppercase tracking-wider">Curations</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Cebu Carabao Mangoes</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Batangas Kapeng Barako</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Good Shepherd Mountain Ube</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Ilocano Inabel Blankets</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Palawan South Sea Pearls</span></li>
            </ul>
          </div>

          {/* Platform & Integrations */}
          <div>
            <h4 className="font-semibold text-[#1D1D1F] text-xs mb-3 uppercase tracking-wider">Technology Stack</h4>
            <ul className="space-y-2">
              <li><span className="text-[#1D1D1F] font-medium">Stripe Payments</span> (256-bit SSL)</li>
              <li><span className="text-[#1D1D1F] font-medium">Firebase Auth</span> (Google/Apple/Email)</li>
              <li><span className="text-[#1D1D1F] font-medium">Firebase Firestore & Storage</span></li>
              <li><span className="text-[#1D1D1F] font-medium">Next.js 15 & React 19</span></li>
              <li><span className="text-[#1D1D1F] font-medium">GitHub CI/CD Ready</span></li>
            </ul>
          </div>

          {/* Domain & Hosting Setup */}
          <div>
            <h4 className="font-semibold text-[#1D1D1F] text-xs mb-3 uppercase tracking-wider">Deployment & Setup</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/domain-guide" className="text-[#0038A8] hover:underline font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />
                  <span>bayantreats.com Domain Setup</span>
                </Link>
              </li>
              <li><span className="hover:text-[#1D1D1F] transition-colors">Firebase Hosting Config</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors">Stripe Webhook Listener</span></li>
              <li><span className="hover:text-[#1D1D1F] transition-colors">Global CDN Edge Delivery</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Credits */}
        <div className="pt-8 border-t border-[#F0F0F2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#86868B]">
            © {new Date().getFullYear()} Bayan Treats Inc. (bayantreats.com). Handcrafted with care.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/domain-guide" className="hover:text-[#0038A8] transition-colors">
              Domain Settings
            </Link>
            <span>•</span>
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#1D1D1F] transition-colors cursor-pointer">Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
