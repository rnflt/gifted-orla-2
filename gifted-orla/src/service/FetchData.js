import { getDocs, collection } from "firebase/firestore";
import { db } from "../components/Firestore";

const fetchData = async (collectionName, setConst) => {
  await getDocs(collection(db, collectionName)).then((Snapshot) => {
    const data = Snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setConst(data);
  });
};

export default fetchData;
