// SearchPage.js
import { useEffect, useState } from "react";
import { ProductService } from "../service/DatabaseService";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
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

  const handleSearch = (searchField) => {
    if (searchField.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) => {
        return (
          product.Name.toLowerCase().includes(searchField.toLowerCase()) ||
          product.Brand.toLowerCase().includes(searchField.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <h1>Search - here a range of categories will be shown</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <span>Loading...</span>
      ) : (
        filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <ProductList products={products} />
        )
      )}
    </>
  );
}

export default SearchPage;
