'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Search, User as UserIcon, Plus, Globe, Sparkles, LogOut } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenAdminModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminModal, searchQuery, setSearchQuery }) => {
  const { totalItems, openCart, currency, setCurrency } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full apple-glass border-b border-[#E5E5EA] transition-all duration-300">
      {/* Top micro-announcement banner */}
      <div className="bg-[#1D1D1F] text-white text-[11px] font-medium tracking-wide py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FCD116] animate-pulse" />
        <span>Authentic Philippine Heritage Goods & Delicacies</span>
        <span className="text-[#86868B] hidden sm:inline">•</span>
        <span className="text-white/80 hidden sm:inline">Complimentary global air shipping on orders over $65</span>
        <Link href="/domain-guide" className="underline text-[#FCD116] ml-2 hover:opacity-80 transition-opacity">
          bayantreats.com Live Setup
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#E5E5EA] shadow-xs group-hover:border-[#0038A8] transition-colors">
            {/* Minimalist 3 Stars & Sun Icon */}
            <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
              <circle cx="16" cy="16" r="4.5" fill="#FCD116" />
              {/* Sun rays */}
              <line x1="16" y1="6" x2="16" y2="9" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="23" x2="16" y2="26" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6" y1="16" x2="9" y2="16" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="23" y1="16" x2="26" y2="16" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              {/* Diagonal rays */}
              <line x1="9" y1="9" x2="11" y2="11" stroke="#FCD116" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="21" y1="21" x2="23" y2="23" stroke="#FCD116" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="21" y1="11" x2="23" y2="9" stroke="#FCD116" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="9" y1="21" x2="11" y2="23" stroke="#FCD116" strokeWidth="1.2" strokeLinecap="round" />
              {/* Three minimalist stars */}
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#0038A8" transform="scale(0.55) translate(13, 0)" />
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#CE1126" transform="scale(0.55) translate(3, 30)" />
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#FCD116" transform="scale(0.55) translate(25, 30)" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-[#1D1D1F] leading-tight flex items-center gap-1">
              Bayan Treats
            </span>
            <span className="text-[10px] tracking-widest text-[#86868B] uppercase font-mono">
              Philippines Direct
            </span>
          </div>
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Cebu mangoes, Barako coffee, Ube, Inabel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F5F5F7] hover:bg-[#EBEBEF] focus:bg-white text-[#1D1D1F] placeholder-[#86868B] rounded-full border border-transparent focus:border-[#0038A8] focus:outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#86868B] hover:text-[#1D1D1F]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'PHP' : 'USD')}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] rounded-full transition-colors"
            title="Toggle Currency"
          >
            <Globe className="w-3.5 h-3.5 text-[#86868B]" />
            <span>{currency === 'USD' ? '$ USD' : '₱ PHP'}</span>
          </button>

          {/* Quick Add Product for Admin */}
          <button
            onClick={onOpenAdminModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0038A8] bg-[#EBF2FF] hover:bg-[#D9E7FF] rounded-full transition-colors"
            title="Add New Filipino Product"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          {/* User Auth Profile / Login */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 p-1 pr-2 rounded-full border border-[#E5E5EA] hover:border-[#0038A8] bg-white transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#0038A8] text-white text-[11px] font-medium flex items-center justify-center">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-medium text-[#1D1D1F] hidden sm:inline max-w-[80px] truncate">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E5E5EA] py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-[#F5F5F7]">
                      <p className="text-xs font-semibold text-[#1D1D1F] truncate">{user.displayName}</p>
                      <p className="text-[11px] text-[#86868B] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full bg-[#EBF2FF] text-[#0038A8] font-medium uppercase">
                        {user.provider} Auth
                      </span>
                    </div>
                    <Link
                      href="/domain-guide"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#0038A8]" />
                      Domain & Hosting Config
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#CE1126] hover:bg-[#FEF2F2] transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#1D1D1F] bg-white border border-[#E5E5EA] hover:border-[#1D1D1F] rounded-full transition-all shadow-2xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#86868B]" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Shopping Bag Button (Apple Minimalist Style with PH Blue Badge) */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-full text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#1D1D1F]" strokeWidth={1.75} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#0038A8] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Philippine treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F5F5F7] text-[#1D1D1F] placeholder-[#86868B] rounded-full border border-transparent focus:border-[#0038A8] focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};
