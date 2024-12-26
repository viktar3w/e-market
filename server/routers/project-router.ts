import { SupportPlan } from '@prisma/client';
import { addMonths, startOfMonth } from 'date-fns';

import { db } from '@/db';
import { SUPPORT_FREE_LIMIT, SUPPORT_PRO_LIMIT } from '@/lib/constants';

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
});
