"use client";
const { createContext, useState } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (userCode) => {
    if (userCode === "nabeel") {
      setUser(userCode);
    }
    setUser(null);
  };

  const logout = (userCode) => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
