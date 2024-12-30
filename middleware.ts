import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { getCartToken } from '@/actions/cartAction';
import { CART_COOKIE_KEY } from '@/lib/constants';

const isProtectedRoute = createRouteMatcher(['/onboarding(.*)']);
export default clerkMiddleware(async (auth, request) => {
  const res = NextResponse.next();
  if (isProtectedRoute(request)) {
    auth().protect();
  }
  const { userId } = auth();
  const cartId = request.cookies.get(CART_COOKIE_KEY)?.value;
  if (!cartId) {
    const token = await getCartToken(userId || undefined);
    if (token !== '') {
      res.cookies.set(CART_COOKIE_KEY, token, { path: '/', httpOnly: true });
    }
  }
  return res;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/support/dashboard(.*)',
  ],
};
