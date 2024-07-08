import { format } from "date-fns";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const LineVariant = ({
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
      <LineChart data={data}>
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
        <Line
          dot={false}
          strokeWidth={3}
          dataKey="income"
          stroke="#88d551"
          className=" drop-shadow-sm"
        />
        <Line
          dot={false}
          strokeWidth={3}
          dataKey="expense"
          stroke="#ff005a"
          className=" drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineVariant;
