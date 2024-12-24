'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

import Heading from '@/components/shared/common/Heading';
import { Button } from '@/components/ui/button';

type DashboardWrapperProps = {
  title: string;
  children?: ReactNode;
  hideBlockButton?: boolean;
  cta?: ReactNode;
};

const DashboardWrapper = ({ title, cta, hideBlockButton, children }: DashboardWrapperProps) => {
  const { push } = useRouter();
  return (
    <section className="flex flex-1 h-full w-full flex-col">
      <div className="p-6 w-full sm:p-8 flex justify-between border-b border-gray-200">
        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-8">
            {!hideBlockButton && (
              <Button onClick={() => push('/support/dashboard')} className="w-fit bg-white" variant="outline">
                <ArrowLeft className="size-4" />
              </Button>
            )}
            <Heading>{title}</Heading>
          </div>
          {!!cta && <div className="w-full">{cta}</div>}
        </div>
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">{children}</div>
    </section>
  );
};

export default DashboardWrapper;
