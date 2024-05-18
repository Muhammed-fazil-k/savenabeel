"use client";
import InputField from "@/components/InputFields";
import AuthContext from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import "@/assets/styles/donationForm.css";

const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log(userData);
    login(userData);
    setUserData({
      username: "",
      password: "",
    });
  };
  return (
    <div className="donate-form-container">
      <div className="donate-form-title">
        <h1>Login</h1>
      </div>

      <form className="donate-form">
        <InputField
          label="username"
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <InputField
          label="password"
          type="password"
          placeholder="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button onClick={handleLogin} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
