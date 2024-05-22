"use client";
import "@/assets/styles/mainPage.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import DonationCard from "@/components/DonationCard";
import currencyFormatter from "@/utils/currencyFormatter";
import AuthContext from "@/context/AuthContext";
import { readItems } from "@/utils/dbUtil";

const HomePage = () => {
  const [fundData, setFundData] = useState({
    donationCount: "0",
    target: "0",
    totalAmount: "0",
  });
  const [donations, setDonations] = useState([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  //const { user, logout } = useContext(AuthContext);
  const readItem = async () => {
    const donArr = await readItems(collection(db, "donations"));
    const [fundDetails] = await readItems(collection(db, "fund-details"));
    // const fundDetails = {
    //   donationCount: "0",
    //   target: "0",
    //   totalAmount: "0",
    // };
    console.log(donArr.length);
    console.log(donArr.reduce((acc, item) => acc + parseInt(item.amount), 0));
    const sortArr = [...donArr].sort((a, b) => b.createdAt - a.createdAt);
    setFundData({
      ...fundData,
      donationCount: fundDetails.donationCount,
      target: fundDetails.target,
      totalAmount: fundDetails.totalAmount,
    });
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
          <p>₹{currencyFormatter(fundData.totalAmount)}</p>
        </div>
        <div className="summary-percentage">
          {((fundData.totalAmount / parseInt(fundData.target)) * 100).toFixed(
            2
          )}
          %
        </div>

        <div className="summary-raised">
          <p> Goal</p>
          <p>{fundData.target}</p>
        </div>
      </div>
      <div>
        <ul>
          {donations.map((donation, keyId) => (
            <li key={keyId}>
              {user ? (
                <Link href={`/edit-donation/${donation.id}`}>
                  <DonationCard
                    name={donation.name}
                    amount={donation.amount}
                    donationDate={donation.createdAt}
                    donationStatus={donation.paymentStatus}
                    houseName={donation.houseName}
                  />
                </Link>
              ) : (
                <DonationCard
                  name={donation.name}
                  amount={donation.amount}
                  donationDate={donation.createdAt}
                  donationStatus={donation.paymentStatus}
                  houseName={donation.houseName}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
