import { StockChartProps } from "../components/StockChart";

const hardcodedChartData: Record<string, StockChartProps["data"] | undefined> =
  {
    AAPL: [
      { name: "Jan", price: 150 },
      { name: "Feb", price: 160 },
      { name: "Mar", price: 155 },
      { name: "Apr", price: 170 },
      { name: "May", price: 165 },
      { name: "Jun", price: 180 },
    ],
    GOOG: [
      { name: "Jan", price: 2500 },
      { name: "Feb", price: 2600 },
      { name: "Mar", price: 2550 },
      { name: "Apr", price: 2700 },
      { name: "May", price: 2650 },
      { name: "Jun", price: 2800 },
    ],
    NVDA: [
      { name: "Jan", price: 300 },
      { name: "Feb", price: 300 },
      { name: "Mar", price: 450 },
      { name: "Apr", price: 400 },
      { name: "May", price: 450 },
      { name: "Jun", price: 500 },
    ],
  };

export default hardcodedChartData;
