import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ProductCartSkeletonProps = {
  className?: string;
};
const ProductCartSkeleton = ({ className }: ProductCartSkeletonProps) => {
  return (
    <div className={cn("group", className)}>
      <Skeleton className="mb-5 h-12 rounded-[8px] w-[50%] max-sm:text-center max-sm:m-auto max-sm:mb-[3rem]" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-items-center">
        {...Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="mb-5 rounded-lg w-[200px] h-[260px] max-sm:w-[260px]"
            />
          ))}
      </div>
    </div>
  );
};

export default ProductCartSkeleton;
