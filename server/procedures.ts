import { currentUser } from '@clerk/nextjs/server';
import { HTTPException } from 'hono/http-exception';

import { db } from '@/db';

import { j } from './__internals/j';

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    const apiKey = authHeader.split(' ')[1];
    const support = await db.support.findUnique({
      where: { apiKey },
      include: {
        user: true,
        socials: true,
      },
    });
    if (support) return next({ support });
  }
  const auth = await currentUser();
  if (!auth) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
  const user = await db.user.findUnique({
    where: { id: auth.id },
    include: {
      support: {
        include: {
          user: true,
          socials: true,
        },
      },
    },
  });
  if (!user || !user?.support) {
    throw new HTTPException(401, { message: 'Unauthorized' });
  }
  return next({ support: user.support });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
