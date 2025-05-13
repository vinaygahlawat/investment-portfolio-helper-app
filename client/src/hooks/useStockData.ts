import { useState, useEffect } from "react";
import { StockChartStepProps } from "../../../types/interfaces";
import { getStockStepData } from "../services/stockStepService";

interface UseStockDataResult {
  data: StockChartStepProps[] | null;
  loading: boolean;
  error: string | null;
}
const useStockData = (
  ticker: string | null,
  authToken: string | null
): UseStockDataResult => {
  const [data, setData] = useState<StockChartStepProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (ticker: string) => {
      setLoading(true);
      setError(null);
      try {
        const stepData = await getStockStepData(ticker, authToken);
        setData(stepData);
        setLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
        setData([]);
        setLoading(false);
      }
    };

    if (ticker) {
      fetchData(ticker);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [ticker]);

  return { data, loading, error };
};

export default useStockData;
