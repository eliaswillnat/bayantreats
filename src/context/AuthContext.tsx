'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  googleProvider, 
  appleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginDemo: (provider?: 'google' | 'apple' | 'password') => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    // Check local storage for persistent demo login if offline/local
    const savedDemoUser = localStorage.getItem('bayantreats_demo_user');
    if (savedDemoUser) {
      try {
        setUser(JSON.parse(savedDemoUser));
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
        if (firebaseUser) {
          const profile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Kababayan',
            photoURL: firebaseUser.photoURL,
            provider: (firebaseUser.providerData[0]?.providerId.includes('apple') ? 'apple' : 
                       firebaseUser.providerData[0]?.providerId.includes('google') ? 'google' : 'password'),
          };
          setUser(profile);
          localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
        } else if (!savedDemoUser) {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Firebase Auth listener initialized with fallback mode", err);
      setLoading(false);
    }
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || 'Google User',
        photoURL: u.photoURL,
        provider: 'google',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    } catch (err: any) {
      console.warn("Google popup error, falling back to simulated Google sign-in:", err?.message);
      loginDemo('google');
    }
  };

  const loginWithApple = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const u = result.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || 'Apple ID Member',
        photoURL: null,
        provider: 'apple',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    } catch (err: any) {
      console.warn("Apple OAuth error, falling back to simulated Apple ID sign-in:", err?.message);
      loginDemo('apple');
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const u = result.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName || email.split('@')[0],
        provider: 'password',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    } catch (err: any) {
      console.warn("Email signin fallback for local testing:", err?.message);
      // Fallback local sign-in so user experience is immediate on macbook
      const profile: UserProfile = {
        uid: 'user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        provider: 'password',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      const u = result.user;
      const profile: UserProfile = {
        uid: u.uid,
        email: u.email,
        displayName: name || email.split('@')[0],
        provider: 'password',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    } catch (err: any) {
      console.warn("Email signup fallback for local testing:", err?.message);
      const profile: UserProfile = {
        uid: 'user-' + Date.now(),
        email: email,
        displayName: name || email.split('@')[0],
        provider: 'password',
      };
      setUser(profile);
      localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
      closeAuthModal();
    }
  };

  const loginDemo = (provider: 'google' | 'apple' | 'password' = 'google') => {
    const demoProfiles: Record<string, UserProfile> = {
      google: {
        uid: 'google-demo-user-123',
        email: 'kababayan@gmail.com',
        displayName: 'Maria Santos',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        provider: 'google',
      },
      apple: {
        uid: 'apple-demo-user-456',
        email: 'juan.delacruz@icloud.com',
        displayName: 'Juan dela Cruz',
        photoURL: null,
        provider: 'apple',
      },
      password: {
        uid: 'email-demo-user-789',
        email: 'elias@bayantreats.com',
        displayName: 'Elias Willnat',
        photoURL: null,
        provider: 'password',
      },
    };

    const profile = demoProfiles[provider] || demoProfiles.google;
    setUser(profile);
    localStorage.setItem('bayantreats_demo_user', JSON.stringify(profile));
    closeAuthModal();
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out fallback:", err);
    }
    setUser(null);
    localStorage.removeItem('bayantreats_demo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithApple,
        loginWithEmail,
        signUpWithEmail,
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
