// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_EnkLv8enAX491hLijrnYiq_5sSIh57E",
  authDomain: "gifted-orla.firebaseapp.com",
  projectId: "gifted-orla",
  storageBucket: "gifted-orla.appspot.com",
  messagingSenderId: "735356677151",
  appId: "1:735356677151:web:66344c6b6e86ea78fef92a",
  measurementId: "G-6JKVXN1LE6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
