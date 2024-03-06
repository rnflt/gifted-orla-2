import { useEffect, useState } from "react";

import ProductList from "../components/ProductList";

import fetchData from "../service/FetchData";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("Products", setProducts);
  }, []);

  return products.length > 0 ? (
    <ProductList products={products} />
  ) : (
    <span>Loading...</span>
  );
}

export default Home;
