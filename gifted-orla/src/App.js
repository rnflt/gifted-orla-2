import CssBaseline from "@mui/material/CssBaseline";
import ProductList from "./components/ProductList";
import { products } from "./data/DummyData";
import * as React from "react";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <header className="header">
        <h1>My Products</h1>
      </header>
      <ProductList products={products} />
    </React.Fragment>
  );
}

export default App;
