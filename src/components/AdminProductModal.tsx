'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { X, Plus, Sparkles, Upload, Check } from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({ isOpen, onClose }) => {
  const { addProduct } = useCart();
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [priceUSD, setPriceUSD] = useState('12.00');
  const [origin, setOrigin] = useState('Cebu, Central Visayas');
  const [category, setCategory] = useState<'snacks' | 'coffee' | 'sweets' | 'artisan' | 'pantry'>('snacks');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=1000&q=80');
  const [ingredients, setIngredients] = useState('');
  const [netWeight, setNetWeight] = useState('250g');
  const [heritageStory, setHeritageStory] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usd = parseFloat(priceUSD) || 10;
    const newProduct: Product = {
      id: 'custom-' + Date.now(),
      name,
      tagline,
      description,
      priceUSD: usd,
      pricePHP: Math.round(usd * 56.5),
      category,
      categoryLabel:
        category === 'snacks'
          ? 'Snacks & Bites'
          : category === 'sweets'
          ? 'Sweets & Ube'
          : category === 'coffee'
          ? 'Kapeng Barako & Tea'
          : category === 'artisan'
          ? 'Artisan & Lifestyle'
          : 'Pantry Essentials',
      origin,
      images: [imageUrl],
      rating: 5.0,
      reviewsCount: 1,
      stock: 50,
      ingredients: ingredients.split(',').map((s) => s.trim()).filter(Boolean),
      netWeight,
      heritageStory,
      featured: true,
    };

    addProduct(newProduct);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-md animate-in fade-in" />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5E5EA] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FF] text-[#0038A8] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FCD116]" />
            Direct Merchant Catalog Uploader
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F]">Add Authentic Philippine Product</h3>
          <p className="text-xs text-[#86868B] mt-0.5">
            Publishes live directly into the catalog for instant browsing on your MacBook.
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EBF2FF] text-[#0038A8] mx-auto flex items-center justify-center mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-[#1D1D1F]">Product Published Successfully!</h4>
            <p className="text-xs text-[#86868B] mt-1">Live in your store catalog now.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Davao Dark Cacao Tablea"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
                >
                  <option value="snacks">Snacks & Bites</option>
                  <option value="sweets">Sweets & Ube</option>
                  <option value="coffee">Kapeng Barako & Tea</option>
                  <option value="artisan">Artisan & Lifestyle</option>
                  <option value="pantry">Pantry Essentials</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={priceUSD}
                  onChange={(e) => setPriceUSD(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Origin (Province/City)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Davao City, Mindanao"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Net Weight / Size</label>
                <input
                  type="text"
                  placeholder="e.g. 250g (8.8 oz)"
                  value={netWeight}
                  onChange={(e) => setNetWeight(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Short Tagline</label>
              <input
                type="text"
                required
                placeholder="e.g. 100% Single-Estate Criollo cacao roasted over wood fire"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Image URL (Unsplash or Firebase Storage)</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Full Description</label>
              <textarea
                rows={3}
                required
                placeholder="Detailed description of the product flavor profile, heritage craft, or usage..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Ingredients (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Pure Fermented Cacao Nibs, Organic Muscovado Sugar"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1D1D1F] mb-1">Cultural Heritage Story (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Hand-rolled by 3rd-generation chocolatiers in the foothills of Mount Apo."
                value={heritageStory}
                onChange={(e) => setHeritageStory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#F5F5F7] rounded-xl border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-semibold tracking-tight shadow-md transition-all active:scale-98"
            >
              Publish to Bayan Treats Store
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
