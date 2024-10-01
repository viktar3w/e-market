import { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Title from "@/components/shared/common/Title";

type WhiteBlockProps = {
  className?: string;
  contentClassName?: string;
  title?: string;
  endAdornment?: ReactNode;
} & PropsWithChildren;
const WhiteBlock = ({
  className,
  contentClassName,
  title,
  endAdornment,
  children
}: WhiteBlockProps) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {!!title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}
      <div className={cn("px-5 py-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default WhiteBlock;
