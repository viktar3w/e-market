import { NextResponse } from 'next/server';

import Stripe from 'stripe';

import { updateOrder } from '@/actions/checkoutAction';
import { updateUserPlan } from '@/actions/supportAction';
import { PaymentType } from '@/lib/enums/payment';
import { stripe } from '@/lib/stripe/stripe';

export async function POST(req: Request) {
  let message = '';
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    if (!sig) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    const webToken =
      process.env.NODE_ENV === 'development'
        ? process.env.STRIPE_WEBHOOK_DEV_SECRET_KEY!
        : process.env.STRIPE_WEBHOOK_SECRET_KEY!;
    console.log('[verifyHeader] ', stripe.webhooks.signature.verifyHeader(body, sig, webToken));
    const event = stripe.webhooks.constructEvent(body, sig, webToken);
    const session = event?.data?.object as Stripe.Checkout.Session;
    const type = session?.metadata?.type;
    if (!type) {
      console.log('Invalid metadata');
      return new NextResponse('Invalid metadata');
    }
    if (type === PaymentType.SHOP_PRODUCT) {
      const result = await updateOrder(session, event.type);
      if (typeof result === 'string') {
        console.log('[ERROR] checkout updateOrder: ', result);
        return new NextResponse(result);
      }
      message = result ? 'Order was updated' : 'Something was wrong, try again later';
    } else if (type === PaymentType.SUPPORT) {
      const result = await updateUserPlan(session, event.type);
      if (typeof result === 'string') {
        console.log(result);
        return new NextResponse(result);
      }
      message = result ? 'Support plan was updated' : "We couldn't update support plan. Please try again later";
    }
  } catch (err: any) {
    console.log('[ERROR] ', err);
    return NextResponse.json({ error: 'Something was wrong' }, { status: 400 });
  }
  console.log(message);
  return new NextResponse(message);
}
