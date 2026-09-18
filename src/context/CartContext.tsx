'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  currency: 'USD' | 'PHP';
  setCurrency: (c: 'USD' | 'PHP') => void;
  totalItems: number;
  subtotalUSD: number;
  subtotalPHP: number;
  freeShippingThresholdUSD: number;
  freeShippingRemainingUSD: number;
  isFreeShipping: boolean;
  products: Product[];
  selectedProduct: Product | null;
  openProductModal: (p: Product) => void;
  closeProductModal: () => void;
  addProduct: (p: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'USD' | 'PHP'>('USD');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const freeShippingThresholdUSD = 65.00;

  // Load cart and custom products from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bayantreats_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }

    const savedProducts = localStorage.getItem('bayantreats_custom_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts([...INITIAL_PRODUCTS, ...parsed]);
      } catch (e) {
        console.error("Failed to parse custom products:", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('bayantreats_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openProductModal = (p: Product) => setSelectedProduct(p);
  const closeProductModal = () => setSelectedProduct(null);

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    const saved = localStorage.getItem('bayantreats_custom_products');
    const existing: Product[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem('bayantreats_custom_products', JSON.stringify([newProd, ...existing]));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const subtotalPHP = items.reduce((sum, item) => sum + item.product.pricePHP * item.quantity, 0);

  const freeShippingRemainingUSD = Math.max(0, freeShippingThresholdUSD - subtotalUSD);
  const isFreeShipping = subtotalUSD >= freeShippingThresholdUSD;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        currency,
        setCurrency,
        totalItems,
        subtotalUSD,
        subtotalPHP,
        freeShippingThresholdUSD,
        freeShippingRemainingUSD,
        isFreeShipping,
        products,
        selectedProduct,
        openProductModal,
        closeProductModal,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
