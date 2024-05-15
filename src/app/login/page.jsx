"use client";
import React, { useContext, useState } from "react";
import InputField from "@/components/InputFields";
import AuthContext from "@/context/AuthContext";

function AddDonationPage() {
  const [userCode, setUserCode] = useState("");
  const { login } = useContext(AuthContext);
  const handleChange = (event) => {
    setUserCode(event.target.value);
  };

  //add item
  const handleLogin = async (e) => {
    e.preventDefault();
    login(userCode);
    route.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h4>Login</h4>

      <form className="max-w-sm mx-auto">
        <InputField
          label="User code"
          type="text"
          placeholder="userCode"
          name="userCode"
          value={userCode}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AddDonationPage;
