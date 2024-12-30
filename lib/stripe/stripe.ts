import Stripe from 'stripe';

import { PaymentType } from '@/lib/enums/payment';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
  typescript: true,
});
export const createSupportSession = async ({ userEmail, supportId }: { userEmail: string; supportId: string }) => {
  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_SUPPORT_PRICE_PRO_PLAN,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/support/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/support/pricing`,
    customer_email: userEmail,
    metadata: {
      type: PaymentType.SUPPORT,
      supportId: supportId,
    },
  });
};

export const createProductSession = async (
  token: string,
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
) => {
  return await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/success?token=${token}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/error?token=${token}`,
    payment_method_types: ['card'],
    mode: 'payment',
    billing_address_collection: 'required',
    metadata: {
      type: PaymentType.SHOP_PRODUCT,
      token: token,
    },
    line_items: lineItems,
  });
};
