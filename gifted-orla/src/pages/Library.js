import React, { useEffect, useState } from "react";
import { Button, TextField} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import ListOfLists from "../components/ListOfLists";
import AuthUI, { uiConfig } from "../components/AuthUI";
import { auth } from "../components/AuthProvider";
import { db } from "../components/Firestore";

const Library = () => {
  const [lists, setLists] = useState([]);
  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState("");


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

  const handleCreateList = async () => {
    if (newListName.trim() !== "") {
      const uid = auth.currentUser.uid;
      await setDoc(doc(collection(db, "Lists")), {
        user: uid,
        name: newListName,
      });

      // Fetch lists again after creation
      const q = query(collection(db, "Lists"), where("user", "==", uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLists(data);

      // Reset input field and flag
      setNewListName("");
      setCreatingList(false);
    }
  };

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
        {!creatingList ? (
          <Button
            id="create-list-button"
            variant="outlined"
            onClick={() => {
              setCreatingList(true);
            }}
          >
            Create list
          </Button>
        ) : (
          <div>
            <TextField
              label="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateList}
            >
              Confirm
            </Button>
          </div>
        )}
        <ListOfLists lists={lists} />
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default Library;
