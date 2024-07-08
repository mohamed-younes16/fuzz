import { formatedPrice } from "@/utils";
import { format } from "date-fns";

const CustomTooltip = ({ payload, active }) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const income = payload[0].payload.income;
  const expense = payload[1].payload.expense;

  return (
    <div className=" bg-background space-y-1 text-sm rounded-lg p-4 shadow-2xl">
      <p>date : {format(date, "dd MMM yyyy")}</p>
      <p className=" text-emerald-500">income : {formatedPrice(income)}</p>
      <p className=" text-rose-500">expense : {formatedPrice(expense)}</p>
    </div>
  );
};

export default CustomTooltip;
