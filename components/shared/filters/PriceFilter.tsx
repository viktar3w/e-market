import { Input } from "@/components/ui/input";
import { MAX_PRICE, MIN_PRICE } from "@/lib/constants";
import RangeSliderFilter from "@/components/shared/filters/RangeSliderFilter";

type PriceFilterProps = {
  title: string;
};
const PriceFilter = ({ title }: PriceFilterProps) => {
  return (
    <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold mb-3">{title}</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder={`${MIN_PRICE}`}
          min={MIN_PRICE}
          maxLength={MAX_PRICE}
          defaultValue={MIN_PRICE}
        />
        <Input
          type="number"
          placeholder={`${MAX_PRICE}`}
          min={MAX_PRICE / 30}
          maxLength={MAX_PRICE}
          defaultValue={MAX_PRICE}
        />
      </div>
      <RangeSliderFilter
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={10}
        value={[MIN_PRICE, MAX_PRICE]}
      />
    </div>
  );
};

export default PriceFilter;
