import WhiteBlock from "@/components/shared/common/WhiteBlock";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="flex gap-10 space-y-3">
      <div className="flex flex-col gap-10 flex-1 mb-20">
        {...Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[700px] rounded-xl" />
          ))}
      </div>
      <div className="">
        <Skeleton className="h-[400px] w-[300px] rounded-xl" />
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
