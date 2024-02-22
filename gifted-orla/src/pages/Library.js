import React, { useEffect } from "react";
import { uiConfig } from "../components/AuthUI";
import AuthUI from "../components/AuthUI";
import { auth } from "../components/AuthProvider";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../components/Firestore";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { Button } from "@mui/material";

const Library = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        document.getElementById("user-signed-in").style.display = "block";

        const docRef = doc(db, "Users", uid);

        const docSnap = getDoc(docRef).then((doc) => {
          doc._document
            ? console.log("found") // TODO: Hent lister
            : setDoc(docRef, {
                name: uid,
              });
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
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Library;
