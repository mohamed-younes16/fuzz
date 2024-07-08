import { format } from "date-fns";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const BarVariant = ({
  data,
}: {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"} />

        <XAxis
          name="days"
          axisLine={false}
          tickLine={false}
          tickFormatter={(v, i) => {
            return format(v, "dd MMM");
          }}
          tickMargin={16}
          style={{ fontSize: "14px" }}
          dataKey="date"
        />

        <Tooltip
          content={(v) => (
            <CustomTooltip payload={v.payload} active={v.active} />
          )}
        />
        <Bar dataKey="income" fill="#88d551" className=" drop-shadow-sm" />
        <Bar dataKey="expense" fill="#ff005a" className=" drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarVariant;
