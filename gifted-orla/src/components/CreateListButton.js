import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { ListService, UserService } from "../service/DatabaseService";
import { arrayUnion } from "firebase/firestore";

const CreateListButton = ({ uid, handleNewList }) => {
  const [open, setOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewListName("");
    setError("");
  };

  const handleCreate = async () => {
    if (newListName.trim() !== "") {
      try {
        const listRef = await ListService.create({
          name: newListName,
          user: uid,
          products: [],
        });
        await UserService.update(uid, { lists: arrayUnion(listRef.id) });
        setNewListName("");
        handleNewList(listRef);
        handleClose();
      } catch (error) {
        console.error("Error creating list:", error);
        setError("An error occurred while creating the list.");
      }
    } else {
      setError("List name cannot be empty.");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Create List
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the name for your new list:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateListButton;
