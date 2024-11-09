import { Suspense } from "react";
import HomeWrapper from "@/components/shared/common/HomeWrapper";
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeWrapper />
    </Suspense>
  );
};

export default Page;
