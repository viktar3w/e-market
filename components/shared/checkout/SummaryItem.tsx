import { ReactNode } from "react";

import { cn, formatPrice } from "@/lib/utils";

type SummaryItemProps = {
  className?: string;
  title: ReactNode;
  amount: number;
};
const SummaryItem = ({ className, title, amount }: SummaryItemProps) => {
  return (
    <div className={cn("flex my-4", className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="font-bold text-lg">{formatPrice(amount)}</span>
    </div>
  );
};

export default SummaryItem;
