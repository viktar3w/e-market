import { BarChart } from "lucide-react";

import Card from "@/components/shared/common/Card";
import { TIME_RANGE_LABELS } from "@/lib/constants";
import { SupportEventsByCategoryNameRequest } from "@/lib/validations/support";

type NumericFieldSumCardProps = {
  numericFieldSums: Record<
    string,
    {
      total: number;
      thisWeek: number;
      thisMonth: number;
      today: number;
    }
  >;
  activeTab: SupportEventsByCategoryNameRequest["timeRange"];
};

const NumericFieldSumCard = ({
  numericFieldSums,
  activeTab,
}: NumericFieldSumCardProps) => {
  return Object.entries(numericFieldSums).map(([field, sums]) => {
    const relevantSum =
      activeTab === "today"
        ? sums.today
        : activeTab === "week"
          ? sums.thisWeek
          : sums.thisMonth;
    return (
      <Card key={field} className="border-2 border-brand-700">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm/6 font-medium">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </p>
          <BarChart className="size-4 text-muted-foreground" />
        </div>
        <div className="">
          <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
          <p className="text-xs/5 text-muted-foreground">
            {TIME_RANGE_LABELS[activeTab]}
          </p>
        </div>
      </Card>
    );
  });
};

export default NumericFieldSumCard;
