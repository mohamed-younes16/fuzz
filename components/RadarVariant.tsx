import { formatedPercentage, formatedPrice } from "@/utils";
import {
  Tooltip,
  ResponsiveContainer,
  Legend,
  Radar,
  Cell,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
} from "recharts";
import CategoryToolTip from "./CategoryToolTip";


const RadarVariant = ({
  data,
}: {
  data: {
    category: string;
    value: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cy="50%" cx={"50%"} outerRadius={90} data={data}>
        {" "}
   
        <Tooltip
          content={(v) => {
            const dataPayload = v.payload && v?.payload[0];
            return dataPayload ? (
              <CategoryToolTip
              variant={"radar"}
                color={dataPayload.payload.fill}
                active={v.active}
                payload={dataPayload}
              />
            ) : null;
          }}
        />
        <PolarGrid />{" "}
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey={"category"} />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          fill="#8884d8"
          fillOpacity={0.5}
          stroke="#8884d8"
          name='ff'
          dataKey={"value"}
        ></Radar>{" "}
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarVariant;
