import { SocialType, SupportPlan } from '@prisma/client';
import { addMonths, startOfMonth } from 'date-fns';
import { z } from 'zod';

import { db } from '@/db';
import { SUPPORT_FREE_LIMIT, SUPPORT_PRO_LIMIT } from '@/lib/constants';
import { sanitize } from '@/lib/utils';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

export const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { support } = ctx;
    const currentDate = startOfMonth(new Date());
    const limitSupport = await db.limitSupport.findFirst({
      where: {
        supportId: support.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    });
    const eventCount = limitSupport?.count ?? 0;
    const categoryCount = await db.eventCategory.count({
      where: { supportId: support.id },
    });

    const limits = support.plan === SupportPlan.PRO ? SUPPORT_PRO_LIMIT : SUPPORT_FREE_LIMIT;

    const resetDate = addMonths(currentDate, 1);

    return c.superjson({
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventsCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEventsPerMonth,
      resetDate,
    });
  }),
  setTelegramID: privateProcedure.mutation(async ({ c, ctx }) => {
    const { support } = ctx;
    const params = await c.req.json();
    let t;
    try {
      const { telegramId } = z.object({ telegramId: z.string().min(1).max(20) }).parse({
        telegramId: sanitize(params?.telegramId || ''),
      });
      t = telegramId;
    } catch (e: any) {
      console.log('[ERROR] ', e.message);
      throw new Error('Server error');
    }
    const telegram = (support?.socials || []).find((c) => c.type === SocialType.TELEGRAM);
    if (!!telegram) {
      await db.social.updateMany({
        where: {
          supportId: support.id,
          type: SocialType.TELEGRAM,
        },
        data: {
          supportId: support.id,
          type: SocialType.TELEGRAM,
          authKey: t,
        },
      });
    } else {
      await db.social.create({
        data: {
          supportId: support.id,
          type: SocialType.TELEGRAM,
          authKey: t,
        },
      });
    }

    return c.json({ success: true });
  }),
});
