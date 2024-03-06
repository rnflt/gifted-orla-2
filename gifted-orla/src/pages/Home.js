import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import ProductList from "../components/ProductList";

import { auth } from "../service/AuthProvider";
import fetchData from "../service/FetchData";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("Products", setProducts);
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

  return products.length > 0 ? (
    <ProductList products={products} />
  ) : (
    <span>Loading...</span>
  );
}

export default Home;
