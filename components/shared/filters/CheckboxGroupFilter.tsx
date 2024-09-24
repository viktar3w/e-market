"use client";
import { cn } from "@/lib/utils";
import { CheckboxFilterType } from "@/lib/types/types";
import { CHECKBOX_ITEMS_LIMIT } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import CheckboxFilter from "@/components/shared/filters/CheckboxFilter";
import { useEffect, useState } from "react";
import CheckboxSkeleton from "@/components/shared/filters/CheckboxSkeleton";

type CheckboxGroupFilterProps = {
  title: string;
  items: CheckboxFilterType[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (id: string) => void;
  className?: string;
  name?: string;
  loading?: boolean;
  selectedIds?: Set<string>;
};
const CheckboxGroupFilter = ({
  className,
  items,
  limit = CHECKBOX_ITEMS_LIMIT,
  title,
  searchInputPlaceholder = "Search...",
  onChange,
  name = "type",
  selectedIds,
}: CheckboxGroupFilterProps) => {
  const [types, setTypes] = useState<CheckboxFilterType[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  useEffect(() => {
    if (!showAll || !searchValue) {
      setTypes(items.slice(0, limit));
      return;
    }
    setTypes(
      items.filter((t) => t.text.toLowerCase().includes(searchValue || "")),
    );
  }, [items, searchValue, showAll, limit]);
  useEffect(() => {
    setTypes(showAll ? items : items.slice(0, limit));
  }, [items, showAll, limit]);
  if (items.length === 0) {
    return <CheckboxSkeleton limit={limit} className={className} />;
  }
  return (
    <div className={cn("", className)}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {types.map((item) => (
          <CheckboxFilter
            key={item.value}
            name={name}
            {...item}
            checked={selectedIds?.has(item.value)}
            onCheckedChange={() => onChange?.(item.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={cn(showAll && "border-t border-t-neutral-100 mt-4")}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3 font-bold"
          >
            {showAll ? "Hide" : "+ Show all"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxGroupFilter;
