import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxFilterType } from "@/lib/types/types";

export type CheckboxFilterProps = {} & CheckboxFilterType;

const CheckboxFilter = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}: CheckboxFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded-[8px] w-6 h-6"
        name={name}
        id={`checkbox-${name || "one"}-${value}`}
      />
      <label
        htmlFor={`checkbox-${name || "one"}-${value}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};

export default CheckboxFilter;
