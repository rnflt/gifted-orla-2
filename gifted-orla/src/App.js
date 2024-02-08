import ProductList from "./components/ProductList";
import { products } from "./data/DummyData";

function App() {
  return (
    <div>
      <header className="header">
        <h1>My Products</h1>
      </header>
      <ProductList products={products} />
    </div>
  );
}

export default App;
