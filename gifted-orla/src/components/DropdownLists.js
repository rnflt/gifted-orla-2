import {  Button, Menu, MenuItem} from "@mui/material";
import React, { Component , useEffect, useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";
import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "./Firestore";

function DropdownLists() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [lists, setLists] = useState([]);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };  


    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;

          // get lists
          const q = query(collection(db, "Lists"), where("user", "==", uid));
          getDocs(q).then((Snapshot) => {
            const data = Snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setLists(data);
            console.log("data", data);
          });
        } else {
          // User is signed out
        }
      });
    }, []);
  
    return (
        <div>
            <Button
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                startIcon = {<AddCircleOutlineIcon />}
            >
                Add to List
            </Button>
            <Menu
                id="DropdownList"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                multiple
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>Search</MenuItem>
                <MenuItem>Create List</MenuItem>
                {lists.length > 0 ? (lists.map((list) => (
                    <MenuItem key={list.id} onClick={handleClose}>
                        {list.name}
                    </MenuItem>
                ))): <MenuItem>No Lists</MenuItem>}
            </Menu>
        </div>
    )
};
export default DropdownLists;


