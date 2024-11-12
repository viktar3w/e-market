import { cn } from "@/lib/utils";

type ProgressBarProps = {
  currentStep: number;
};

const steps = [
  { id: 1, label: "Personal Data" },
  { id: 2, label: "Delivery Data" },
  { id: 3, label: "Summary" },
];

const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step) => (
        <div key={step.id} className="flex-1 flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
              currentStep >= step.id
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-600",
            )}
          >
            {step.id}
          </div>
          {step.id < steps.length && (
            <div className="flex-1 h-1 bg-gray-300">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: currentStep > step.id ? "100%" : "0%" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
