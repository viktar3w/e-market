"use client";
import { cn } from "@/lib/utils";
import Title from "@/components/shared/common/Title";
import CheckboxFilter from "@/components/shared/filters/CheckboxFilter";
import PriceFilter from "@/components/shared/filters/PriceFilter";
import CheckboxGroupFilter from "@/components/shared/filters/CheckboxGroupFilter";
import { DEFAULT_TYPES_LIMIT } from "@/lib/constants";
import { useHomeFilters } from "@/hooks/useHomeFilters";

type DefaultFilterProps = {
  className?: string;
};

const DefaultFilter = ({ className }: DefaultFilterProps) => {
  const {
    price,
    updatePrice,
    addId,
    loading,
    selectedIds,
    components,
    isNew,
    setIsNew,
    isAvailable,
    setIsAvailable,
  } = useHomeFilters();
  return (
    <div className={cn("", className)}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <CheckboxFilter
          checked={isAvailable}
          text="Item Available"
          value={isAvailable ? "1" : "0"}
          name="available-now"
          onCheckedChange={(checked) => setIsAvailable(checked)}
        />
        <CheckboxFilter
          checked={isNew}
          text="New"
          value={isNew ? "1" : "0"}
          name="new"
          onCheckedChange={(checked) => setIsNew(checked)}
        />
      </div>
      <PriceFilter
        maxPrice={price.maxPrice}
        minPrice={price.minPrice}
        updatePrice={updatePrice}
        title="Price from and to:"
      />
      <CheckboxGroupFilter
        title="Types"
        name="types"
        className="mt-5"
        limit={DEFAULT_TYPES_LIMIT}
        items={components.map((component) => ({
          text: component.name,
          value: component.id,
        }))}
        onChange={addId}
        loading={loading}
        selectedIds={selectedIds}
      />
    </div>
  );
};

export default DefaultFilter;
