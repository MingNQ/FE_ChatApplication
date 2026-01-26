import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { setCurrentUser, setToken } from "../api/authApi";
import { clearAuth } from "../api/http";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setAuthToken] = useState(null);

  const login = async (accessToken, refreshToken) => {
    setAuthToken(accessToken);
    setToken({ accessToken, refreshToken });
    setCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
