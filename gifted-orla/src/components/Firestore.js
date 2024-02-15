import firebaseApp from "./AuthProvider";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(firebaseApp);
