'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    openAuthModal,
    loginWithGoogle,
    loginWithApple,
    loginWithEmail,
    signUpWithEmail,
    loginDemo,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (authMode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E5E5EA] p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white border border-[#E5E5EA] shadow-xs flex items-center justify-center">
            {/* Minimalist 3-star and sun logo */}
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <circle cx="16" cy="16" r="5" fill="#FCD116" />
              <line x1="16" y1="5" x2="16" y2="8" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="24" x2="16" y2="27" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="16" x2="8" y2="16" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="24" y1="16" x2="27" y2="16" stroke="#FCD116" strokeWidth="1.5" strokeLinecap="round" />
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#0038A8" transform="scale(0.6) translate(11, 0)" />
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#CE1126" transform="scale(0.6) translate(1, 28)" />
              <polygon points="16,3 16.6,4.6 18.2,4.6 17,5.5 17.5,7 16,6.1 14.5,7 15,5.5 13.8,4.6 15.4,4.6" fill="#FCD116" transform="scale(0.6) translate(23, 28)" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
            {authMode === 'signin' ? 'Welcome to Bayan Treats' : 'Create your Account'}
          </h3>
          <p className="text-xs text-[#86868B] mt-1">
            Access curated Philippine treats, track parcels, and enjoy member rewards.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#F5F5F7] p-1 rounded-full mb-6">
          <button
            onClick={() => openAuthModal('signin')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
              authMode === 'signin'
                ? 'bg-white text-[#1D1D1F] shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
              authMode === 'signup'
                ? 'bg-white text-[#1D1D1F] shadow-xs'
                : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-[#FEF2F2] border border-[#CE1126]/20 text-[#CE1126] text-xs">
            {error}
          </div>
        )}

        {/* Social Authentication Buttons */}
        <div className="space-y-2.5 mb-6">
          {/* Continue with Apple */}
          <button
            onClick={loginWithApple}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold tracking-tight transition-all active:scale-98 shadow-xs"
          >
            <svg viewBox="0 0 170 170" width="16" height="16" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.35.22-10.27-1.89-14.76-6.35-3.69-3.59-7.64-8.71-11.85-15.35-5.9-9.37-10.45-19.78-13.65-31.23-3.2-11.45-4.81-22.18-4.81-32.2 0-14.73 3.63-26.68 10.9-35.85 7.27-9.17 16.32-13.88 27.16-14.13 5.46 0 11.07 1.41 16.83 4.23 5.76 2.82 9.69 4.34 11.78 4.56 1.74-.22 5.88-1.74 12.43-4.56 6.55-2.82 12.09-4.02 16.62-3.6 12.33.98 22.09 5.88 29.28 14.7-10.68 6.42-15.91 15.24-15.7 26.47.22 8.71 3.53 16.11 9.94 22.21 6.42 6.1 14.16 9.47 23.23 10.12-1.96 5.88-4.36 11.65-7.21 17.32zM119.22 31.05c0-7.18 2.56-13.83 7.68-19.94 5.12-6.11 11.55-9.8 19.29-11.11.22 1.09.33 2.07.33 2.94 0 7.18-2.67 14-8.01 20.46-5.34 6.46-11.97 10.24-19.89 11.34.22-1.09.6-2.32.6-3.69z" />
            </svg>
            <span>Continue with Apple</span>
          </button>

          {/* Continue with Google */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5EA] text-xs font-semibold tracking-tight transition-all active:scale-98 shadow-2xs"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.8 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-[#E5E5EA] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#86868B] uppercase tracking-wider font-medium absolute">
            or with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {authMode === 'signup' && (
            <div className="relative">
              <User className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Full Name (e.g., Maria Santos)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5F5F7] focus:bg-white text-[#1D1D1F] rounded-xl border border-transparent focus:border-[#0038A8] focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5F5F7] focus:bg-white text-[#1D1D1F] rounded-xl border border-transparent focus:border-[#0038A8] focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F5F5F7] focus:bg-white text-[#1D1D1F] rounded-xl border border-transparent focus:border-[#0038A8] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0038A8] hover:bg-[#002B82] text-white text-xs font-semibold tracking-tight shadow-md transition-all active:scale-98 disabled:opacity-50 mt-2"
          >
            <span>{authMode === 'signin' ? 'Sign In to Account' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Test Logins for easy MacBook testing */}
        <div className="mt-6 pt-4 border-t border-[#F0F0F2] text-center">
          <p className="text-[11px] text-[#86868B] mb-2 font-medium">Quick 1-Click Demo Profiles (MacBook Testing):</p>
          <div className="flex justify-center gap-1.5 flex-wrap">
            <button
              onClick={() => loginDemo('google')}
              className="px-2.5 py-1 text-[10px] bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] rounded-full transition-colors"
            >
              Demo Google User
            </button>
            <button
              onClick={() => loginDemo('apple')}
              className="px-2.5 py-1 text-[10px] bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] rounded-full transition-colors"
            >
              Demo Apple ID
            </button>
            <button
              onClick={() => loginDemo('password')}
              className="px-2.5 py-1 text-[10px] bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] rounded-full transition-colors"
            >
              Demo Elias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
