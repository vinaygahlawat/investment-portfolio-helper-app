import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import TickerSelector from "../components/TickerSelector";
import StockChart from "../components/StockChart";
import useStockData from "../hooks/useStockData";

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { data: chartData, loading, error } = useStockData(selectedTicker);

  const handleLogout = () => {
    console.log("Dashboard Page: handleLogout called.");
    logout();
    navigate("/login");
  };

  const handleTickerSelected = (ticker: string) => {
    console.log("Ticker selected in Dashboard page: ", ticker);
    setSelectedTicker(ticker);
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <TickerSelector onTickerSelect={handleTickerSelected} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {selectedTicker && <p>Selected Ticker: {selectedTicker}</p>}
        {loading && <p> | Loading data...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <StockChart data={chartData} />
      {!chartData.length && selectedTicker && (
        <p>No Hardcoded Data Available For: {selectedTicker}</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
