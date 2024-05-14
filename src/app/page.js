"use client";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import Link from "next/link";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [donations, setDonations] = useState([]);

  //read item

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
    console.log("Reading the donations");
    readItem();
  }, []);

  //delete Item
  const deleteItem = async (id) => {
    console.log(id);
    try {
      const docRef = doc(db, "donations", id); // Create a reference to the document
      await deleteDoc(docRef);
      console.log("Document deleted with ID:", id);
      readItem();
      // Optionally, update the donations state to reflect the deletion (see below)
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <h1>Save NABEEL</h1>
      <Link href="/add">Add Donation</Link>
      <div className="bg-slate-800 p-4 rounded-lg">
        {donations.length < 1 ? (
          ""
        ) : (
          <div className="flex justify-between p-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}
        <ul>
          {donations.map((donaton, id) => (
            <li
              key={id}
              className="my-4 w-full flex justify-between bg-slate-950"
            >
              <div className="p-4 w-full flex justify-between">
                <span className="capitalize">{donaton.name}</span>
                <span>₹{donaton.amount}</span>
              </div>
              <button
                onClick={() => deleteItem(donaton.id)}
                className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
