import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import TickerSelector from "../components/TickerSelector";
import StockChart from "../components/StockChart";
import useStockData from "../hooks/useStockData";
import styles from "./DashboardPage.module.css";

const DashboardPage: React.FC = () => {
  const { logout, authToken } = useAuth();
  const navigate = useNavigate();
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const {
    data: chartData,
    loading,
    error,
  } = useStockData(selectedTicker, authToken);

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
    <div className={styles.dashboardContainer}>
      <h1>Dashboard Page</h1>
      <TickerSelector
        onTickerSelect={handleTickerSelected}
        className={styles.tickerSelector}
      />
      <div className={styles.messageContainer}>
        <p>
          {selectedTicker
            ? `Selected Ticker: ${selectedTicker}`
            : `Please enter a stock ticker.`}
        </p>
        {loading && <p> | Loading data...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div className={styles.chartContainer}>
        <StockChart data={chartData} />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
