import React, { useEffect, useState } from "react";
import { uiConfig } from "../components/AuthUI";
import AuthUI from "../components/AuthUI";
import { auth } from "../components/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../components/Firestore";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Button } from "@mui/material";

const Library = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        document.getElementById("user-signed-in").style.display = "block";

        const userRef = doc(db, "Users", uid);

        const docSnap = getDoc(userRef).then((doc) => {
          doc._document
            ? console.log("Found user")
            : setDoc(userRef, {
                name: uid,
              });
        });

        // get lists
        const q = query(collection(db, "Lists"), where("user", "==", uid));
        getDocs(q).then((Snapshot) => {
          const data = Snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLists(data);
        });
      } else {
        // User is signed out
        AuthUI.start("#firebaseui-auth-container", uiConfig);
        document.getElementById("user-signed-in").style.display = "none";
      }
    });
  }, []);

  return (
    <div>
      <h1>Library</h1>
      <div
        id="user-signed-in"
        style={{
          display: "none",
        }}
      >
        <Button
          id="logout-button"
          variant="outlined"
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
        <Button
          id="create-list-button"
          variant="outlined"
          onClick={() => {
            setDoc(doc(collection(db, "Lists")), {
              user: auth.currentUser.uid,
              name: "New List",
            });
          }}
        >
          Create list
        </Button>
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Library;
