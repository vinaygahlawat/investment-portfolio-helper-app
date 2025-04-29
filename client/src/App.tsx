import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./authContext";

function App() {
  const { isLoggedIn } = useAuth();
  console.log("App: isLoggedIn: ", isLoggedIn);

  const ProtectedRoute = () => {
    console.log("ProtectedRoute: isLoggedIn: ", isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
