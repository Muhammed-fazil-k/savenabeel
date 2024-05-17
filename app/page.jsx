"use client";
import "@/assets/styles/mainPage.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import DonationCard from "@/components/DonationCard";
import currencyFormatter from "@/utils/currencyFormatter";

const HomePage = () => {
  const [total, setTotal] = useState(0);
  const [donations, setDonations] = useState([]);

  //const { user, logout } = useContext(AuthContext);
  const readItem = async () => {
    const querySnapshot = await getDocs(collection(db, "donations"));
    const donArr = [];
    querySnapshot.forEach((doc) => {
      donArr.push({ ...doc.data(), id: doc.id });
    });
    const totalAmount = donArr.reduce((acc, current) => {
      return acc + parseInt(current.amount, 10);
    }, 0);
    setTotal(totalAmount);
    setDonations(donArr);
  };

  useEffect(() => {
    readItem();
  }, []);
  return (
    <div className="mainPage">
      <div className="heading">
        <h1 className="text-3xl">Save Nabeel</h1>
      </div>
      {donations.length < 1 && <p>No Donation Found</p>}
      <div className="summary">
        <span>
          ₹{currencyFormatter(total)} raised (
          {((total / 6500000) * 100).toFixed(2)}% of our goal)
        </span>
        <span>Target</span>
        <span>₹65,00,000</span>
      </div>
      <div>
        <ul>
          {donations.map((donation, id) => (
            <li key={id}>
              <DonationCard
                name={donation.name}
                amount={donation.amount}
                donationDate={donation.createdAt}
                donationStatus={donation.paymentStatus}
                houseName={donation.houseName}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
