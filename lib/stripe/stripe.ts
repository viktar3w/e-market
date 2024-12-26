import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
  typescript: true,
});
export const createCheckoutSession = async ({ userEmail, userId }: { userEmail: string; userId: string }) => {
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
      userId,
    },
  });
};
