import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import ProductList from "../components/ProductList";
import BackButton from "../components/BackButton";

import { auth } from "../service/firebase";
import {ProductService, ListService} from "../service/DatabaseService";



const ListPage = () => {
  const [products, setProducts] = useState(null);
  let { listId } = useParams();
  const [list, setList] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    ProductService.getWhere("lists", "array-contains", listId).then((docs) => {
      setProducts(docs);
    });

    const listRef = ListService.getReference(listId);

    ListService.getOne(listRef).then((doc) => {
      setList(doc);
    });

    onAuthStateChanged(auth, (user) => {
      setUid(user.uid);
    });
  }, []);

  return (
    <div>
      <BackButton />
      {products == null ? <span>Loading...</span>
      : products.length > 0 ? <ProductList products={products} />
      : <span>No products on the list</span>
      }
    </div>
  );

};

export default ListPage;
