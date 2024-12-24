import DefaultCategories from "@/components/shared/categories/DefaultCategories";
import SkeletonDefaultCategories from "@/components/shared/categories/SkeletonDefaultCategories";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import SortPopup from "@/components/shared/common/SortPopup";
import { ItemVariation } from "@/lib/types/types";
import { cn } from "@/lib/utils";

type TopBarProps = {
  className?: string;
  items: ItemVariation<string>[];
  loading?: boolean;
};
const TopBar = ({ className, items }: TopBarProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-3 md:py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <BoxWrapper className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        <div className="w-full overflow-x-auto">
          {items.length === 0 ? (
            <SkeletonDefaultCategories />
          ) : (
            <DefaultCategories items={items} />
          )}
        </div>
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <SortPopup />
        </div>
      </BoxWrapper>
    </div>
  );
};

export default TopBar;
