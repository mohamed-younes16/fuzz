import { formatedPercentage, formatedPrice } from "@/utils";
import { format } from "date-fns";
import {
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  Cell,
  RadialBar,
} from "recharts";

const colors: string[] = ["#dc3a55","#ffad00", "#c7ff46", "#0e98ff", ];

const RadialVariant = ({
  data,
}: {
  data: {
    category: string;
    value: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart
        cy="30%"
        cx={"50%"}
        barSize={10}
        innerRadius={"90%"}
        outerRadius={"40%"}
        data={data.map((e, i) => ({
          ...e,
          fill: colors[i % colors.length],
        }))}
      >
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
                      {formatedPercentage((e.payload.endAngle / 360) * 100)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null;
          }}
        />
        <RadialBar
          label={{
            position: "insideStart",
            fontSize: "12px",
          }}
          fill="#8884d8"
          dataKey={"value"}
          background
        >
          {data.map((e, i) => (
            <Cell
              name={e.category}
              key={`cell-${i}`}
              fill={colors[i % colors.length]}
            />
          ))}
        </RadialBar>{" "}
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialVariant;
