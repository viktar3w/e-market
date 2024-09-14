import { Minus, Plus } from "lucide-react";
import { CountButtonType } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  size?: CountButtonType["size"];
  disabled?: boolean;
  type?: "plus" | "minus";
  onClick?: () => void;
};

const CountIconButton = ({
  size = "sm",
  disabled,
  type = "plus",
  onClick,
}: IconButtonProps) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={cn(
        "p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400",
        size === "sm"
          ? "w-[30px] h-[30px] rounded-[10px]"
          : "w-[38px] h-[38px] rounded-md",
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "h-4" : "h-5"} />
      ) : (
        <Minus className={size === "sm" ? "h-4" : "h-5"} />
      )}
    </Button>
  );
};

export default CountIconButton;
