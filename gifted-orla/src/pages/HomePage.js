import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { ProductService } from "../service/DatabaseService";

const HomePage = () => {
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
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}

export default HomePage;