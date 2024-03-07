// SearchBar.js
import { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar({ onSearch }) {
  const [searchField, setSearchField] = useState("");

  const handleChange = (e) => {
    setSearchField(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <TextField label="Search Products" value={searchField} onChange={handleChange} />
    </div>
  );
}

export default SearchBar;
