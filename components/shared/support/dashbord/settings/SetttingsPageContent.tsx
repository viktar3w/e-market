'use client';

import Link from 'next/link';

import { useState } from 'react';

import Card from '@/components/shared/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSetTelegramIDMutation } from '@/lib/redux/api/support.api';

export const AccountSettings = ({ telegramId: initialTelegram }: { telegramId: string }) => {
  const [telegramId, setTelegramId] = useState<string>(initialTelegram);

  const [mutate, { isLoading }] = useSetTelegramIDMutation();

  return (
    <Card className="max-w-xl w-full space-y-4">
      <div className="pt-2">
        <Label>Telegram Chat Id</Label>
        <Input
          className="mt-1"
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
          placeholder="Enter your Discord ID"
        />
      </div>

      <p className="mt-2 text-sm/6 text-gray-600">
        Don&apos;t know how to find your Telegram ID?{' '}
        <Link href="#" className="text-brand-600 hover:text-brand-500">
          Learn how to obtain it here
        </Link>
        .
      </p>

      <div className="pt-4">
        <Button onClick={() => mutate({ telegramId })} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </Card>
  );
};
