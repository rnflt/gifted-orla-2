import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

const fetchData = async (collectionName, setConst) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setConst(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
