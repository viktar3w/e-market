import { db } from "@/db";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { z } from "zod";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validations/category";
import { parseColor } from "@/lib/utils";
import { HTTPException } from "hono/http-exception";
import {
  SupportCategoryDeleteByNameSchema,
  SupportCreateEventCategorySchema,
} from "@/lib/validations/support";

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);

    const categories = await db.eventCategory.findMany({
      where: { supportId: ctx.support.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
        events: {
          where: { createdAt: { gte: firstDayOfMonth } },
          select: {
            fields: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            events: {
              where: { createdAt: { gte: firstDayOfMonth } },
            },
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const categoriesWithCounts = categories.map((category) => {
      const uniqueFieldNames = new Set<string>();
      let lastPing: Date | null = null;

      category.events.forEach((event) => {
        Object.keys(event.fields as object).forEach((fieldName) => {
          uniqueFieldNames.add(fieldName);
        });
        if (!lastPing || event.createdAt > lastPing) {
          lastPing = event.createdAt;
        }
      });

      return {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        color: category.color,
        updatedAt: category.updatedAt,
        createdAt: category.createdAt,
        uniqueFieldCount: uniqueFieldNames.size,
        eventsCount: category._count.events,
        lastPing,
      };
    });

    return c.superjson({ categories: categoriesWithCounts });
  }),

  deleteCategory: privateProcedure
    .input(SupportCategoryDeleteByNameSchema)
    .mutation(async ({ c, input, ctx }) => {
      const { name } = input;

      await db.eventCategory.delete({
        where: {
          supportId_name: {
            supportId: ctx.support.id,
            name: name,
          },
        },
      });

      return c.json({ success: true });
    }),

  createEventCategory: privateProcedure
    .input(SupportCreateEventCategorySchema)
    .mutation(async ({ c, ctx, input }) => {
      const { support } = ctx;
      const { color, name, emoji } = input;
      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          supportId: support.id,
        },
      });
      return c.json({ eventCategory });
    }),

  insertQuickstartCategories: privateProcedure.mutation(async ({ ctx, c }) => {
    const categories = await db.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐛", color: 0xff6b6b },
        { name: "sale", emoji: "💰", color: 0xffeb3b },
        { name: "question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        supportId: ctx.support.id,
      })),
    });
    return c.json({ success: true, count: categories.count });
  }),

  pollCategory: privateProcedure
    .input(SupportCategoryDeleteByNameSchema)
    .query(async ({ c, ctx, input }) => {
      const { name } = input;

      const category = await db.eventCategory.findUnique({
        where: { supportId_name: { supportId: ctx.support.id, name } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      });

      if (!category) {
        throw new HTTPException(404, {
          message: `Category "${name}" not found`,
        });
      }
      // @ts-ignore
      return c.json({ success: category._count.events > 0 });
    }),

  getEventsByCategoryName: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        page: z.number(),
        limit: z.number().max(50),
        timeRange: z.enum(["today", "week", "month"]),
      }),
    )
    .query(async ({ c, ctx, input }) => {
      const { name, page, limit, timeRange } = input;

      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case "today":
          startDate = startOfDay(now);
          break;
        case "week":
          startDate = startOfWeek(now, { weekStartsOn: 0 });
          break;
        case "month":
          startDate = startOfMonth(now);
          break;
      }

      const [events, eventsCount, uniqueFieldCount] = await Promise.all([
        db.event.findMany({
          where: {
            eventCategory: { name, supportId: ctx.support.id },
            createdAt: { gte: startDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        db.event.count({
          where: {
            eventCategory: { name, supportId: ctx.support.id },
            createdAt: { gte: startDate },
          },
        }),
        db.event
          .findMany({
            where: {
              eventCategory: { name, supportId: ctx.support.id },
              createdAt: { gte: startDate },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            const fieldNames = new Set<string>();
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName);
              });
            });
            return fieldNames.size;
          }),
      ]);

      return c.superjson({
        events,
        eventsCount,
        uniqueFieldCount,
      });
    }),
});
