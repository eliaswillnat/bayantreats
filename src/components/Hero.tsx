'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Plane, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#F0F0F2]">
      {/* Subtle Apple-style radial gradient in background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-[#EBF2FF] via-[#FFFBEB] to-[#FEF2F2] blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Flag Color Accent Micro-Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5EA] shadow-2xs mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <div className="flex items-center -space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0038A8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#CE1126]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FCD116]" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-[#1D1D1F] uppercase font-mono">
            Handcrafted in the Philippines
          </span>
          <span className="text-[#86868B]">•</span>
          <span className="text-[11px] text-[#0038A8] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Curated Artisanal Goods
          </span>
        </div>

        {/* Hero Apple-style Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1D1D1F] max-w-4xl mx-auto leading-[1.08]">
          The timeless flavors of our archipelago.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#86868B] max-w-2xl mx-auto font-normal leading-relaxed">
          From sun-ripened Cebu Carabao mangoes and misty Baguio Ube Halaya to wild Batangas Barako coffee beans and rare Bohol mineral salt. Pure, authentic, and delivered globally.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5">
          {/* Primary CTA with Philippine Flag Blue */}
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-sm font-medium tracking-tight shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA with subtle Philippine Flag Red outline */}
          <a
            href="#heritage"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-sm font-medium transition-all"
          >
            <span>Our Regional Story</span>
          </a>
        </div>

        {/* 3 Pillar Minimalist Badges */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto pt-8 border-t border-[#F0F0F2]">
          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#EBF2FF] text-[#0038A8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1D1D1F]">100% Origin Verified</p>
              <p className="text-[11px] text-[#86868B]">Single-origin farms & convent recipes</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#FEF2F2] text-[#CE1126] flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1D1D1F]">Express Global Shipping</p>
              <p className="text-[11px] text-[#86868B]">Air-freighted fresh in vacuum packs</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#FFFBEB] text-[#E5B800] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1D1D1F]">Direct Artisan Fair Pay</p>
              <p className="text-[11px] text-[#86868B]">Empowering Filipino local craft families</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
