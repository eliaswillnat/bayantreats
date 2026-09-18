'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Plus, Check, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, currency, openProductModal } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formattedPrice =
    currency === 'USD'
      ? `$${product.priceUSD.toFixed(2)}`
      : `₱${product.pricePHP.toLocaleString()}`;

  const secondaryPrice =
    currency === 'USD'
      ? `₱${product.pricePHP.toLocaleString()}`
      : `$${product.priceUSD.toFixed(2)}`;

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative flex flex-col bg-white rounded-3xl p-4 border border-[#F0F0F2] hover:border-[#D2D2D7] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Badges */}
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
        {/* Origin Badge with Philippine Red accent */}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/90 backdrop-blur-md text-[#1D1D1F] border border-black/5 shadow-2xs">
          <MapPin className="w-3 h-3 text-[#CE1126]" />
          <span>{product.origin}</span>
        </span>

        {product.bestseller && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#CE1126] text-white tracking-wide uppercase shadow-2xs">
            Bestseller
          </span>
        )}
      </div>

      {/* Product Image Area */}
      <div className="relative w-full aspect-square rounded-2xl bg-[#F5F5F7] overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick Add Overlay on desktop hover */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 p-3 rounded-full transition-all duration-200 shadow-md ${
            isAdded
              ? 'bg-[#0038A8] text-white scale-110'
              : 'bg-white/95 text-[#1D1D1F] hover:bg-[#0038A8] hover:text-white backdrop-blur-md'
          }`}
          title="Quick Add to Bag"
        >
          {isAdded ? (
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center text-[#FCD116]">
            <Star className="w-3.5 h-3.5 fill-[#FCD116]" />
          </div>
          <span className="text-xs font-semibold text-[#1D1D1F]">{product.rating}</span>
          <span className="text-[11px] text-[#86868B]">({product.reviewsCount})</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm sm:text-base font-semibold text-[#1D1D1F] group-hover:text-[#0038A8] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-[#86868B] line-clamp-2 mt-1 mb-3 flex-1 font-normal leading-relaxed">
          {product.tagline}
        </p>

        {/* Pricing & CTA footer */}
        <div className="pt-3 border-t border-[#F5F5F7] flex items-center justify-between mt-auto">
          <div>
            <span className="text-base font-bold text-[#1D1D1F]">{formattedPrice}</span>
            <span className="text-[11px] text-[#86868B] ml-1.5">({secondaryPrice})</span>
          </div>

          <span className="text-xs font-medium text-[#0038A8] group-hover:underline flex items-center gap-0.5">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
};
