import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import CreateListButton from "./CreateListButton";

import { onAuthStateChanged } from "firebase/auth";
import {arrayRemove, arrayUnion } from "firebase/firestore";
import { ProductService, ListService } from "../service/DatabaseService";
import { auth } from "../service/firebase";

const DropdownLists = ({product}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);
  const [lists, setLists] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = user.uid;
        setUid(id);

        ListService.getWhere('user', "==", id).then((data) => {
          const lists = data.map(list => ({ ...list, selected: list.products.includes(product.id) }));
          setLists(lists);
          setFilteredLists(lists);
          setUserLoggedIn(true);
        });

      } else {
        setUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribeAuth();
    }
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

  const handleNewList = async (listRef) => {
    const doc = await ListService.getOne(listRef);
    setLists(lists => [...lists, doc]);
    setFilteredLists(filteredLists => [...filteredLists, doc] )
  };

  const handleListClick = (list) => {
    console.log(product.id, list.id);
    const updatedLists = lists.map(l =>
      l.id === list.id ? { ...list, selected: !list.selected } : l);
    setLists(updatedLists);
    setFilteredLists(updatedLists);
    try {
      if (list.products.includes(product.id)) {
        ProductService.update(product.id, {lists: arrayRemove(list.id)});
        ListService.update(list.id, {products: arrayRemove(product.id)})
        
      } else {
        ProductService.update(product.id, {lists: arrayUnion(list.id)});
        ListService.update(list.id, {products: arrayUnion(product.id)});
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
        <CreateListButton uid={uid} handleNewList={handleNewList} />
        <Divider />
        {userLoggedIn ? (
          filteredLists.length > 0 ? (
            filteredLists.map((list) => (
                <MenuItem key={list.id} onClick={() => handleListClick(list)}>
                  <ListItemIcon>
                    {list.selected ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
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
