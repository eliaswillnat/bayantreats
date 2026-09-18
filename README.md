# 🇵🇭 Bayan Treats (bayantreats.com)

An ultra-minimalist, Apple-inspired e-commerce platform for authentic Philippine delicacies, heritage treats, and artisan crafts.

Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, **Firebase Auth (Google, Apple, Email)**, **Firestore**, and **Stripe Checkout**.

---

## 🎨 Design Philosophy
- **Base Canvas**: Crisp Pure White (`#FFFFFF`) with subtle frosted glass surfaces (`backdrop-blur-md`).
- **Philippine Flag Palette**:
  - **Royal Blue (`#0038A8`)**: Primary action buttons ("Add to Bag", primary CTAs, active states).
  - **Scarlet Red (`#CE1126`)**: Provenance badges, bestseller markers, limited-edition highlights.
  - **Golden Yellow (`#FCD116` / `#E5B800`)**: Rating stars, quality seals, celebratory accents.
  - **Apple Neutrals**: Titanium grays (`#F5F5F7`, `#E5E5EA`, `#1D1D1F`).

---

## 🚀 Running on your MacBook

1. **Navigate to the project directory**:
   ```bash
   cd /Users/elias/.gemini/antigravity/scratch/bayantreats
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Open in your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Authentication Options
- **Continue with Apple**: Native Apple Sign-In button with OAuth provider.
- **Continue with Google**: One-click Google popup authentication.
- **Email + Password**: Direct registration & login forms.
- **MacBook 1-Click Demo Logins**: Built-in test profiles for quick testing without typing.

---

## 💳 Stripe Checkout Integration
- Supports dual currencies: **USD ($)** and **PHP (₱)** with instant toggle.
- When `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are provided in `.env.local`, real Stripe Checkout sessions are created.
- In demo/development mode, a simulated seamless checkout flow redirects to the celebratory receipt page with Philippine flag confetti.

---

## 🌐 Connecting `bayantreats.com` to Firebase

1. In the [Firebase Console](https://console.firebase.google.com), open **Hosting** > **Add custom domain**.
2. Enter `bayantreats.com`.
3. In your domain registrar DNS settings, add the Firebase A records:
   - `A` record `@` -> `199.36.158.100`
   - `A` record `@` -> `199.36.158.95`
4. Deploy the site using Firebase CLI:
   ```bash
   npm run build
   npx firebase deploy --only hosting
   ```
5. An in-app interactive guide is also available at `http://localhost:3000/domain-guide`.

---

## 📦 Project Structure
- `src/app/page.tsx`: Home storefront with category filters, dynamic search, sorting, and regional showcase.
- `src/app/success/page.tsx`: Post-purchase celebration page with confetti and parcel receipt.
- `src/app/domain-guide/page.tsx`: Custom domain and deployment guide.
- `src/app/api/checkout/route.ts`: Stripe Checkout Session API handler.
- `src/components/`: Apple-minimalist UI components (Navbar, Hero, ProductCard, ProductModal, CartDrawer, AuthModal, AdminProductModal, Footer).
- `src/context/`: AuthContext (Firebase Auth) & CartContext (Shopping Bag & Local/Firestore storage).
- `src/data/mockProducts.ts`: Curated catalog of authentic Philippine products (Cebu Mangoes, Kapeng Barako, Ube Halaya, Inabel Blankets, South Sea Pearls, etc.).
