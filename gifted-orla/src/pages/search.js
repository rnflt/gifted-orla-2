import React from "react";
import SearchBar from "../components/SearchBar";
import { products } from "../data/DummyData";

const Search = () => {
  return (
    <div>
      <h1>Search - here a range of categories will be shown</h1>
      <SearchBar details={products} />
    </div>
  );
};

export default Search;
