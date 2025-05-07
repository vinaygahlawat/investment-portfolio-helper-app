import React from "react";
import { StockChartStepProps } from "../../../types/interfaces";
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

const StockChart: React.FC<StockChartStepProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          width: 600,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
          No Data Available
        </p>
        <p>Please double-check the ticker symbol or try a different one.</p>
      </div>
    );
  }
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis angle={-45} textAnchor="end" dataKey="date">
        <Label
          position="bottom"
          offset={0}
          //   style={{ textAnchor: "middle", transform: "translateX(20px)" }}
        />
      </XAxis>
      <YAxis domain={["dataMin - 5", "dataMax + 5"]}>
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
        dataKey="stepVal"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        isAnimationActive={false}
        legendType="none"
      />
    </LineChart>
  );
};

export default StockChart;
