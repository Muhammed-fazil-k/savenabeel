"use client";
import { useContext, createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      toast.error("Error retrieving user from local storage");
      return null;
    }
  });
  const [error, setError] = useState(null);
  const route = useRouter();

  const login = async ({ username, password }) => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USER &&
      password === NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setUser(username);
      localStorage.setItem("user", JSON.stringify(username));
      route.push("/");
      toast.success("Logged in succesfully!!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return "success";
    } else {
      setUser(null);
      toast.error("Invalid username/password", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return "failure";
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out succesfully!!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
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
