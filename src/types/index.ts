export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceUSD: number;
  pricePHP: number;
  category: 'snacks' | 'coffee' | 'sweets' | 'artisan' | 'pantry';
  categoryLabel: string;
  origin: string; // e.g. "Cebu", "Batangas", "Baguio, Benguet", "Ilocos Norte", "Bicol"
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  ingredients?: string[];
  materials?: string[];
  netWeight?: string;
  heritageStory?: string;
  stripePriceId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  provider: 'google' | 'apple' | 'password' | 'demo';
}

export interface Order {
  id: string;
  userId?: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    priceUSD: number;
  }[];
  totalUSD: number;
  totalPHP: number;
  status: 'paid' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress?: {
    name: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
}
