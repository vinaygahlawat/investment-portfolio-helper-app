import { StockChartStepProps } from "../components/StockChart";

const hardcodedStepData: Record<
  string,
  StockChartStepProps["data"] | undefined
> = {
  NVDA: [
    { date: "01-Jan-2025", stepVal: 0 },
    { date: "02-Jan-2025", stepVal: 0 },
    { date: "03-Jan-2025", stepVal: 0 },
    { date: "04-Jan-2025", stepVal: 0 },
    { date: "05-Jan-2025", stepVal: 0 },
    { date: "06-Jan-2025", stepVal: 0 },
    { date: "07-Jan-2025", stepVal: 0 },
    { date: "08-Jan-2025", stepVal: 1 },
    { date: "09-Jan-2025", stepVal: 1 },
    { date: "10-Jan-2025", stepVal: 1 },
    { date: "11-Jan-2025", stepVal: 1 },
    { date: "12-Jan-2025", stepVal: 1 },
    { date: "13-Jan-2025", stepVal: 1 },
    { date: "14-Jan-2025", stepVal: 1 },
    { date: "15-Jan-2025", stepVal: 1 },
    { date: "16-Jan-2025", stepVal: 1 },
    { date: "17-Jan-2025", stepVal: 1 },
    { date: "18-Jan-2025", stepVal: 1 },
    { date: "19-Jan-2025", stepVal: 0 },
    { date: "20-Jan-2025", stepVal: 0 },
    { date: "21-Jan-2025", stepVal: 0 },
    { date: "22-Jan-2025", stepVal: 0 },
    { date: "23-Jan-2025", stepVal: 0 },
    { date: "24-Jan-2025", stepVal: 0 },
    { date: "25-Jan-2025", stepVal: 0 },
    { date: "26-Jan-2025", stepVal: 0 },
    { date: "27-Jan-2025", stepVal: 1 },
    { date: "28-Jan-2025", stepVal: 1 },
    { date: "29-Jan-2025", stepVal: 1 },
    { date: "30-Jan-2025", stepVal: 1 },
    { date: "31-Jan-2025", stepVal: 1 },
  ],
};

export default hardcodedStepData;
