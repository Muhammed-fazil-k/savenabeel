"use client";
import InputField from "@/components/InputFields";
import { db } from "@/config/firebase";
import validation from "@/utils/validation";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import "@/assets/styles/donationForm.css";
const DonationPage = () => {
  const [error, setError] = useState({});
  const [newDonation, setNewDonation] = useState({
    name: "",
    amount: "",
    houseName: "",
    state: "",
    district: "",
    country: "",
    createdAt: "",
    assembly: "",
    paymentStatus: true,
  });
  const handleChange = (event) => {
    setNewDonation({ ...newDonation, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (e) => {
    setNewDonation({ ...newDonation, paymentStatus: e.target.checked });
  };

  const getValidParams = (value, def) => {
    if (value === null || value === undefined || value === "") {
      return def;
    }
    return value;
  };

  const addItem = async (e) => {
    e.preventDefault();
    console.log(newDonation);
    const defaultAddress = "GENERAL";
    let err = validation(newDonation);
    setError(err);
    if (Object.keys(err).length === 0) {
      try {
        const docRef = await addDoc(collection(db, "donations"), {
          name: getValidParams(newDonation.name, "Unknown"),
          amount: getValidParams(newDonation.amount, "0"),
          houseName: getValidParams(newDonation.houseName, "GENERAL"),
          assembly: getValidParams(newDonation.assembly, "Perinthalmanna"),
          district: getValidParams(newDonation.district, "Malappuram"),
          state: getValidParams(newDonation.state, "Kerala"),
          country: getValidParams(newDonation.country, "India"),
          createdAt: new Date(),
          paymentStatus: getValidParams(newDonation.paymentStatus, "false"),
        });
        setNewDonation({ name: "", amount: "" });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <div className="donate-form-container">
      <div className="donate-form-title">
        <h1>Add Donation</h1>
      </div>

      <form className="donate-form">
        <InputField
          label="Name of the Donor"
          type="text"
          placeholder="Name"
          name="name"
          value={newDonation.name}
          onChange={handleChange}
          error={error.name}
        />

        <InputField
          required="true"
          label="Amount"
          type="number"
          placeholder="Amount"
          name="amount"
          value={newDonation.amount}
          onChange={handleChange}
          error={error.amount}
        />

        <div className="inputFieldCheckbox">
          <label>Payment Completed</label>
          <input
            checked={newDonation.paymentStatus}
            onChange={handleCheckbox}
            type="checkbox"
            name="paymentStatus"
          />
        </div>
        <InputField
          label="House name"
          type="text"
          placeholder="House name"
          name="houseName"
          value={newDonation.houseName}
          onChange={handleChange}
          error={error.houseName}
        />
        <InputField
          label="Assembly"
          type="text"
          placeholder="Assembly"
          name="assembly"
          value={newDonation.assembly}
          onChange={handleChange}
          error={error.assembly}
        />
        <InputField
          label="District"
          type="text"
          placeholder="Malappuram"
          name="district"
          value={newDonation.district}
          onChange={handleChange}
          error={error.district}
        />
        <InputField
          label="State"
          type="text"
          placeholder="Kerala"
          name="state"
          value={newDonation.state}
          onChange={handleChange}
          error={error.state}
        />
        <InputField
          label="Country"
          type="text"
          placeholder="India"
          name="country"
          value={newDonation.country}
          onChange={handleChange}
          error={error.country}
        />
        <button onClick={addItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
