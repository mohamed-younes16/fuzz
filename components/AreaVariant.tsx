import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const AreaVariant = ({
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
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#88d551" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#88d551" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff005a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff005a" stopOpacity={0} />
          </linearGradient>
        </defs>

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
          content={(v) => {
        
            return <CustomTooltip payload={v.payload} active={v.active} />;
          }}
        />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#88d551"
          fillOpacity={1}
          strokeWidth={2}
          fill="url(#income)"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#ff005a"
          fillOpacity={1}
          strokeWidth={2}
          className=" drop-shadow-xl"
          fill="url(#expense)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaVariant;
