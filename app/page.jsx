"use client";
import "@/assets/styles/mainPage.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
import AuthContext from "@/context/AuthContext";
import { readItems } from "@/utils/dbUtil";
import { getNumPages, getPaginatedData } from "@/utils/paginations";

const HomePage = () => {
  const [fundData, setFundData] = useState({
    donationCount: "0",
    target: "0",
    totalAmount: "0",
  });
  const [donations, setDonations] = useState([]);
  const { user } = useContext(AuthContext);

  const numPerPage = 10;
  const [firstDoc, setFirstDoc] = useState(undefined);
  const [lastDoc, setLastDoc] = useState(undefined);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(undefined);

  const fetchFundDetails = async () => {
    const [fundDetails] = await readItems(collection(db, "fund-details"));
    setFundData({
      ...fundData,
      donationCount: fundDetails.donationCount,
      target: fundDetails.target,
      totalAmount: fundDetails.totalAmount,
    });
  };

  useEffect(() => {
    fetchFundDetails();
    getNumPages("donations", numPerPage).then((pages) => setPages(pages));
  }, []);

  useEffect(() => {
    const startAfterDoc = direction === "next" ? lastDoc : undefined;
    const endBeforeDoc = direction === "prev" ? firstDoc : undefined;
    getPaginatedData(
      "donations",
      "createdAt",
      direction,
      startAfterDoc,
      endBeforeDoc,
      numPerPage
    ).then((data) => {
      setDonations(data.result);
      setFirstDoc(data.firstDoc);
      setLastDoc(data.lastDoc);
    });
  }, [page]);

  const handlePreviousClick = () => {
    if (page === 1) return;
    setDirection("prev");
    setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (page === pages) return;
    setDirection("next");
    setPage((prev) => prev + 1);
  };
  return (
    <div className="mainPage">
      <div className="heading">
        <h1 className="text-3xl">Support Nabeel's Recovery</h1>
        <h3>Every donation counts!!!!</h3>
        <p>Received a total of {fundData.donationCount} contributions 🤲</p>
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
      <div className="pagination-container">
        {pages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={handlePreviousClick}>
              Prev
            </button>
            <span>
              {page} out of {pages}
            </span>
            <button disabled={page === pages} onClick={handleNextClick}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
