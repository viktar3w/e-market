"use client";
import { Icons } from "@/components/shared/support/Icons";
import LoadingSpinner from "@/components/shared/common/LoadingSpinner";
import Heading from "@/components/shared/common/Heading";
import { useGetDatabaseSyncStatusQuery } from "@/lib/redux/api/support.api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { push } = useRouter();
  const { data } = useGetDatabaseSyncStatusQuery(undefined, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  useEffect(() => {
    !!data?.isSynced && push("/support/dashboard");
  }, [data, push]);
  return (
    <div className="flex w-full flex-1 items-center justify-center px-4">
      <Icons.backgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center pt-[15%]">
        <LoadingSpinner size="md" />
        <Heading>Creating your account...</Heading>
        <p className="text-base/7 text-gray-600 max-w-prose">
          Just a moment while we set things up for you.
        </p>
      </div>
    </div>
  );
};

export default Page;
