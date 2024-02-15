import ProductList from "../components/ProductList";
import { products } from "../data/DummyData";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";

function Home() {
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
  return <ProductList products={products} />;
}

export default Home;
