import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  render() {
    const products = this.props.products;
    return products.map((product) => (
      <ProductCard
        key={product.key}
        brand={product.brand}
        name={product.name}
        price={product.price}
      />
    ));
  }
}
export default ProductList;
