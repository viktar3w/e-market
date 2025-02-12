'use server';

import { cookies } from 'next/headers';

export const removeCookie = async (key: string) => {
  const store = await cookies();
  store.delete(key);
};
