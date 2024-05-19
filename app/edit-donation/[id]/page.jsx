"use client";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/assets/styles/donationForm.css";
import InputField from "@/components/InputFields";
import { Bounce, toast } from "react-toastify";

const EditPage = ({ params }) => {
  const router = useRouter();
  const [editDonation, setEditDonation] = useState({
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
  const [error, setError] = useState({});

  const readItem = async (id) => {
    const docRef = doc(db, "donations", params.id);
    const docSnap = await getDoc(docRef);
    try {
      setEditDonation(docSnap.data());
    } catch (err) {
      toast.error("Unable to get Data", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    readItem(params.id);
  }, []);

  const handleChange = (event) => {
    setEditDonation({
      ...editDonation,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckbox = (e) => {
    setEditDonation({ ...editDonation, paymentStatus: e.target.checked });
  };
  const editItem = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "donations", params.id);

    try {
      await setDoc(docRef, editDonation);
      console.log(`${docRef} updated ${editDonation}`);
      toast.success("Edited Succesfully !!!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push("/");
    console.log(editDonation);
  };

  return (
    <div className="donate-form-container">
      <div className="donate-form-title">
        <h1>Edit Donation</h1>
      </div>

      <form className="donate-form">
        <InputField
          label="Name of the Donor"
          type="text"
          placeholder="Name"
          name="name"
          value={editDonation.name}
          onChange={handleChange}
          error={error.name}
        />

        <InputField
          required="true"
          label="Amount"
          type="number"
          placeholder="Amount"
          name="amount"
          value={editDonation.amount}
          onChange={handleChange}
          error={error.amount}
        />

        <div className="inputFieldCheckbox">
          <label>Payment Completed</label>
          <input
            checked={editDonation.paymentStatus}
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
          value={editDonation.houseName}
          onChange={handleChange}
          error={error.houseName}
        />
        <InputField
          label="Assembly"
          type="text"
          placeholder="Assembly"
          name="assembly"
          value={editDonation.assembly}
          onChange={handleChange}
          error={error.assembly}
        />
        <InputField
          label="District"
          type="text"
          placeholder="Malappuram"
          name="district"
          value={editDonation.district}
          onChange={handleChange}
          error={error.district}
        />
        <InputField
          label="State"
          type="text"
          placeholder="Kerala"
          name="state"
          value={editDonation.state}
          onChange={handleChange}
          error={error.state}
        />
        <InputField
          label="Country"
          type="text"
          placeholder="India"
          name="country"
          value={editDonation.country}
          onChange={handleChange}
          error={error.country}
        />
        <button onClick={editItem} type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
