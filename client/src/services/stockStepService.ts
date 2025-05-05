import { StockChartStepProps } from "../types/interfaces";
import hardcodedStepData from "./data/hardcodedStockStepData";

export const getStockStepData = async (
  ticker: string
): Promise<StockChartStepProps["data"]> => {
  // TODO For now, simulating API call with a delay and hardcoded data.
  // Remove in favor of actual call.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Simulated data fetched for ${ticker}.`);
      const dataForTicker = hardcodedStepData[ticker];
      if (dataForTicker) {
        resolve(dataForTicker.data);
      } else {
        reject(new Error(`No hardcoded data found for ${ticker}.`));
      }
    }, 2000);
  });
};
