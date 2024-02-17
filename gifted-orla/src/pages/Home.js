import ProductList from "../components/ProductList";
//import { products } from "../data/DummyData";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../components/Firestore";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    await getDocs(collection(db, "Products")).then((Snapshot) => {
      const data = Snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);
  return products ? (
    <ProductList products={products} />
  ) : (
    <span>Loading...</span>
  );
}

export default Home;
