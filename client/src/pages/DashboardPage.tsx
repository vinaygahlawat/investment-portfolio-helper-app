import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Dashboard Page: handleLogout called.");
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Dashboard refresh test</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
