"use client";
import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import validation from "@/utils/validations";
import InputField from "@/components/InputFields";

function AddDonationPage() {
  const [error, setError] = useState({});
  const [newDonation, setNewDonation] = useState({
    name: "",
    amount: "",
    houseName: "",
    state: "",
    district: "",
    country: "",
  });
  const handleChange = (event) => {
    console.log("typing");
    console.log(event.target.name);
    setNewDonation({ ...newDonation, [event.target.name]: event.target.value });
  };

  //add item
  const addItem = async (e) => {
    const defaultAddress = "GENERAL";
    e.preventDefault();
    let err = validation(newDonation);
    let validName = newDonation.name.trim();
    if (validName == "") {
      validName = "Unknown User";
    }
    setError(err);
    if (Object.keys(err).length === 0) {
      console.log("Adding");
      try {
        const docRef = await addDoc(collection(db, "donations"), {
          name: validName,
          amount: newDonation.amount,
          houseName: defaultAddress,
          assembly: defaultAddress,
          district: defaultAddress,
          state: defaultAddress,
          country: defaultAddress,
        });
        setNewDonation({ name: "", amount: "" });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h4>Add Donation</h4>

      <form className="max-w-sm mx-auto">
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
          label="Amount"
          type="number"
          placeholder="Amount"
          name="amount"
          value={newDonation.amount}
          onChange={handleChange}
          error={error.amount}
        />
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
        {/* <InputField
          label="District"
          type="text"
          placeholder="District"
          name="district"
          value={newDonation.district}
          onChange={handleChange}
          error={error.district}
        />
        <InputField
          label="State"
          type="text"
          placeholder="State"
          name="state"
          value={newDonation.state}
          onChange={handleChange}
          error={error.state}
        />

        <InputField
          label="Country"
          type="text"
          placeholder="Country"
          name="country"
          value={newDonation.country}
          onChange={handleChange}
          error={error.country}
        /> */}

        <button
          onClick={addItem}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDonationPage;
