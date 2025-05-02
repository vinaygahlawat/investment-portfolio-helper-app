import { useState, useEffect } from "react";
import { StockChartProps } from "../components/StockChart";
import hardcodedChartData from "../data/hardcodedStockData";

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
