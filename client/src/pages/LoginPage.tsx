import React from "react";
import { useEffect } from "react";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
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

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
