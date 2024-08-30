import axios from "axios";
import { createContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(apiUrl+"/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
    localStorage.setItem("token", res.data.token); // Store token

  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Clear token

  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
