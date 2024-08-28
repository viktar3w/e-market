import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import DefaultCategories from "@/components/shared/categories/DefaultCategories";
import SortPopup from "@/components/shared/common/SortPopup";
import { ItemVariation } from "@/lib/types/types";

type TopBarProps = {
  className?: string;
  items: ItemVariation<string>[];
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
        <DefaultCategories items={items} />
        <SortPopup />
      </BoxWrapper>
    </div>
  );
};

export default TopBar;
