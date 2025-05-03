import { useState, useEffect } from "react";
import { StockChartStepProps } from "../components/StockChart";
import hardcodedChartData from "../data/hardcodedStockData";

const useStockData = (ticker: string | null) => {
  const [data, setData] = useState<StockChartStepProps["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = (): Promise<StockChartStepProps["data"]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const result: StockChartStepProps["data"] =
            hardcodedChartData[ticker] || [];
          resolve(result);
        }, 500);
      });
    };

    fetchData()
      .then((result) => {
        setData(result as StockChartStepProps["data"]);
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
