import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Heading from "@/components/shared/common/Heading";

type DashboardWrapperProps = {
  title: string;
  children?: ReactNode;
  hideBlockButton?: boolean;
  cta?: ReactNode;
};

const DashboardWrapper = ({
  title,
  cta,
  hideBlockButton,
  children,
}: DashboardWrapperProps) => {
  return (
    <section className="flex flex-1 h-full w-full flex-col">
      <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
          {!hideBlockButton && (
            <Button className="w-fit bg-white" variant="outline">
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <Heading>{title}</Heading>
          {!!cta && <div className="">{cta}</div>}
        </div>
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  );
};

export default DashboardWrapper;
