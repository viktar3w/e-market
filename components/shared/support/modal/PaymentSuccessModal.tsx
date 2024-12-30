'use client';

import { useRouter } from 'next/navigation';

import { SupportPlan } from '@prisma/client';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';

import LoadingSpinner from '@/components/shared/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useGetUserPlanQuery } from '@/lib/redux/api/support.api';

export const PaymentSuccessModal = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading } = useGetUserPlanQuery();
  const handleClose = () => {
    setIsOpen(false);
    router.push('/support/dashboard');
  };

  const isPaymentSuccessful = data?.plan === SupportPlan.PRO;

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessful}
    >
      <div className="flex flex-col items-center">
        {isLoading || !isPaymentSuccessful ? (
          <div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">Upgrading your account...</p>
            <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
              Please wait while we process your upgrade. This may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
              <img src="/logo.svg" className="h-full w-full object-cover" alt="Payment success" />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 tracking-tight font-medium text-pretty">Upgrade successful! 🎉</p>
              <p className="text-gray-600 text-sm/6 text-pretty">
                Thank you for upgrading to Pro and supporting PingPanda. Your account has been upgraded.
              </p>
            </div>

            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="h-12 w-full">
                <CheckIcon className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
