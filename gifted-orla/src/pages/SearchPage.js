import React, { useEffect, useState } from "react";
import { ProductService } from "../service/DatabaseService";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchProducts();

  }, []);

  return (
    <>
      <h1>Search - here a range of categories will be shown</h1>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <SearchBar products={products} />
      )}
    </>
  );
}

export default SearchPage;