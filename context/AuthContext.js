"use client";
import { useContext, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import toastObject from "@/utils/toastObject";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      toast.error("Error retrieving user from local storage", toastObject);
      return null;
    }
  });
  const [error, setError] = useState(null);
  const route = useRouter();

  const login = async ({ username, password }) => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USER &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setUser(username);
      localStorage.setItem("user", JSON.stringify(username));
      route.push("/");
      toast.success("Logged in succesfully!!", toastObject);
      return "success";
    } else {
      setUser(null);
      toast.error("Invalid username/password", toastObject);
      return "failure";
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out succesfully!!", toastObject);
    localStorage.removeItem("user");
    route.push("/"); // Or redirect to appropriate page
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
