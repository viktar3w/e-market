'use client';
import { useRouter } from 'next/navigation';

import { SupportPlan } from '@prisma/client';
import { format } from 'date-fns';
import { BarChart } from 'lucide-react';
import { useEffect } from 'react';

import Card from '@/components/shared/common/Card';
import { TIME_RANGE_LABELS } from '@/lib/constants';
import { useCreateCheckoutSessionMutation, useGetUsageQuery } from '@/lib/redux/api/support.api';

type UpgradePageContentProps = {
  plan: SupportPlan;
};

const UpgradePageContent = ({ plan }: UpgradePageContentProps) => {
  const { push } = useRouter();
  const [createCheckoutSession, { isLoading, isSuccess, data }] = useCreateCheckoutSessionMutation();
  const { data: usageData } = useGetUsageQuery();
  useEffect(() => {
    if (isSuccess && !!data?.url) {
      push(data.url);
    }
  }, [isSuccess, data, push]);

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div className="">
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">Plan: {plan}</h1>
        <p className="text-sm/6 text-gray-600 max-w-prose">
          {plan === SupportPlan.PRO
            ? 'Thank you for our Supporting)) Find your increased limits below.'
            : 'Get access for more events, categories and premium support.'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!!usageData && (
          <>
            <Card className="border-2 border-brand-700">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm/6 font-medium">Total Events</p>
                <BarChart className="size-4 text-muted-foreground" />
              </div>
              <div className="">
                <p className="text-2xl font-bold">
                  {usageData.eventsUsed} of {usageData.eventsLimit.toLocaleString() || 100}
                </p>
                <p className="text-xs/5 text-muted-foreground">Events this period</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="text-sm/6 font-medium">Event Categories</p>
                <BarChart className="size-4 text-muted-foreground" />
              </div>
              <div className="">
                <p className="text-2xl font-bold">
                  {usageData.categoriesUsed} of {usageData.categoriesLimit.toLocaleString() || 100}
                </p>
                <p className="text-xs/5 text-muted-foreground">Active categories</p>
              </div>
            </Card>
          </>
        )}
      </div>
      <p className="text-sm text-gray-500">
        Usage will reset{' '}
        {!!usageData?.resetDate ? (
          format(usageData.resetDate, 'MMM d, yyyy')
        ) : (
          <span className="animate-pulse w-8 h-4 bg-gray-200"></span>
        )}
        {plan !== SupportPlan.PRO && (
          <span onClick={() => createCheckoutSession()} className="cursor-pointer inline underline text-brand-600">
            {' '}
            or upgrade now to increase your limit &rarr;
          </span>
        )}
      </p>
    </div>
  );
};

export default UpgradePageContent;
