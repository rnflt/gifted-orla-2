import { db } from "./firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

class DatabaseService {
  collection;

  // Specify collection name
  constructor(collectionName) {
    this.collection = collection(db, collectionName);
  }

  // returns list of records as an array of javascript objects
  getAll = async () => {
    const snapshot = await getDocs(this.collection);
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id, // append document id to each document
        ...doc.data(),
      };
    });
  };

  getWhere = async (queryCriteria, queryCondition, queryCheck) => {
    const q = query(this.collection, where(queryCriteria, queryCondition, queryCheck ) )
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id, // append document id to each document
        ...doc.data(),
      };
    });
  }

  // returns a single document in object format
  getOne = async ({ queryKey }) => {
    const { id } = queryKey[1];
    if (!id) return; // entity form is in create mode
    const snapshot = await this.collection.doc(id).get();
    return snapshot.data();
  };

  // resolve a relation, returns the referenced document
  getReference = async (id) => {
    return doc(this.collection, id);
  };

  // save a new document in the database
  create = async (data) => {
    return await this.collection.add(data);
  };

  // update an existing document with new data
  update = async (id, values) => {
    const ref = await this.getReference(id);
    return await updateDoc(ref, values); 
  };

  // delete an existing document from the collection
  remove = async (id) => {
    return await this.collection.doc(id).delete();
  };
}

// Create services for each entity type
export const ProductService = new DatabaseService("Products");

export const ListService = new DatabaseService("Lists");

export const UserService = new DatabaseService("Users");