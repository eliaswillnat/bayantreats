import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItem } from '@/types';

export async function POST(req: Request) {
  try {
    const { items, currency, customerEmail } = (await req.json()) as {
      items: CartItem[];
      currency: 'USD' | 'PHP';
      customerEmail?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // If Stripe Secret Key is configured, use official Stripe Checkout
    if (stripeSecretKey && !stripeSecretKey.includes('sk_test_demo')) {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-02-24.acacia' as any,
      });

      const line_items = items.map((item) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.product.name,
            description: `${item.product.tagline} • Origin: ${item.product.origin}`,
            images: item.product.images.slice(0, 1),
          },
          unit_amount:
            currency === 'USD'
              ? Math.round(item.product.priceUSD * 100)
              : Math.round(item.product.pricePHP * 100),
        },
        quantity: item.quantity,
      }));

      const origin = req.headers.get('origin') || 'http://localhost:3000';

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        customer_email: customerEmail,
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU', 'PH', 'DE', 'FR', 'JP', 'SG', 'AE'],
        },
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Fallback: seamless simulated checkout for local MacBook testing
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
    const mockSessionId = 'cs_demo_' + Math.random().toString(36).substring(2, 12);

    return NextResponse.json({
      url: `${origin}/success?session_id=${mockSessionId}&amount=${totalUSD.toFixed(2)}`,
    });
  } catch (error: any) {
    console.error('Stripe API checkout route error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
