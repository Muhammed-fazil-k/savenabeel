import Link from "next/link";
import React from "react";
import "@/assets/styles/navbar.css";
import logo from "@/assets/images/fundraiser.webp";
import Image from "next/image";
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href={"/"}>
          <Image src={logo} width={50} />
        </Link>
      </div>
      <div className="links">
        {/* <div>
          <Link href="/login">Login</Link>
        </div> */}
        <div className="">
          <Link href="/donate">Add Donation</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
