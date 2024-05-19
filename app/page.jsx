"use client";
import "@/assets/styles/mainPage.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import DonationCard from "@/components/DonationCard";
import currencyFormatter from "@/utils/currencyFormatter";

const DONATIONS_PER_PAGE = 3; // Adjust as needed

const HomePage = () => {
  const [total, setTotal] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [donations, setDonations] = useState([]);
  const [page, setPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null); // Track last document for pagination

  //const { page = 1 } = useSearchParams();
  //const page = 1;
  //const { user, logout } = useContext(AuthContext);
  const readItem = async (pageParam = null) => {
    console.log(pageParam);
    const baseQuery = query(
      collection(db, "donations"),
      orderBy("createdAt", "desc"),
      limit(DONATIONS_PER_PAGE) // Sort by creation date (desc for latest first)
    );
    const queryWithLimit = pageParam
      ? query(baseQuery, limit(DONATIONS_PER_PAGE), startAfter(pageParam))
      : baseQuery; // Use pageParam for pagination
    const querySnapshotSam = await getDocs(queryWithLimit);

    const samdonArrple = [];
    const donArr = [];
    querySnapshotSam.forEach((doc) => {
      donArr.push({ ...doc.data(), id: doc.id });
    });
    console.log(donArr);
    //
    // const querySnapshot = await getDocs(collection(db, "donations"));
    // const donArr = [];
    // querySnapshot.forEach((doc) => {
    //   donArr.push({ ...doc.data(), id: doc.id });
    // });
    const totalQuery = query(collection(db, "donations"));
    const totalSnapshot = await getDocs(totalQuery);

    const totalDocs = totalSnapshot.docs.reduce((acc, current) => {
      return acc + 1;
    }, 0);
    setTotalDocs(totalDocs);

    const totalAmount = totalSnapshot.docs.reduce((acc, current) => {
      return acc + parseInt(current.data().amount);
    }, 0);
    // const totalAmount = donArr.reduce((acc, current) => {
    //   return acc + parseInt(current.amount);
    // }, 0);
    const sortArr = [...donArr].sort((a, b) => b.createdAt - a.createdAt);
    setTotal(totalAmount);
    setLastVisible(querySnapshotSam.docs[querySnapshotSam.docs.length - 1]); // Update last visible document
    setDonations(sortArr);
  };
  const totalPages = Math.ceil(totalDocs / DONATIONS_PER_PAGE);

  const handleNext = async () => {
    if (lastVisible) {
      const nextPageStartAt = lastVisible.docs[lastVisible.docs.length - 1]; // Get the last document from lastVisible
      setPage(page + 1);
      await readItem(nextPageStartAt); // Fetch next page using last visible document
    }
  };

  const handlePrev = async () => {
    if (parseInt(page) > 1) {
      setPage(page - 1);
      // Calculate startAt document for previous page based on current donations
      const prevPageStartAt = donations[0]; // Get the first document from current page
      await readItem(prevPageStartAt); // Fetch previous page data using startAt
    }
  };

  useEffect(() => {
    readItem(
      parseInt(page) > 1 ? startAfter(donations[donations.length - 1]) : null
    );
  }, [page]);
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
                id={id}
                name={donation.name}
                amount={donation.amount}
                donationDate={donation.createdAt}
                donationStatus={donation.paymentStatus}
                houseName={donation.houseName}
              />
            </li>
          ))}
        </ul>
        {parseInt(page) > 1 && <button onClick={handlePrev}>Previous</button>}
        {parseInt(page) < totalPages && (
          <button onClick={handleNext}>Next</button>
        )}
        {totalPages > 1 && (
          <p>
            Page {page} of {totalPages}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
