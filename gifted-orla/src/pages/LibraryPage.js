import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";

import ListOfLists from "../components/ListOfLists";
import CreateListButton from "../components/CreateListButton";

import AuthUI, { uiConfig } from "../service/AuthUI";
import { auth } from "../service/firebase";
import { ListService, UserService } from "../service/DatabaseService";

const LibraryPage = () => {
  const [lists, setLists] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [uid, setUid] = useState("");


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user signed in
        const id = user.uid;
        setUid(id);

        document.getElementById("user-signed-in").style.display = "block";

        const userRef = UserService.getReference(id);

        const docSnap = UserService.getOne(userRef)
        
        docSnap.then((doc) => {
          if (!doc.empty) {
            console.log("Found user");   
            ListService.getWhere('user', "==", id).then((doc) => {
              const data = doc.map(list => ({ ...list}));
              setLists(data);
              setUserLoggedIn(true);
            });
          } else {
            // Create "Wishlist" and My Gear list
            const wishlistRef = ListService.create({
              user: id,
              name: "Wishlist",
              products: [],
            });

            const myGearRef = ListService.create({
              user: id,
              name: "My Gear",
              products: [],
            });

            UserService.create({
              name: id,
              lists: [wishlistRef.id, myGearRef.id],
            })

            // fetch lists
            ListService.getWhere('user', "==", id).then((doc) => {
              const data = doc.map(list => ({ ...list}));
              setLists(data);
              setUserLoggedIn(true);
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

  const handleNewList = async (listRef) => {
    const doc = await ListService.getOne(listRef);
    setLists(lists => [...lists, doc]);
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
        <CreateListButton uid={uid} handleNewList={handleNewList}/>
        <ListOfLists lists={lists} />
      </div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default LibraryPage;
