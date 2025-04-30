import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import TickerSelector from "../components/TickerSelector";
import StockChart from "../components/StockChart";

// TODO remove hardcoded data in favor of requested data
const hardcodedChartData = [
  { name: "Jan", price: 100 },
  { name: "Feb", price: 110 },
  { name: "Mar", price: 105 },
  { name: "Apr", price: 120 },
  { name: "May", price: 115 },
  { name: "Jun", price: 130 },
];

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  const handleLogout = () => {
    console.log("Dashboard Page: handleLogout called.");
    logout();
    navigate("/login");
  };

  const handleTickerSelected = (ticker: string) => {
    console.log("Ticker selected in Dashboard page: ", ticker);
    setSelectedTicker(ticker);
    // TODO render chart based off of selected ticker
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      {selectedTicker && <p>Selected Ticker: {selectedTicker}</p>}
      <TickerSelector onTickerSelect={handleTickerSelected} />
      <StockChart data={hardcodedChartData} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
