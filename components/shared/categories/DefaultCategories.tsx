"use client";
import { cn } from "@/lib/utils";
import { DEFAULT_TYPES_CHECKBOXES } from "@/lib/constants";
import { useAppSelector } from "@/hooks/redux";
import { selectCategory } from "@/lib/redux/slices/categorySlicer";

type DefaultCategories = {
  className?: string;
};
const DefaultCategories = ({ className }: DefaultCategories) => {
  const { scrolledActiveCategory } = useAppSelector(selectCategory);
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {DEFAULT_TYPES_CHECKBOXES.map((category) => (
        <a
          key={category.value}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            scrolledActiveCategory === Number(category.value) &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
        >
          <button>{category.text}</button>
        </a>
      ))}
    </div>
  );
};
export default DefaultCategories;
