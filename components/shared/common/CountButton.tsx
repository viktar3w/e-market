import CountIconButton from "@/components/shared/common/CountIconButton";
import { CountButtonType } from "@/lib/types/types";
import { cn } from "@/lib/utils";

const CountButton = ({
  className,
  value,
  size,
  onClick,
  disabled = false,
}: CountButtonType) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className,
      )}
    >
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1 || disabled}
        size={size}
        type="minus"
      />
      <strong className={size === "sm" ? "text-sm" : "text-md"}>{value}</strong>
      <CountIconButton
        onClick={() => onClick?.("plus")}
        size={size}
        disabled={disabled}
      />
    </div>
  );
};

export default CountButton;
