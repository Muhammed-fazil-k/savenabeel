"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import "@/assets/styles/navbar.css";
import logo from "@/assets/images/fundraiser.webp";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Track login status on client-side

  useEffect(() => {
    setTimeout(() => {
      setIsLoggedIn(user);
    }, 10);
  }, [user]);
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href={"/"}>
          <Image src={logo} width={50} alt="Logo" />
        </Link>
      </div>
      <div className="links">
        {isLoggedIn ? (
          <>
            <div className="">
              <Link href="/donate">Add Donation</Link>
            </div>
            <div className="">
              <Link href="/" onClick={logout}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <div>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
