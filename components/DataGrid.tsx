"use client";
import { useGetsummary } from "@/hooks/summary-hooks";
import { formatDateRange } from "@/utils";
import { Landmark, TrendingDown, TrendingUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import DataCard from "./DataCard";

const DataGrid = () => {
  const { data, isLoading } = useGetsummary();
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const dateRange = formatDateRange({
    from,
    to,
  });
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8  whitespace-nowrap">
      <DataCard
        isReady={!isLoading}
        title="Remaining"
        value={data?.remainingAmount || 0}
        percentageChange={data?.remainingChange || 0}
        Icon={Landmark}
        variant={"default"}
        dateRange={dateRange}
      />
      <DataCard
        isReady={!isLoading}
        title="Income"
        value={data?.incomeAmount || 0}
        percentageChange={data?.incomeChange || 0}
        Icon={TrendingUp}
        variant={"success"}
        dateRange={dateRange}
      />
      <DataCard
        isReady={!isLoading}
        title="Expenses"
        value={data?.expenseAmount || 0}
        percentageChange={data?.expenseChange || 0}
        Icon={TrendingDown}
        variant={"danger"}
        dateRange={dateRange}
      />
    </div>
  );
};

export default DataGrid;
