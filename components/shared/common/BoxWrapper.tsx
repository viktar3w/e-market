import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
} & PropsWithChildren;

const BoxWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BoxWrapper;
