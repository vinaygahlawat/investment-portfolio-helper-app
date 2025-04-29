import React from "react";
import { useEffect } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login: isLoggedIn on mount/update: ", isLoggedIn);
    if (isLoggedIn) {
      console.log(
        "Login useEffect redirecting to /dashboard because isLoggedIn is ",
        isLoggedIn
      );
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    console.log("Login page: handleLogin called.");
    login();
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginPage;
