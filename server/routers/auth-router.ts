import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";
import { SupportPlan } from "@prisma/client";

export const dynamic = "force-dynamic";

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c }) => {
    const auth = await currentUser();
    if (!auth) {
      return c.json({ isSynced: false });
    }
    const user = await db.user.findFirst({
      where: { id: auth.id },
      include: {
        support: true,
      },
    });
    if (!!user && !user?.support) {
      await db.support.create({
        data: {
          userId: user.id,
          limit: 100,
          plan: SupportPlan.FREE,
        },
      });
    }
    return c.json({ isSynced: !!user });
  }),
});
