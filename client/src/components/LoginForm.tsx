import React, { FormEvent, useState } from "react";
import { useAuth } from "../authContext";

function LoginForm() {
  const API_BASE_URL = `http://127.0.0.1:5001/api`;
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [errorMessage, setErrorMessage] = useState(" ");
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Login attempted with:", { username, password });
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        login(token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData || "Login Failed.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.error("Login error: ", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
