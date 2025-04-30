import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import TickerSelector from "../components/TickerSelector";
import StockChart from "../components/StockChart";

// TODO remove hardcoded data in favor of requested data
const hardcodedChartData = {
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
  // You can add more hardcoded data for other tickers here
};

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [chartData, setChartData] = useState<
    { name: string; price: number }[] | null
  >(null);

  const handleLogout = () => {
    console.log("Dashboard Page: handleLogout called.");
    logout();
    navigate("/login");
  };

  const handleTickerSelected = (ticker: string) => {
    console.log("Ticker selected in Dashboard page: ", ticker);
    setSelectedTicker(ticker);
    let dataForTicker = null;
    if (ticker in hardcodedChartData) {
      dataForTicker = (hardcodedChartData as any)[ticker];
    }
    setChartData(dataForTicker);
    // TODO render chart based off of selected ticker
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      {selectedTicker && <p>Selected Ticker: {selectedTicker}</p>}
      <TickerSelector onTickerSelect={handleTickerSelected} />
      {chartData && <StockChart data={chartData} />}
      {!chartData && selectedTicker && (
        <p>No Hardcoded Data Available For: {selectedTicker}</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
