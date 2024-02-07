import "./App.css";
import ProductList from "./components/ProductList";
import { products } from "./data/DummyData";

function App() {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default App;
