import { DataCharts } from "@/components/DataCharts";
import DataGrid from "@/components/DataGrid";

export default async function DashboardPage() {
  return (
    <div className=" space-y-8  w-full mx-auto pb-10 ">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
