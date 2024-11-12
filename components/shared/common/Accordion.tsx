import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  isOpenByDefault?: boolean;
  onToggle?: () => void;
  className?: string;
};
const Accordion = ({
  title,
  children,
  isOpen,
  onToggle,
  isOpenByDefault = false,
  className,
}: AccordionProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  useEffect(() => {
    setIsOpened(isOpen);
  }, [isOpen]);
  const handle = useCallback(() => {
    onToggle?.();
    if (isOpenByDefault) {
      setIsOpened((prev) => !prev);
    }
  }, [isOpenByDefault, onToggle]);
  return (
    <div
      className={cn("border border-gray-200 rounded-lg shadow-sm", className)}
    >
      <span
        onClick={handle}
        className="flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg transition-colors duration-200 focus:outline-none"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        {isOpened ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </span>
      {isOpened && (
        <div className="p-4 bg-white text-gray-600 rounded-b-lg transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
