import { cva, VariantProps } from "class-variance-authority";

type LoadingSpinnerProps = {
  className?: string;
} & VariantProps<typeof spinnerVariants>;

const spinnerVariants = cva(
  "border-4 rounded-full border-grand-200 border-t-brand-700 animate-spin duration-700",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-2",
        lg: "size-8 border-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={spinnerVariants({
          size,
          className,
        })}
      />
    </div>
  );
};

export default LoadingSpinner;
