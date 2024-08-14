import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

type SortPopupProps = {
  className?: string;
};
const SortPopup = ({ className }: SortPopupProps) => {
  return (
    <div className={cn("child-item h-[52px]", className)}>
      <ArrowUpDown size={16} />
      <strong>Sort:</strong>
      <strong className="text-primary">popular</strong>
    </div>
  );
};

export default SortPopup;
