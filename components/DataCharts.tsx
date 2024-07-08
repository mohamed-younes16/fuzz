"use client";

import { useGetsummary } from "@/hooks/summary-hooks";
import React from "react";
import Chart from "./Chart";
import BarVariant from "./BarVariant";
import SpendingPie from "./SpendingCategory";
import { useGetPlan } from "@/hooks/purchase-hooks";

export const DataCharts = () => {
  const { data, isLoading } = useGetsummary();
  const { data: planData, isLoading: isLoadingPlan } = useGetPlan();
  return (
    <div className="  grid  gap-8 lg:grid-cols-6  grid-cols-1">
      <div className="col-span-1 lg:col-span-4">
        {data && planData && (
          <>
            <Chart data={data.days} isPro={planData.isPro} />
          </>
        )}
      </div>
      <div className="col-span-1 lg:col-span-2 ">
        {data && planData && (
          <> 
            <SpendingPie isPro={planData.isPro} data={data.categories} />
          </>
        )}
      </div>
    </div>
  );
};
