import { Skeleton } from "@/components/ui/skeleton";

type CheckboxSkeletonProps = {
  className?: string;
  limit?: number;
};

const CheckboxSkeleton = ({ className, limit = 6 }: CheckboxSkeletonProps) => {
  return (
    <div className={className}>
      <span className="font-bold mb-3">
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 rounded-[8px] mb-5" />
          ))}
      </span>
    </div>
  );
};

export default CheckboxSkeleton;
