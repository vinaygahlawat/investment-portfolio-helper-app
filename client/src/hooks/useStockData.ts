import { useState, useEffect } from "react";
import { StockChartStepProps } from "../types/interfaces";
import { getStockStepData } from "../services/stockStepService";

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

    getStockStepData(ticker)
      .then((result) => {
        setData(result);
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
