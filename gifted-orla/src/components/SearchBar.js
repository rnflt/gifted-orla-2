import React, { useState } from "react";
import ProductList from "./ProductList";
import { TextField } from "@mui/material";

function SearchBar({ details }) {
  const [searchField, setSearchField] = useState("");

  const filteredProducts = details.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchField.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return <ProductList products={filteredProducts} />;
  }

  return (
    <div>
      <TextField label="Search Products" onChange={handleChange} />
      {searchList()}
    </div>
  );
}

export default SearchBar;
