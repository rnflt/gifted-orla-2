import {  Button, ListItemText, ListItemIcon, Menu, MenuItem, TextField} from "@mui/material";
import React, { Component , useEffect, useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/AuthProvider";
import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "./Firestore";
import Divider from "@mui/material/Divider";
import SearchIcon from '@mui/icons-material/Search';

import AddIcon from '@mui/icons-material/Add';

class DropdownLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      lists: [],
      searchText: '',
      filteredLists: [],
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
          this.setState({ lists: data, filteredLists: data });
        });
      } else {
        // User is signed out
      }
    });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSearchChange = (event) => {
    const searchText = event.target.value;
    const { lists } = this.state;
    const filteredLists = lists.filter(list =>
      list.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ searchText, filteredLists });
  };

  render() {
    const { anchorEl, filteredLists, searchText } = this.state;
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
          onClose={this.handleClose}
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
          <Divider />
          {filteredLists.length > 0 ? (filteredLists.map((list) => (
            <React.Fragment key={list.id}>
              {this.props.selectedLists.includes(list.id)
                ? <CheckBoxIcon />
                : <CheckBoxOutlineBlankIcon />
              }
              <MenuItem onClick={this.handleClose}>
                {list.name}
              </MenuItem>
            </React.Fragment>
          ))) : <MenuItem>No Lists</MenuItem>}
        </Menu>
      </div>
    );
  }
}

export default DropdownLists;