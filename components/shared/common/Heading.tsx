import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = HTMLAttributes<HTMLHeadElement> & {
  children?: ReactNode;
};
const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default Heading;
