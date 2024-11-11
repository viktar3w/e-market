import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ProductCartSkeletonProps = {
  className?: string;
};
const ProductCartSkeleton = ({ className }: ProductCartSkeletonProps) => {
  return (
    <div className={cn("group", className)}>
      <Skeleton className="mb-5 h-12 rounded-[8px] w-[50%]" />
      <div className="grid grid-cols-3 gap-[50px]">
        {...Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="mb-5 rounded-lg h-[260px] w-[260px]"
            />
          ))}
      </div>
    </div>
  );
};

export default ProductCartSkeleton;
