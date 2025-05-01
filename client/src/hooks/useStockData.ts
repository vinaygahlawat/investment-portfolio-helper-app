import { useState, useEffect } from "react";
import { StockChartProps } from "../components/StockChart";

// TODO remove hardcoded data in favor of requested data
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

const useStockData = (ticker: string | null) => {
  const [data, setData] = useState<StockChartProps["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = (): Promise<StockChartProps["data"]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result: StockChartProps["data"] =
            hardcodedChartData[ticker] || [];
          resolve(result);
        }, 500);
      });
    };

    fetchData()
      .then((result) => {
        setData(result as StockChartProps["data"]);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load data. " + error);
        setLoading(false);
        setData([]);
      });
  }, [ticker]);

  return { data, loading, error };
};

export default useStockData;
