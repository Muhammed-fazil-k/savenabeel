import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-300 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">Hello</div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Link href="/login">Login</Link>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Link href="/donate">Add Donation</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
