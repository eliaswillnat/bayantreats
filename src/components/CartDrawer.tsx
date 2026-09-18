'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CreditCard, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotalUSD,
    subtotalPHP,
    currency,
    freeShippingThresholdUSD,
    freeShippingRemainingUSD,
    isFreeShipping,
  } = useCart();

  const { user, openAuthModal } = useAuth();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    ((freeShippingThresholdUSD - freeShippingRemainingUSD) / freeShippingThresholdUSD) * 100
  );

  const formattedSubtotal =
    currency === 'USD'
      ? `$${subtotalUSD.toFixed(2)}`
      : `₱${subtotalPHP.toLocaleString()}`;

  const shippingCostUSD = isFreeShipping || items.length === 0 ? 0 : 9.99;
  const shippingCostPHP = isFreeShipping || items.length === 0 ? 0 : 550;

  const totalUSD = subtotalUSD + shippingCostUSD;
  const totalPHP = subtotalPHP + shippingCostPHP;

  const formattedTotal =
    currency === 'USD'
      ? `$${totalUSD.toFixed(2)}`
      : `₱${totalPHP.toLocaleString()}`;

  const handleCheckout = async () => {
    setLoadingCheckout(true);

    try {
      // Call Stripe Checkout API route
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          currency,
          customerEmail: user?.email || 'customer@bayantreats.com',
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // Direct redirect to success in simulated / demo mode
        window.location.href = `/success?session_id=demo_session_${Date.now()}&amount=${totalUSD}`;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      window.location.href = `/success?session_id=demo_session_${Date.now()}&amount=${totalUSD}`;
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E5E5EA] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#F0F0F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1D1D1F] tracking-tight">Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#86868B] font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F5F5F7]/80 border-b border-[#E5E5EA]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShipping ? (
                <span className="font-semibold text-[#0038A8] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />
                  You have qualified for Free Global Air Shipping!
                </span>
              ) : (
                <span className="text-[#86868B]">
                  Add <strong className="text-[#1D1D1F]">${freeShippingRemainingUSD.toFixed(2)}</strong> more for free worldwide air shipping
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-[#E5E5EA] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0038A8] to-[#FCD116] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#F0F0F2]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-4 text-[#86868B]">
                  <CreditCard className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-base font-semibold text-[#1D1D1F]">Your bag is empty</h3>
                <p className="text-xs text-[#86868B] mt-1 max-w-xs">
                  Discover authentic Filipino delicacies, treats, and artisan crafts from our islands.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#0038A8] text-white text-xs font-medium hover:bg-[#002B82] transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const itemPrice =
                  currency === 'USD'
                    ? `$${(product.priceUSD * quantity).toFixed(2)}`
                    : `₱${(product.pricePHP * quantity).toLocaleString()}`;

                return (
                  <div key={product.id} className="py-4 flex gap-4 items-center">
                    {/* Item Image */}
                    <div className="w-18 h-18 rounded-2xl bg-[#F5F5F7] overflow-hidden shrink-0 border border-[#F0F0F2]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#1D1D1F] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#CE1126] font-medium flex items-center gap-1">
                        {product.origin}
                      </p>
                      <p className="text-xs font-bold text-[#1D1D1F] mt-1">
                        {itemPrice}
                      </p>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#E5E5EA] rounded-full px-2 py-0.5 bg-[#F5F5F7]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-[#86868B] hover:text-[#CE1126] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#F0F0F2] bg-[#FAFAFC] space-y-3">
              <div className="space-y-1.5 text-xs text-[#86868B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1D1D1F]">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Global Shipping</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    {isFreeShipping ? (
                      <span className="text-[#0038A8]">FREE</span>
                    ) : currency === 'USD' ? (
                      '$9.99'
                    ) : (
                      '₱550'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1D1D1F] pt-2 border-t border-[#E5E5EA]">
                  <span>Total</span>
                  <span className="text-[#0038A8]">{formattedTotal}</span>
                </div>
              </div>

              {/* Stripe Checkout Action Button */}
              <button
                onClick={handleCheckout}
                disabled={loadingCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-75"
              >
                {loadingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Secure Stripe Checkout...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay with Stripe • {formattedTotal}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#86868B] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0038A8]" />
                <span>256-bit SSL Encrypted • Powered by Stripe</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
