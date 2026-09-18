'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, MapPin, ShieldCheck, Truck, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, closeProductModal, addToCart, currency } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeProductModal();
    }, 800);
  };

  const formattedPrice =
    currency === 'USD'
      ? `$${(selectedProduct.priceUSD * quantity).toFixed(2)}`
      : `₱${(selectedProduct.pricePHP * quantity).toLocaleString()}`;

  const unitPrice =
    currency === 'USD'
      ? `$${selectedProduct.priceUSD.toFixed(2)}`
      : `₱${selectedProduct.pricePHP.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={closeProductModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E5E5EA] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1D1D1F] backdrop-blur-md border border-black/5 shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photography Gallery */}
        <div className="w-full md:w-1/2 bg-[#F5F5F7] p-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xs">
            <img
              src={selectedProduct.images[selectedImageIndex] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails if multiple images */}
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#0038A8] scale-105 shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col justify-between">
          <div>
            {/* Origin & Category Pill */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#CE1126] border border-[#CE1126]/10">
                <MapPin className="w-3 h-3" />
                {selectedProduct.origin}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F7] text-[#1D1D1F]">
                {selectedProduct.categoryLabel}
              </span>
              {selectedProduct.netWeight && (
                <span className="text-xs text-[#86868B]">{selectedProduct.netWeight}</span>
              )}
            </div>

            {/* Title & Tagline */}
            <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
              {selectedProduct.name}
            </h2>
            <p className="text-sm text-[#86868B] mt-1 font-normal leading-relaxed">
              {selectedProduct.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 my-4">
              <div className="flex items-center text-[#FCD116]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FCD116] text-[#FCD116]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1D1D1F]">{selectedProduct.rating}</span>
              <span className="text-xs text-[#86868B]">({selectedProduct.reviewsCount} customer reviews)</span>
            </div>

            {/* Price Tag */}
            <div className="mb-6 p-4 rounded-2xl bg-[#F5F5F7] flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-[#1D1D1F]">{formattedPrice}</span>
                <span className="text-xs text-[#86868B] ml-2">({unitPrice} / unit)</span>
              </div>
              <span className="text-xs font-medium text-[#0038A8] bg-[#EBF2FF] px-2.5 py-1 rounded-full">
                In Stock ({selectedProduct.stock} available)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4 text-sm text-[#1D1D1F]/90 leading-relaxed">
              <p>{selectedProduct.description}</p>

              {/* Heritage Story Box */}
              {selectedProduct.heritageStory && (
                <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FCD116]/30 text-xs text-[#1D1D1F] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#E5B800] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#1D1D1F]">Cultural Provenance:</span>
                    <span>{selectedProduct.heritageStory}</span>
                  </div>
                </div>
              )}

              {/* Ingredients / Materials */}
              {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                    Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.materials && selectedProduct.materials.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                    Materials & Specs
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Controls: Quantity & Add to Bag */}
          <div className="pt-6 mt-6 border-t border-[#F0F0F2] flex flex-col sm:flex-row items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-[#E5E5EA] rounded-full px-3 py-1.5 w-full sm:w-auto bg-[#F5F5F7]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-[#0038A8] transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold px-4 min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-[#0038A8] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Main CTA Button with Philippine Blue */}
            <button
              onClick={handleAdd}
              className={`flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-medium transition-all shadow-md ${
                isAdded
                  ? 'bg-[#0038A8] text-white'
                  : 'bg-[#0038A8] hover:bg-[#002B82] text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isAdded ? 'Added to Bag!' : `Add to Bag • ${formattedPrice}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
