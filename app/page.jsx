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
      debugger;
      console.log(current.amount);

      return acc + parseInt(current.amount);
    }, 0);
    const sortArr = [...donArr].sort((a, b) => b.createdAt - a.createdAt);
    setTotal(totalAmount);
    setDonations(sortArr);
  };

  useEffect(() => {
    readItem();
  }, []);
  return (
    <div className="mainPage">
      <div className="heading">
        <h1 className="text-3xl">Support Nabeel's Recovery</h1>
        <p>Every donation counts!!!!</p>
      </div>
      {donations.length < 1 && <p>No Donation Found</p>}
      <div className="summary">
        <div className="summary-raised">
          <p> Total raised</p>
          <p>₹{currencyFormatter(total)}</p>
        </div>
        <div className="summary-percentage">
          {((total / 6500000) * 100).toFixed(2)}%
        </div>

        <div className="summary-raised">
          <p> Goal</p>
          <p>₹65,00,000</p>
        </div>
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
