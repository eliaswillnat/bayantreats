import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { ProductModal } from '@/components/ProductModal';

export const metadata: Metadata = {
  title: 'Bayan Treats — Authentic Philippine Goods & Delicacies',
  description:
    'An ultra-minimalist e-commerce boutique for authentic Philippine dried mangoes, Kapeng Barako, Ube Halaya, handwoven Inabel, and South Sea pearls. Direct from the archipelago to your home.',
  keywords: [
    'Philippine treats',
    'Filipino food store',
    'Cebu mangoes',
    'Kapeng Barako',
    'Ube Halaya',
    'Inabel blanket',
    'Bayan Treats',
    'bayantreats.com'
  ],
  openGraph: {
    title: 'Bayan Treats — Treasures from the Philippines',
    description: 'Curated delicacies, artisanal craft, and heritage flavors from the 7,641 Philippine islands.',
    url: 'https://bayantreats.com',
    siteName: 'Bayan Treats',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#1D1D1F] min-h-screen flex flex-col antialiased selection:bg-[#0038A8] selection:text-white">
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <AuthModal />
            <ProductModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
