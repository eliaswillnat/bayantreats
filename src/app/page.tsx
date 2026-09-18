'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { ProvenanceSection } from '@/components/ProvenanceSection';
import { Footer } from '@/components/Footer';
import { AdminProductModal } from '@/components/AdminProductModal';
import { useCart } from '@/context/CartContext';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';

export default function HomePage() {
  const { products } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sleek Frosted Header */}
      <Navbar
        onOpenAdminModal={() => setIsAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Main Catalog Area */}
      <main ref={catalogRef} className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Controls Bar: Category Pills + Sorter */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                {selectedCategory === 'all'
                  ? 'All Archipelagic Curations'
                  : selectedCategory === 'snacks'
                  ? 'Snacks & Tropical Bites'
                  : selectedCategory === 'sweets'
                  ? 'Ube & Heritage Sweets'
                  : selectedCategory === 'coffee'
                  ? 'Kapeng Barako & Mountain Roasts'
                  : selectedCategory === 'artisan'
                  ? 'Handwoven Inabel & Pearls'
                  : 'Pantry & Artisanal Salts'}
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1">
                Showing {filteredProducts.length} authentic Philippine goods
              </p>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-[#86868B] font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] font-medium py-2 px-3 rounded-full border border-transparent focus:border-[#0038A8] focus:outline-none cursor-pointer transition-colors"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Top Rated (5★)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#F5F5F7]/50 rounded-3xl border border-dashed border-[#D2D2D7] p-8">
            <Sparkles className="w-10 h-10 text-[#86868B] mx-auto mb-3 opacity-50" />
            <h3 className="text-base font-semibold text-[#1D1D1F]">No treasures found</h3>
            <p className="text-xs text-[#86868B] mt-1 max-w-sm mx-auto">
              We couldn't find any products matching "{searchQuery}". Try selecting another category or clear your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#0038A8] text-white text-xs font-medium hover:bg-[#002B82] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Regional Provenance Section */}
      <ProvenanceSection />

      {/* Apple-style Minimalist Newsletter Box with Flag Accents */}
      <section className="bg-white py-16 px-4 border-t border-[#F0F0F2]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2FF] text-[#0038A8] text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#CE1126]" />
            <span>Join the Bayan Treats Fellowship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
            First access to rare harvest drops & artisan batches.
          </h2>
          <p className="text-xs sm:text-sm text-[#86868B] mt-2 max-w-md mx-auto leading-relaxed">
            Receive seasonal alerts for limited-edition Davao single-estate cacao, Baguio wild strawberry jams, and custom Inabel textiles.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Maraming salamat! You are now subscribed to Bayan Treats updates.');
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 text-xs bg-[#F5F5F7] text-[#1D1D1F] placeholder-[#86868B] rounded-full border border-transparent focus:border-[#0038A8] focus:bg-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-semibold tracking-tight shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Admin Add Product Modal */}
      <AdminProductModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
