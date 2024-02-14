import ProductList from "../components/ProductList";
import { products } from "../data/DummyData";

function Home() {
  return <ProductList products={products} />;
}

export default Home;
