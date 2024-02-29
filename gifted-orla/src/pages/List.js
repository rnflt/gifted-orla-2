import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";
import { db } from "../components/Firestore";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

function List() {
  const [products, setProducts] = useState([]);
  let { listId } = useParams();
  const [list, setList] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    console.log(listId);
    const q = query(
      collection(db, "Products"),
      where("list", "array-contains", listId),
    );
    getDocs(q).then((Snapshot) => {
      const data = Snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      console.log(data);
    });

    const listRef = doc(db, "Lists", listId);

    const docSnap = getDoc(listRef).then((doc) => {
      const data = {id: doc.id, ...doc.data()};
      setList(data);
      console.log(data.user);
    });

    onAuthStateChanged(auth, (user) => {
      setUid(user.uid);
      
    });
  }, []);

  return products.length > 0 ? (
    <ProductList products={products} />
  ) : (
    <span>Loading...</span>
  );
}

export default List;
