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
import ListOfLists from "../components/ListOfLists";

const Library = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user signed in
        const uid = user.uid;
        document.getElementById("user-signed-in").style.display = "block";

        const userRef = doc(db, "Users", uid);

        const docSnap = getDoc(userRef).then((docu) => {
          if (docu._document) {
            console.log("Found user");   
            // fetch lists
            const q = query(collection(db, "Lists"), where("user", "==", uid));
            getDocs(q).then((Snapshot) => {
              const data = Snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setLists(data);
            });
          } else {
            setDoc(userRef, {
              name: uid,
            });

            // Create "Wishlist" list
            setDoc(doc(collection(db, "Lists")), {
              user: uid,
              name: "Wishlist",
            });

            // Create "My Gear" list
            setDoc(doc(collection(db, "Lists")), {
              user: uid,
              name: "My Gear",
            });

            // fetch lists
            const q = query(collection(db, "Lists"), where("user", "==", uid));
            getDocs(q).then((Snapshot) => {
              const data = Snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setLists(data);
            });
          }
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
        <ListOfLists lists={lists} />
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Library;
