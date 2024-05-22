"use client";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/assets/styles/donationForm.css";
import InputField from "@/components/InputFields";
import { Bounce, toast } from "react-toastify";
import toastObject from "@/utils/toastObject";
import { editItem, updateFundDetails } from "@/utils/dbUtil";

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
  const [prevAmnt, setPrevAmnt] = useState("");
  const [error, setError] = useState({});

  const readItem = async (id) => {
    const docRef = doc(db, "donations", params.id);
    const docSnap = await getDoc(docRef);
    try {
      setEditDonation(docSnap.data());
      setPrevAmnt(docSnap.data().amount);
    } catch (err) {
      toast.error("Unable to get Data", toastObject);
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
  const editItemHandle = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "donations", params.id);

    try {
      await editItem(docRef, editDonation);
      console.log("Prev " + prevAmnt);
      console.log("curr " + editDonation.amount);
      await updateFundDetails(
        (parseInt(editDonation.amount) - parseInt(prevAmnt)).toString(),
        "edit"
      );
      toast.success("Edited Succesfully !!!", toastObject);
    } catch (err) {
      console.log("Something went wrong while editing" + err);
      toast.error("Something went wrong", toastObject);
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
        <button onClick={editItemHandle} type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditPage;
