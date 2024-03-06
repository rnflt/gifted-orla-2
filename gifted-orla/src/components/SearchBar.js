import React, { useState } from "react";

import TextField from "@mui/material/TextField";

import ProductList from "./ProductList";

function SearchBar({ details }) {
  const [searchField, setSearchField] = useState("");

  const filteredProducts = details.filter((product) => {
    return (
      product.Name.toLowerCase().includes(searchField.toLowerCase()) ||
      product.Brand.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return filteredProducts.length > 0 ? (
      <ProductList products={filteredProducts} />
    ) : (
      <span>Couldn't find any products...</span>
    );
  }

  return (
    <div>
      <TextField label="Search Products" onChange={handleChange} />
      {searchList()}
    </div>
  );
}

export default SearchBar;
