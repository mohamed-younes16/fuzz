import { formatedPercentage, formatedPrice } from "@/utils";

import {
  Tooltip,
  ResponsiveContainer,
  Legend,
  Pie,
  Cell,
  PieChart,
} from "recharts";
import CategoryToolTip from "./CategoryToolTip";

const colors: string[] = ["#dc3a55", "#ffad00", "#c7ff46", "#0e98ff"];

const PieVariant = ({
  data,
}: {
  data: {
    category: string;
    value: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {" "}
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={(v) => {
            const dataPayload = v.payload;
            return dataPayload ? (
              <ul className=" flex flex-col space-y2 ">
                {dataPayload.map((e: any, i) => (
                  <li
                    key={`items-${i}`}
                    className="flex text-sm items-center gap-3"
                  >
                    <span
                      style={{ backgroundColor: e.color }}
                      className="h-3 w-3 rounded-full"
                    />
                    <p>{e?.payload.name}</p>
                    <p className=" font-bold">
                      {formatedPercentage(e.payload.percent * 100)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null;
          }}
        />
        <Tooltip
          content={(v) => {
            const dataPayload = v.payload && v?.payload[0];

            return dataPayload ? (
              <CategoryToolTip
                variant="pie"
                color={dataPayload.payload.fill}
                active={v.active}
                payload={dataPayload}
              />
            ) : null;
          }}
        />
        <Pie
          cy="50%"
          cx={"50%"}
          innerRadius={60}
          fill="#8884d8"
          dataKey={"value"}
          labelLine={false}
          outerRadius={90}
          paddingAngle={2}
          data={data}
        >
          {data.map((e, i) => (
            <Cell
              name={e.category}
              key={`cell-${i}`}
              fill={colors[i % colors.length]}
            />
          ))}
        </Pie>{" "}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieVariant;
