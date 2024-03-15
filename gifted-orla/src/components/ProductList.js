import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return products.map((product) => (
    <ProductCard
      key={product.id}
      brand={product.Brand}
      name={product.Name}
      price={product.Price}
      lists={product.lists}
      id={product.id}
      image={product.image}
    />
  ));
};

export default ProductList;