import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { setCurrentUser } from "../api/authApi";
import { clearAuth } from "../api/http";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async () => {
    const userData = await setCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
