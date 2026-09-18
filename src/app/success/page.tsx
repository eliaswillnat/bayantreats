'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Package, ArrowRight, ShieldCheck, MapPin, Sparkles, Home } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || 'cs_test_' + Math.random().toString(36).substring(2, 9);
  const amount = searchParams.get('amount') || '68.00';
  const { clearCart } = useCart();

  useEffect(() => {
    // Fire festive Philippine confetti (Blue, Red, Gold, White)
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0038A8', '#CE1126', '#FCD116', '#FFFFFF'],
    });

    // Clear cart once order is confirmed
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col justify-between">
      {/* Top Simple Header */}
      <header className="bg-white border-b border-[#E5E5EA] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCD116]" />
            </div>
            <span className="font-semibold text-sm text-[#1D1D1F]">Bayan Treats</span>
          </Link>
          <span className="text-xs text-[#86868B]">Order Confirmation</span>
        </div>
      </header>

      {/* Main Confirmation Content */}
      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-16 w-full text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E5EA] shadow-xl text-center relative overflow-hidden">
          {/* Top subtle flag color accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0038A8] via-[#CE1126] to-[#FCD116]" />

          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-[#EBF2FF] text-[#0038A8] mx-auto flex items-center justify-center mb-6 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-[#0038A8]" />
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0038A8] font-semibold block mb-1">
            Maraming Salamat!
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
            Your Philippine Treats are on the Way
          </h1>

          <p className="text-xs sm:text-sm text-[#86868B] mt-2 max-w-md mx-auto leading-relaxed">
            We have received your order and payment via Stripe. Our artisans in the Philippines are carefully packing your parcel with love and freshness.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 p-5 rounded-2xl bg-[#F5F5F7] text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-[#E5E5EA]">
              <span className="text-[#86868B]">Order Reference:</span>
              <span className="font-mono font-semibold text-[#1D1D1F]">{sessionId}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[#E5E5EA]">
              <span className="text-[#86868B]">Payment Method:</span>
              <span className="font-medium text-[#1D1D1F] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0038A8]" />
                Stripe Verified Payment
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-[#E5E5EA]">
              <span className="text-[#86868B]">Estimated Global Air Delivery:</span>
              <span className="font-semibold text-[#0038A8]">3–5 Business Days (Express)</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-[#1D1D1F] pt-1">
              <span>Amount Paid:</span>
              <span className="text-[#0038A8]">${amount}</span>
            </div>
          </div>

          {/* Shipping Tracker Preview */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FCD116]/30 text-left flex items-start gap-3">
            <Package className="w-5 h-5 text-[#E5B800] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-[#1D1D1F] block">Dispatch from Manila International Airport:</span>
              <span className="text-[#86868B]">A tracking number and air waybill will be emailed to you as soon as customs clears the shipment.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-semibold shadow-md transition-all active:scale-98"
            >
              <Home className="w-4 h-4" />
              <span>Back to Bayan Treats Store</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#86868B] border-t border-[#E5E5EA] bg-white">
        <p>© {new Date().getFullYear()} Bayan Treats (bayantreats.com) • Authenticity Guaranteed</p>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-[#86868B]">Loading receipt...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
