import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import HomeWrapper from '@/components/shared/common/HomeWrapper';

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-50">
          <Loader className="animate-spin text-white h-10 w-10" />
        </div>
      }
    >
      <HomeWrapper />
    </Suspense>
  );
};

export default Page;
