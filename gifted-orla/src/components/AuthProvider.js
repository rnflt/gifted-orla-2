import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_EnkLv8enAX491hLijrnYiq_5sSIh57E",
  authDomain: "gifted-orla.firebaseapp.com",
  projectId: "gifted-orla",
  storageBucket: "gifted-orla.appspot.com",
  messagingSenderId: "735356677151",
  appId: "1:735356677151:web:66344c6b6e86ea78fef92a",
  measurementId: "G-6JKVXN1LE6",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
