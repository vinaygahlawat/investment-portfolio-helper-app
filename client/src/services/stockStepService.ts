import { StockChartStepProps } from "../../../types/interfaces";

const API_BASE_URL = `http://127.0.0.1:5001/api`;
export const getStockStepData = async (
  ticker: string,
  authToken: string | null
): Promise<StockChartStepProps[]> => {
  try {
    console.log(`Data fetch initiated for ${ticker}.`);
    const response = await fetch(`${API_BASE_URL}/stocks/steps/${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(`Data fetched for ${API_BASE_URL}/stocks/steps/${ticker}.`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to fetch stock data: ${response.status} - ${
          errorData?.message || response.statusText
        }`
      );
    }

    const dataForTicker: { data: StockChartStepProps[] } =
      await response.json();
    return dataForTicker.data;
  } catch (error) {
    console.error(`Error fetching stock data: ${error}.`);
    throw error;
  }
};
