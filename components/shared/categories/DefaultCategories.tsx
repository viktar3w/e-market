"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux";
import { selectCategory } from "@/lib/redux/slices/categorySlicer";
import { ItemVariation } from "@/lib/types/types";

type DefaultCategories = {
  className?: string;
  items: ItemVariation<string>[];
};
const DefaultCategories = ({ className, items }: DefaultCategories) => {
  const { scrolledActiveCategory } = useAppSelector(selectCategory);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {items.map((item) => (
        <a
          key={item.value}
          href={`#group-${item.value}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            scrolledActiveCategory === item.value &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
        >
          <button>{item.text}</button>
        </a>
      ))}
    </div>
  );
};
export default DefaultCategories;
