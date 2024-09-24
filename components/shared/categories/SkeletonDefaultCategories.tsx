import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
type SkeletonDefaultCategoriesProps = {
  className?: string;
};
const SkeletonDefaultCategories = ({
  className,
}: SkeletonDefaultCategoriesProps) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {...Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-11 rounded-2xl px-5 w-[60px]" />
        ))}
    </div>
  );
};
export default SkeletonDefaultCategories;
