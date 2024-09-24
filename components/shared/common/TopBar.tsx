import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import SortPopup from "@/components/shared/common/SortPopup";
import { ItemVariation } from "@/lib/types/types";
import SkeletonDefaultCategories from "@/components/shared/categories/SkeletonDefaultCategories";
import DefaultCategories from "@/components/shared/categories/DefaultCategories";

type TopBarProps = {
  className?: string;
  items: ItemVariation<string>[];
  loading?: boolean;
};
const TopBar = ({ className, items }: TopBarProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className,
      )}
    >
      <BoxWrapper className="flex items-center justify-between">
        {items.length === 0 ? (
          <SkeletonDefaultCategories />
        ) : (
          <DefaultCategories items={items} />
        )}
        <SortPopup />
      </BoxWrapper>
    </div>
  );
};

export default TopBar;
