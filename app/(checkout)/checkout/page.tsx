import { cookies } from 'next/headers';

import CheckoutWrapper from '@/components/shared/checkout/CheckoutWrapper';
import { CART_COOKIE_KEY } from '@/lib/constants';

const Page = async () => {
  const cartId = cookies().get(CART_COOKIE_KEY)?.value;
  if (!cartId) {
    return <></>;
  }
  return <CheckoutWrapper />;
};

export default Page;
