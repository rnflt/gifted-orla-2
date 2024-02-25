import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";
import { db } from "../components/Firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

function List() {
  const [products, setProducts] = useState([]);
  let { listId } = useParams();

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
  }, []);

  return products.length > 0 ? (
    <ProductList products={products} />
  ) : (
    <span>Loading...</span>
  );
}

export default List;
