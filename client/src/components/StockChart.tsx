import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export interface StockChartProps {
  data: { name: string; price: number }[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis angle={-90} textAnchor="end">
        <Label
          value="Date"
          position="bottom"
          offset={0}
          style={{ textAnchor: "middle", transform: "translateX(20px)" }}
        />
      </XAxis>
      <YAxis>
        <Label
          value="Step"
          position="left"
          angle={-90}
          offset={0}
          style={{ textAnchor: "middle" }}
        />
      </YAxis>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default StockChart;
