import React, { Component} from "react";

import {  Button, ListItemText, ListItemIcon, Menu, MenuItem, TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/AuthProvider";
import { collection, getDocs, doc,  query, where, addDoc, updateDoc, arrayRemove, arrayUnion} from "firebase/firestore";
import { db } from "../service/Firestore";

class DropdownLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      searchText: '',
      filteredLists: [],
      lists: [],
      newListName: '',
      creatingNewList: false,
      userLoggedIn: false,
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, "Lists"), where("user", "==", uid));
        getDocs(q).then((Snapshot) => {
          const data = Snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ lists: data, filteredLists: data, userLoggedIn: true }); 
        });
      } else {
        // User is signed out
        this.setState({ userLoggedIn: false }); 
      }
    });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, searchText: '', filteredLists: this.state.lists });
  };

  handleSearchChange = (event) => {
    const searchText = event.target.value;
    const { lists } = this.state;
    const filteredLists = lists.filter(list =>
      list.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ searchText, filteredLists });
  };

  handleNewListNameChange = (event) => {
    this.setState({ newListName: event.target.value });
  };

  handleCreateList = async () => {
    const { newListName, lists } = this.state;
    if (newListName.trim() !== '') {
      // Add the new list to Firestore
      try {
        const docRef = await addDoc(collection(db, "Lists"), {
          name: newListName,
          user: auth.currentUser.uid,
        });
        console.log("List added with ID: ", docRef.id);
        
        // Add the new list to state
        const newList = {
          id: docRef.id,
          name: newListName
        };
        const updatedLists = [...lists, newList];
        this.setState({ newListName: '', creatingNewList: false, lists: updatedLists, filteredLists: updatedLists });
      } catch (error) {
        console.error("Error adding list: ", error);
      }
    }
  };

  handleListClick = async (listId) => {
    const  productId  = this.props.product.id;
    const { lists } = this.state;

    
    try {
      // Check if the product already has the list ID
      const productRef = doc(db, "Products", productId);
      const productData = this.props.product;
        if (productData.lists && productData.lists.includes(listId)) {
          // Remove the list ID
          await updateDoc(productRef, {
            lists: arrayRemove(listId)
          });
        } else {
          // Add the list ID
          await updateDoc(productRef, {
            lists: arrayUnion(listId)
          });
        }
      } catch (error) {
      console.error("Error updating product lists: ", error);
    }
  };

  render() {
    const { anchorEl, filteredLists, searchText, newListName, creatingNewList, userLoggedIn } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add to List
        </Button>
        <Menu
          id="DropdownList"
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            this.handleClose();
            this.setState({ searchText: '' }); // Clear search field
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <TextField
              label="Search Lists"
              value={searchText}
              onChange={this.handleSearchChange}
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </MenuItem>
          {!creatingNewList && (
            <MenuItem onClick={() => this.setState({ creatingNewList: true })}>
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
                onChange={this.handleNewListNameChange}
                onKeyDown={(e) => e.stopPropagation()}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button onClick={this.handleCreateList} variant="contained" color="primary">
                Confirm
              </Button>
            </MenuItem>
          )}
          <Divider />
          {userLoggedIn ? (
            filteredLists.length > 0 ? (
              filteredLists.map((list) => (
                <React.Fragment key={list.id}>
                  <MenuItem onClick={() => this.handleListClick(list.id)}>
                    <ListItemIcon>
                      {this.props.product.lists.includes(list.id)
                        ? <CheckBoxIcon />
                        : <CheckBoxOutlineBlankIcon />
                      }
                    </ListItemIcon>
                    <ListItemText>
                      {list.name}
                    </ListItemText>
                  </MenuItem>
                </React.Fragment>
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
  }
}

export default DropdownLists;