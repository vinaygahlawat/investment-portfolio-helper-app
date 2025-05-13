import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  authToken: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  authToken: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);

  const login = (token: string) => {
    console.log("AuthContext: Logging in.");
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log("AuthContext: Logging out.");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
