import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";

import ListOfLists from "../components/ListOfLists";

import AuthUI, { uiConfig } from "../service/AuthUI";
import { auth } from "../service/firebase";
import { ListService, UserService } from "../service/DatabaseService";

const LibraryPage = () => {
  const [lists, setLists] = useState([]);
  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user signed in
        const uid = user.uid;

        document.getElementById("user-signed-in").style.display = "block";

        const userRef = UserService.getReference(uid);

        const docSnap = UserService.getOne(userRef)
        
        docSnap.then((doc) => {
          if (!doc.empty) {
            console.log("Found user");   
            ListService.getWhere('user', "==", uid).then((doc) => {
              const data = doc.map(list => ({ ...list}));
              setLists(data);
              setUserLoggedIn(true);
            });
          } else {
            // Create "Wishlist" and My Gear list
            const wishlistRef = ListService.create({
              user: uid,
              name: "Wishlist",
              products: [],
            });

            const myGearRef = ListService.create({
              user: uid,
              name: "My Gear",
              products: [],
            });

            UserService.create({
              name: uid,
              lists: [wishlistRef.id, myGearRef.id],
            })

            // fetch lists
            ListService.getWhere('user', "==", uid).then((doc) => {
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

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = async () => {
    if (newListName.trim() !== "") {
      const uid = auth.currentUser.uid;
      const listRef = await ListService.create({
        name: newListName,
        user: uid,
        products: [],
      });

      // Fetch lists again after creation
      const doc = await ListService.getOne(listRef);
      setLists(lists => [...lists, doc]);

      const userRef = UserService.update(uid, {lists: arrayUnion(doc.id)}) 
     
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
              label="New List Name"
              value={newListName}
              onChange={handleNewListNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              margin="normal"
              variant="outlined"
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

export default LibraryPage;
