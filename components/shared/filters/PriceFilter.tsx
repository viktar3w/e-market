import { Input } from "@/components/ui/input";
import { MAX_PRICE, MIN_PRICE, PRICE_STEP } from "@/lib/constants";
import RangeSliderFilter from "@/components/shared/filters/RangeSliderFilter";

type PriceFilterProps = {
  title: string;
  updatePrice: (name: keyof PriceProps, value: number) => void;
} & PriceProps;
export type PriceProps = {
  minPrice: number;
  maxPrice: number;
};
const PriceFilter = ({
  title,
  minPrice,
  maxPrice,
  updatePrice,
}: PriceFilterProps) => {
  return (
    <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold mb-3">{title}</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder={`${MIN_PRICE}`}
          min={MIN_PRICE}
          maxLength={MAX_PRICE}
          value={minPrice}
          step={PRICE_STEP}
          onChange={(e) => {
            let price = Number(e.target.value || 0);
            if (price > MAX_PRICE) {
              price = MAX_PRICE;
            } else if (price < 0) {
              price = 0;
            } else if (price > maxPrice) {
              price = maxPrice - 1;
            }
            updatePrice("minPrice", price);
          }}
        />
        <Input
          type="number"
          placeholder={`${MAX_PRICE}`}
          min={MAX_PRICE / 30}
          maxLength={MAX_PRICE}
          value={maxPrice}
          step={PRICE_STEP}
          onChange={(e) => {
            let price = Number(e.target.value || 0);
            if (price > MAX_PRICE) {
              price = MAX_PRICE;
            } else if (price < 0) {
              price = 0;
            } else if (price < minPrice) {
              price = minPrice + 1;
            }
            updatePrice("maxPrice", price);
          }}
        />
      </div>
      <RangeSliderFilter
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={PRICE_STEP}
        value={[minPrice, maxPrice]}
        onValueChange={([from, to]) => {
          let mPrice = from;
          if (mPrice > MAX_PRICE) {
            mPrice = MAX_PRICE;
          } else if (mPrice < 0) {
            mPrice = 0;
          } else if (mPrice > maxPrice) {
            mPrice = maxPrice - 1;
          }
          let mxPrice = to;
          if (mxPrice > MAX_PRICE) {
            mxPrice = MAX_PRICE;
          } else if (mxPrice < 0) {
            mxPrice = 0;
          } else if (mxPrice < minPrice) {
            mxPrice = minPrice + 1;
          }
          updatePrice("minPrice", mPrice);
          updatePrice("maxPrice", mxPrice);
        }}
      />
    </div>
  );
};

export default PriceFilter;
