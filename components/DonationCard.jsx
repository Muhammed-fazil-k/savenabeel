import formatTimestamp from "@/utils/dateFormat";
import formatDateTime from "@/utils/dateFormat";
import React from "react";
import "@/assets/styles/donationcard.css";
import currencyFormatter from "@/utils/currencyFormatter";
const DonationCard = ({
  id,
  name,
  amount,
  donationDate,
  donationStatus,
  houseName,
}) => {
  return (
    <div className="donationCard">
      <div className="donorDetails">
        <div className="donorDetailsSub">
          <h3>{name}</h3>
          <p>{houseName} (House)</p>
        </div>
        <p>{formatTimestamp(donationDate)}</p>
        {/* <p>{id}</p> */}
      </div>
      <div className="donationDetails">
        <h3>₹{currencyFormatter(amount)}</h3>
      </div>
      <div className="donationStatus">
        {donationStatus && (
          <svg
            className="w-6 h-6 mt-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
