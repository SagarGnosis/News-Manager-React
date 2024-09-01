// authContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = async (inputs) => {
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, inputs, {
        withCredentials: true, // This ensures that the cookie with the JWT is included in the requests
      });
      const user = res.data;
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Store entire user object
      localStorage.setItem("token", user.token); // Assuming your backend includes the token in the user object
      console.log("token :",user);
    } catch (err) {
      console.error(err);
      // Optional: handle errors like showing a message to the user
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/auth/logout`, {}, { withCredentials: true }); // Notify backend about the logout
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
      // Optional: handle errors during logout
    }
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
