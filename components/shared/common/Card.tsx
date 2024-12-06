import { HtmlHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  contentClassName?: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

const Card = ({
  contentClassName,
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-gray-50 text-card-foreground",
        className,
      )}
      {...props}
    >
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
      <div className="absolute z-0 inset-px rounded-lg bg-white" />
      <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  );
};

export default Card;
