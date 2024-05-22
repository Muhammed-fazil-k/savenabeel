import { db } from "@/config/firebase";
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

export const getNumPages = async (collectionName, numPerPages) => {
  const dataCollection = collection(db, collectionName);
  const count = await getCountFromServer(dataCollection);
  const numPages = Math.ceil(count.data().count / numPerPages);
  return numPages;
};

export const getPaginatedData = async (
  collectionS, // Name of the collection
  orderByProp, // Property to order by
  direction,
  startAfterDoc,
  endBeforeDoc,
  numPerPage
) => {
  const dataCollection = collection(db, collectionS);

  // Define the initial data query with ordering and limit
  let dataQuery = query(
    dataCollection,
    orderBy(orderByProp, "desc"),
    limit(numPerPage)
  );

  // Update query based on direction and provided documents
  if (direction === "next" && startAfterDoc) {
    // For next direction, start after the provided document
    dataQuery = query(dataQuery, startAfter(startAfterDoc));
  } else if (direction === "prev" && endBeforeDoc) {
    // For previous direction, end before the provided document and limit to last
    dataQuery = query(
      dataCollection,
      orderBy(orderByProp),
      endBefore(endBeforeDoc),
      limitToLast(numPerPage)
    );
  }

  // Get snapshot of documents based on the final query
  const donationsSnapshot = await getDocs(dataQuery);

  // Extract data from each document and map to an array of objects
  const donations = donationsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  // Return an object retrieved products, and first and last documents
  return {
    result: donations, // Cast products to an array of Product objects
    lastDoc: donationsSnapshot.docs[donationsSnapshot.docs.length - 1],
    firstDoc: donationsSnapshot.docs[0],
  };
};
