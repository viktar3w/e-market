"use client";

import Title from "@/components/shared/common/Title";
import CheckboxFilter from "@/components/shared/filters/CheckboxFilter";
import CheckboxGroupFilter from "@/components/shared/filters/CheckboxGroupFilter";
import PriceFilter from "@/components/shared/filters/PriceFilter";
import { useHomeFilters } from "@/hooks/useHomeFilters";
import { DEFAULT_TYPES_LIMIT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

type DefaultFilterProps = {
  className?: string;
};

const DefaultFilter = ({ className }: DefaultFilterProps) => {
  const $t = useTranslation();
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
    activeTab,
    setActiveTab,
  } = useHomeFilters();
  return (
    <div className={cn("", className)}>
      <Title text={$t("Filters")} size="sm" className="mb-5 font-bold" />
      <div className="flex gap-4 mb-5 border-b border-b-neutral-200">
        <button
          className={cn(
            "text-lg font-semibold p-2",
            activeTab === "filters"
              ? "border-b-2 border-b-primary"
              : "text-gray-500",
          )}
          onClick={() => setActiveTab("filters")}
        >
          {$t("Filters")}
        </button>
        <button
          className={cn(
            "text-lg font-semibold p-2",
            activeTab === "price"
              ? "border-b-2 border-b-primary"
              : "text-gray-500",
          )}
          onClick={() => setActiveTab("price")}
        >
          {$t("Price")}
        </button>
        <button
          className={cn(
            "text-lg font-semibold p-2",
            activeTab === "types"
              ? "border-b-2 border-b-primary"
              : "text-gray-500",
          )}
          onClick={() => setActiveTab("types")}
        >
          {$t("Types")}
        </button>
      </div>

      {activeTab === "filters" && (
        <div>
          <Title text={$t("Filters")} size="sm" className="mb-5 font-bold" />
          <div className="flex flex-col gap-4">
            <CheckboxFilter
              checked={isAvailable}
              text={$t("Item Available")}
              value={isAvailable ? "1" : "0"}
              name="available-now"
              onCheckedChange={(checked) => setIsAvailable(checked)}
            />
            <CheckboxFilter
              checked={isNew}
              text={$t("New")}
              value={isNew ? "1" : "0"}
              name="new"
              onCheckedChange={(checked) => setIsNew(checked)}
            />
          </div>
        </div>
      )}

      {activeTab === "price" && (
        <div>
          <PriceFilter
            maxPrice={price.maxPrice}
            minPrice={price.minPrice}
            updatePrice={updatePrice}
            title={$t("Price from and to:")}
          />
        </div>
      )}

      {activeTab === "types" && (
        <div>
          <CheckboxGroupFilter
            title={$t("Types")}
            name="types"
            className="mt-5"
            limit={DEFAULT_TYPES_LIMIT}
            items={components.map((component) => ({
              text: component.name ?? "",
              value: component.id,
            }))}
            onChange={addId}
            loading={loading}
            selectedIds={selectedIds}
          />
        </div>
      )}
    </div>
  );
};

export default DefaultFilter;
