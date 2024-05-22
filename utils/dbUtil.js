import { db } from "@/config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const readItems = async (query) => {
  const donArr = [];
  const querySnapshot = await getDocs(query);
  querySnapshot.forEach((doc) => {
    donArr.push({ ...doc.data(), id: doc.id });
  });
  return donArr;
};

export const editItem = async (refDoc, obj) => {
  await setDoc(refDoc, obj);
  console.log(`${refDoc} updated ${obj}`);
};

export const updateFundDetails = async (amount, op) => {
  const [fundDetails] = await readItems(collection(db, "fund-details"));
  let newCount = fundDetails.donationCount;
  if (op === "add") {
    newCount = (parseInt(newCount) + 1).toString();
  }
  console.log(fundDetails);
  const newData = {
    ...fundDetails,
    donationCount: newCount,
    totalAmount: (
      parseInt(fundDetails.totalAmount) + parseInt(amount)
    ).toString(),
  };
  console.log(newData);
  const docRef = doc(db, "fund-details", fundDetails.id);
  try {
    await editItem(docRef, newData);
  } catch (err) {
    console.log("Error while updating fund data" + err);
  }
};
export default readItems;
