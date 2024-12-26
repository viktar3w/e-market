import { createCheckoutSession } from '@/lib/stripe/stripe';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

export const paymentRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    const { support } = ctx;
    let session;
    try {
      session = await createCheckoutSession({
        userEmail: support.user.email,
        userId: support.user.id,
      });
    } catch (e: any) {
      console.log("[ERROR] ", e.message)
    }

    return c.json({ url: session?.url });
  }),

  getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
    const { support } = ctx;
    return c.json({ plan: support.plan });
  }),
});
