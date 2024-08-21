import { cn } from "@/lib/utils";
import Title from "@/components/shared/common/Title";
import CheckboxFilter from "@/components/shared/filters/CheckboxFilter";
import PriceFilter from "@/components/shared/filters/PriceFilter";
import CheckboxGroupFilter from "@/components/shared/filters/CheckboxGroupFilter";
import { DEFAULT_TYPES_CHECKBOXES, DEFAULT_TYPES_LIMIT } from "@/lib/constants";

type DefaultFilterProps = {
  className?: string;
};

const DefaultFilter = ({ className }: DefaultFilterProps) => {
  return (
    <div className={cn("", className)}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <CheckboxFilter text="Item Available" value="1" name="available-now" />
        <CheckboxFilter text="New" value="2" name="new" />
      </div>
      <PriceFilter title="Price from and to:" />
      <CheckboxGroupFilter
        title="Types"
        name="types"
        className="mt-5"
        limit={DEFAULT_TYPES_LIMIT}
        items={DEFAULT_TYPES_CHECKBOXES}
      />
    </div>
  );
};

export default DefaultFilter;
