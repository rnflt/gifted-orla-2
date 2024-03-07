import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { onAuthStateChanged } from "firebase/auth";
import {arrayRemove, arrayUnion } from "firebase/firestore";
import { ProductService, ListService } from "../service/DatabaseService";
import { auth } from "../service/firebase";

const DropdownLists = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        ListService.getWhere('user', "==", uid).then((data) => {
          setLists(data);
          setFilteredLists(data);
          setUserLoggedIn(true);
        });
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchText('');
    setFilteredLists(lists);
  };

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    const filteredLists = lists.filter(list =>
      list.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchText(searchText);
    setFilteredLists(filteredLists);
  };

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleCreateList = async () => {
    if (newListName.trim() !== '') {
      try {
        const docRef = await ListService.create({
          name: newListName,
          user: auth.currentUser.uid,
        });
        console.log("List added with ID: ", docRef.id);
        
        const newList = {
          id: docRef.id,
          name: newListName
        };
        const updatedLists = [...lists, newList];
        setNewListName('');
        setCreatingNewList(false);
        setLists(updatedLists);
        setFilteredLists(updatedLists);
      } catch (error) {
        console.error("Error adding list: ", error);
      }
    }
  };

  const handleListClick = async (listId) => {
    try {
      const productData = product;
      if (productData.lists && productData.lists.includes(listId)) {
        await ProductService.update(product.id, {
          lists: arrayRemove(listId)
        });
      } else {
        await ProductService.update(product.id, {
          lists: arrayUnion(listId)
        });
      }
    } catch (error) {
      console.error("Error updating product lists: ", error);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add to List
      </Button>
      <Menu
        id="DropdownList"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
          setSearchText('');
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <TextField
            label="Search Lists"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.stopPropagation()}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </MenuItem>
        {!creatingNewList && (
          <MenuItem onClick={() => setCreatingNewList(true)}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>
              Create New List
            </ListItemText>
          </MenuItem>
        )}
        {creatingNewList && (
          <MenuItem>
            <TextField
              label="New List Name"
              value={newListName}
              onChange={handleNewListNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button onClick={handleCreateList} variant="contained" color="primary">
              Confirm
            </Button>
          </MenuItem>
        )}
        <Divider />
        {userLoggedIn ? (
          filteredLists.length > 0 ? (
            filteredLists.map((list) => (
                <MenuItem key={list.id} onClick={() => handleListClick(list.id)}>
                  <ListItemIcon>
                    {product.lists.includes(list.id)
                      ? <CheckBoxIcon />
                      : <CheckBoxOutlineBlankIcon />
                    }
                  </ListItemIcon>
                  <ListItemText>
                    {list.name}
                  </ListItemText>
                </MenuItem>
            ))
          ) : <MenuItem>No Lists</MenuItem>
        ) : (
          <MenuItem>
            Not logged in
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default DropdownLists;
