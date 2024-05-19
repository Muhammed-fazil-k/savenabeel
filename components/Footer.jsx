import Link from "next/link";
import React from "react";
import "@/assets/styles/footer.css";
import { LuInstagram } from "react-icons/lu";
const Footer = () => {
  return (
    <div className="footer-container">
      <span>Created by Fazil </span>
      <Link href={"https://instagram.com/fasszzil"} target="_blank">
        <LuInstagram size="1.3rem" />
      </Link>
    </div>
  );
};

export default Footer;
