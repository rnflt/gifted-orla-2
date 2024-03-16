import { db } from "./firebase";
import { collection, getDocs, query, where, updateDoc, doc , addDoc, onSnapshot, getDoc, deleteDoc} from "firebase/firestore";

class DatabaseService {
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
    const q = this.getQuery(queryCriteria, queryCondition, queryCheck);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id, // append document id to each document
        ...doc.data(),
      };
    });
  }

  getQuery = (queryCriteria, queryCondition, queryCheck) => {
    return query(this.collection, where(queryCriteria, queryCondition, queryCheck ))
  };

  // returns a single document in object format
  getOne = async (ref) => {
    const snap = await getDoc(ref);
    return {
      id: ref.id,
      ...snap.data(),
    };
  };

  // resolve a relation, returns the referenced document
  getReference = (id) => {
    return doc(this.collection, id);
  };

  // save a new document in the database
  create = async (data) => {
    return await addDoc(this.collection, data);
  };

  onSnapshot = (func) => {
    onSnapshot(this.collection, func)
  };

  // update an existing document with new data
  update = async (id, values) => {
    const ref = this.getReference(id);
    return await updateDoc(ref, values); 
  };

  // delete an existing document from the collection
  remove = async (id) => {
    const ref = this.getReference(id);
    try {
      await deleteDoc(ref);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
      throw error; // Propagate the error to handle it in the caller
    }
  };
}

// Create services for each entity type
export const ProductService = new DatabaseService("Products");

export const ListService = new DatabaseService("Lists");

export const UserService = new DatabaseService("Users");