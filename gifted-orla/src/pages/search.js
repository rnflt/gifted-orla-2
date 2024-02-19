import React from "react";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import fetchData from "../components/FetchData";

const Search = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData("Products", setProducts);
  }, []);

  return (
    <div>
      <h1>Search - here a range of categories will be shown</h1>
      {products.length > 0 ? (
        <SearchBar details={products} />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Search;
