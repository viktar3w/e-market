import { cn } from "@/lib/utils";
import BoxWrapper from "@/components/shared/common/BoxWrapper";
import DefaultCategories from "@/components/shared/categories/DefaultCategories";
import SortPopup from "@/components/shared/common/SortPopup";

type TopBarProps = {
  className?: string
}
const TopBar = ({className}: TopBarProps) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <BoxWrapper className="flex items-center justify-between">
        <DefaultCategories/>
        <SortPopup />
      </BoxWrapper>
    </div>
  )
}

export default TopBar